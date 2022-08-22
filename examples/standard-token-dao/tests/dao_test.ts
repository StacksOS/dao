import { 
  Account,
  assertEquals,
  Clarinet,
  Chain,
} from './lib/deps.ts';
import { BOOTSTRAPS, GOVERNANCE, EXTENSIONS, DAO_CODES } from './lib/common.ts';
import { daoApi } from './api/core-dao.ts';
import { emergencyApi } from './api/emergency.ts';
import { treasuryApi } from './api/treasury.ts';

Clarinet.test({
  name: '`core-dao` - fails when not initialized',
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const { setExtension, isExtension } = daoApi(accounts.get('deployer')!);
    const { receipts } = chain.mineBlock([
      setExtension(EXTENSIONS.TREASURY, true),
      isExtension(EXTENSIONS.TREASURY),
    ])
    receipts[0].result.expectErr().expectUint(DAO_CODES.ERR_UNAUTHORIZED);
    receipts[1].result.expectBool(false);
  },
});

Clarinet.test({
  name: '`core-dao` - succeeds with bootstrap proposal',
  async fn(chain: Chain, accounts: Map<string, Account>) {

    // Initialize DAO
    const { init, isExtension } = daoApi(accounts.get('deployer')!);
    const { receipts: initialization } = chain.mineBlock([
      init(BOOTSTRAPS.BOOTSTRAP),
    ]);
    initialization[0].result.expectOk().expectBool(true);

    // Enable extensions
    const { receipts: extensions } = chain.mineBlock([
      isExtension(EXTENSIONS.TREASURY),
      isExtension(GOVERNANCE.TOKEN),
      isExtension(EXTENSIONS.SUBMISSION),
      isExtension(EXTENSIONS.VOTING),
      isExtension(EXTENSIONS.EMERGENCY_PROPOSE),
      isExtension(EXTENSIONS.EMERGENCY_EXECUTE),
    ]);
    extensions[0].result.expectBool(true);
    extensions[1].result.expectBool(true);
    extensions[2].result.expectBool(true);
    extensions[3].result.expectBool(true);
    extensions[4].result.expectBool(true);
    extensions[5].result.expectBool(true);

    // Set emergency team
    const {
      isEmergencyTeamMember,
      isExecutiveTeamMember,
      getSignalsRequired
    } = emergencyApi(accounts.get('deployer')!);
    const deployer = accounts.get('deployer')!;
    const wallet_1 = accounts.get('wallet_1')!;
    const wallet_2 = accounts.get('wallet_2')!;
    const { receipts: emergency } = chain.mineBlock([
      isExecutiveTeamMember(deployer.address),
      isEmergencyTeamMember(deployer.address),
      isEmergencyTeamMember(wallet_1.address),
      isEmergencyTeamMember(wallet_2.address),
      getSignalsRequired(),
    ]);
    emergency[0].result.expectBool(true);
    emergency[1].result.expectBool(true);
    emergency[2].result.expectBool(false);
    emergency[3].result.expectBool(false);
    emergency[4].result.expectUint(2);

    // Whitelist token
    const {
      isWhitelisted,
    } = treasuryApi(accounts.get('deployer')!);
    const { receipts: treasury } = chain.mineBlock([
      isWhitelisted(GOVERNANCE.TOKEN),
    ]);
    treasury[0].result.expectBool(true);

    // Events
    assertEquals(initialization[0].events.length, 11);
  },
});

import { 
  Account,
  assertEquals,
  Clarinet,
  Chain,
} from './lib/deps.ts';
import { BOOTSTRAPS, GOVERNANCE, EXTENSIONS, DAO_CODES } from './lib/common.ts';
import { daoApi } from './api/core-dao.ts';

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
      isExtension(GOVERNANCE.MEMBERSHIP),
      isExtension(EXTENSIONS.INVESTMENT_CLUB),
      isExtension(EXTENSIONS.SUBMISSION),
      isExtension(EXTENSIONS.VOTING),
    ]);
    extensions[0].result.expectBool(true);
    extensions[1].result.expectBool(true);
    extensions[2].result.expectBool(true);
    extensions[3].result.expectBool(true);
    extensions[4].result.expectBool(true);
    extensions[5].result.expectBool(true);


    // Events
    assertEquals(initialization[0].events.length, 11);
  },
});

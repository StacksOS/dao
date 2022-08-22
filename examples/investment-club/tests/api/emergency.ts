import { 
  Account,
  Tx,
  types,
} from '../lib/deps.ts';

const callEmergencyProposal = (method: string, args: any[], address: string) => {
  return Tx.contractCall('emergency-proposals', method, args, address)
};

const callEmergencyExecute = (method: string, args: any[], address: string) => {
  return Tx.contractCall('emergency-execute', method, args, address)
};

export const emergencyApi = ({ address }: Account) => ({
  isEmergencyTeamMember: (who: any) =>
    callEmergencyProposal('is-emergency-team-member', [types.principal(who)], address),
  isExecutiveTeamMember: (who: any) =>
    callEmergencyExecute('is-executive-team-member', [types.principal(who)], address),
  getSignalsRequired: () =>
    callEmergencyExecute('get-signals-required', [], address),
});
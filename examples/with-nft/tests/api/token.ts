import { 
  Account,
  Tx,
  types,
} from '../lib/deps.ts';

const call = (method: string, args: any[], address: string) => {
  return Tx.contractCall('token', method, args, address)
};

export const tokenApi = ({ address }: Account) => ({
  getBalance: (who: any) =>
    call('get-balance', [types.principal(who)], address),
});
import { 
  Account,
  Tx,
  types,
} from '../lib/deps.ts';

const call = (method: string, args: any[], address: string) => {
  return Tx.contractCall('core-dao', method, args, address)
};

export const daoApi = ({ address }: Account) => ({
  init: (proposal: any) =>
    call('init', [types.principal(proposal)], address),
  isExtension: (extension: any) =>
    call('is-extension', [types.principal(extension)], address),
  setExtension: (extension: any, enabled: any) =>
    call('set-extension', [types.principal(extension), types.bool(enabled)], address),
  execute: (proposal: any) =>
    call('execute', [types.principal(proposal)], address),
  executedAt: (proposal: any) =>
    call('executed-at', [types.principal(proposal)], address),
});
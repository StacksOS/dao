import { proxy } from '@clarigen/core';
import { VaultInterface } from './abi';
export const vaultContract = (provider) => {
    const contract = proxy(VaultInterface, provider);
    return contract;
};
export const vaultInfo = {
    contract: vaultContract,
    address: 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X',
    contractFile: 'contracts/vault.clar',
};

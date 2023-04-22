import { proxy } from '@clarigen/core';
import { TokenInterface } from './abi';
export const tokenContract = (provider) => {
    const contract = proxy(TokenInterface, provider);
    return contract;
};
export const tokenInfo = {
    contract: tokenContract,
    address: 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X',
    contractFile: 'contracts/token.clar',
};

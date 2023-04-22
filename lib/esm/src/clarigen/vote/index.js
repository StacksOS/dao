import { proxy } from '@clarigen/core';
import { VoteInterface } from './abi';
export const voteContract = (provider) => {
    const contract = proxy(VoteInterface, provider);
    return contract;
};
export const voteInfo = {
    contract: voteContract,
    address: 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X',
    contractFile: 'contracts/vote.clar',
};

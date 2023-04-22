import { proxy } from '@clarigen/core';
import { SubmissionInterface } from './abi';
export const submissionContract = (provider) => {
    const contract = proxy(SubmissionInterface, provider);
    return contract;
};
export const submissionInfo = {
    contract: submissionContract,
    address: 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X',
    contractFile: 'contracts/submission.clar',
};

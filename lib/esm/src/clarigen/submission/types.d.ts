/// <reference types="node" />
import { ClarityTypes, Transaction } from '@clarigen/core';
export interface SubmissionContract {
    callback: (sender: string, memo: Buffer) => Transaction<boolean, null>;
    isDaoOrExtension: () => Transaction<boolean, bigint>;
    propose: (proposal: string, startBlockHeight: number | bigint) => Transaction<boolean, bigint>;
    setParameter: (parameter: string, value: number | bigint) => Transaction<boolean, bigint>;
    setParameters: (parameterList: {
        "parameter": string;
        "value": bigint;
    }[]) => Transaction<boolean, bigint>;
    canPropose: (who: string, tokenThreshold: number | bigint) => Promise<boolean>;
    getMicroBalance: (amount: number | bigint) => Promise<bigint>;
    getParameter: (parameter: string) => Promise<ClarityTypes.Response<bigint, bigint>>;
}

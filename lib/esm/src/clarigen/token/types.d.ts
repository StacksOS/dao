/// <reference types="node" />
import { ClarityTypes, Transaction } from '@clarigen/core';
export interface TokenContract {
    mint: () => Transaction<boolean, bigint>;
    transfer: (amount: number | bigint, sender: string, recipient: string, memo: Buffer | null) => Transaction<boolean, bigint>;
    getBalance: (who: string) => Promise<ClarityTypes.Response<bigint, null>>;
    getDecimals: () => Promise<ClarityTypes.Response<bigint, null>>;
    getName: () => Promise<ClarityTypes.Response<string, null>>;
    getSymbol: () => Promise<ClarityTypes.Response<string, null>>;
    getTokenUri: () => Promise<ClarityTypes.Response<string | null, null>>;
    getTotalSupply: () => Promise<ClarityTypes.Response<bigint, null>>;
}

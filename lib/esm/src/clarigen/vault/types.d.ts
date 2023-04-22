/// <reference types="node" />
import { Transaction } from '@clarigen/core';
export interface VaultContract {
    callback: (sender: string, memo: Buffer) => Transaction<boolean, null>;
    deposit: (amount: number | bigint) => Transaction<boolean, bigint>;
    depositFt: (ft: string, amount: number | bigint) => Transaction<boolean, bigint>;
    depositNft: (nft: string, id: number | bigint) => Transaction<boolean, bigint>;
    getBalanceOf: (assetContract: string) => Transaction<bigint, bigint>;
    isDaoOrExtension: () => Transaction<boolean, bigint>;
    setWhitelist: (token: string, enabled: boolean) => Transaction<boolean, bigint>;
    setWhitelists: (whitelist: {
        "enabled": boolean;
        "token": string;
    }[]) => Transaction<boolean[], bigint>;
    transfer: (amount: number | bigint, recipient: string) => Transaction<boolean, bigint>;
    transferFt: (ft: string, amount: number | bigint, recipient: string) => Transaction<boolean, bigint>;
    transferNft: (nft: string, id: number | bigint, recipient: string) => Transaction<boolean, bigint>;
    getBalance: () => Promise<bigint>;
    getWhitelistedAsset: (assetContract: string) => Promise<boolean | null>;
    isWhitelisted: (assetContract: string) => Promise<boolean>;
}

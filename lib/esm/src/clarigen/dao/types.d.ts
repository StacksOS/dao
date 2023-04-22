/// <reference types="node" />
import { Transaction } from '@clarigen/core';
export interface DaoContract {
    execute: (proposal: string, sender: string) => Transaction<boolean, bigint>;
    init: (proposal: string) => Transaction<boolean, bigint>;
    requestExtensionCallback: (extension: string, memo: Buffer) => Transaction<boolean, bigint>;
    setExtension: (extension: string, enabled: boolean) => Transaction<boolean, bigint>;
    setExtensions: (extensionList: {
        "enabled": boolean;
        "extension": string;
    }[]) => Transaction<boolean[], bigint>;
    executedAt: (proposal: string) => Promise<bigint | null>;
    isExtension: (extension: string) => Promise<boolean>;
}

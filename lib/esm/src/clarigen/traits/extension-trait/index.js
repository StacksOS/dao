import { proxy } from '@clarigen/core';
import { ExtensionTraitInterface } from './abi';
export const extensionTraitContract = (provider) => {
    const contract = proxy(ExtensionTraitInterface, provider);
    return contract;
};
export const extensionTraitInfo = {
    contract: extensionTraitContract,
    address: 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD',
    contractFile: 'contracts/traits/extension-trait.clar',
};

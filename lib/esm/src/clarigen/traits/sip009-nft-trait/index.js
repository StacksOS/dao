import { proxy } from '@clarigen/core';
import { Sip009NftTraitInterface } from './abi';
export const sip009NftTraitContract = (provider) => {
    const contract = proxy(Sip009NftTraitInterface, provider);
    return contract;
};
export const sip009NftTraitInfo = {
    contract: sip009NftTraitContract,
    address: 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD',
    contractFile: 'contracts/traits/sip009-nft-trait.clar',
};

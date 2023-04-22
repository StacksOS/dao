import { proxy } from '@clarigen/core';
import { ProposalTraitInterface } from './abi';
export const proposalTraitContract = (provider) => {
    const contract = proxy(ProposalTraitInterface, provider);
    return contract;
};
export const proposalTraitInfo = {
    contract: proposalTraitContract,
    address: 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD',
    contractFile: 'contracts/traits/proposal-trait.clar',
};

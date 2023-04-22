import { proxy } from '@clarigen/core';
import { Sip010FtTraitInterface } from './abi';
export const sip010FtTraitContract = (provider) => {
    const contract = proxy(Sip010FtTraitInterface, provider);
    return contract;
};
export const sip010FtTraitInfo = {
    contract: sip010FtTraitContract,
    address: 'SPX9XMC02T56N9PRXV4AM9TS88MMQ6A1Z3375MHD',
    contractFile: 'contracts/traits/sip010-ft-trait.clar',
};

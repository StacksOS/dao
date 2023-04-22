import { proxy } from '@clarigen/core';
import { DaoInterface } from './abi';
export const daoContract = (provider) => {
    const contract = proxy(DaoInterface, provider);
    return contract;
};
export const daoInfo = {
    contract: daoContract,
    address: 'SPKPXQ0X3A4D1KZ4XTP1GABJX1N36VW10D02TK9X',
    contractFile: 'contracts/dao.clar',
};

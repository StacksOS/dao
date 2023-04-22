import { sip009NftTraitInfo } from './traits/sip009-nft-trait';
import { sip010FtTraitInfo } from './traits/sip010-ft-trait';
import { proposalTraitInfo } from './traits/proposal-trait';
import { extensionTraitInfo } from './traits/extension-trait';
import { daoInfo } from './dao';
import { tokenInfo } from './token';
import { vaultInfo } from './vault';
import { voteInfo } from './vote';
import { submissionInfo } from './submission';
export const contracts = {
    sip009NftTrait: sip009NftTraitInfo,
    sip010FtTrait: sip010FtTraitInfo,
    proposalTrait: proposalTraitInfo,
    extensionTrait: extensionTraitInfo,
    dao: daoInfo,
    token: tokenInfo,
    vault: vaultInfo,
    vote: voteInfo,
    submission: submissionInfo,
};

import React from 'react';
import { ProposalDescription } from './proposal-description';
import { ProposalHeader } from './proposal-header';
import { ProposalItem } from './proposal-item';
import { ProposalList } from './proposal-list';
import { ProposalTitle } from './proposal-title';
import { ProposalView } from './proposal-view';
interface ProposalProps extends React.HTMLAttributes<HTMLDivElement> {
    address: string;
}
export interface ProposalContextValue {
    address: string | null;
}
export declare const ProposalContext: React.Context<ProposalContextValue>;
declare function Proposal({ address, className, children, ...props }: ProposalProps): JSX.Element;
declare namespace Proposal {
    var Header: typeof ProposalHeader;
    var Title: typeof ProposalTitle;
    var Description: typeof ProposalDescription;
    var List: typeof ProposalList;
    var Item: typeof ProposalItem;
    var View: typeof ProposalView;
}
export { Proposal };

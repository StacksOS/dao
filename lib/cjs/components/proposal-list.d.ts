import React from 'react';
import { ProposalItem } from './proposal-item';
interface ProposalListProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactElement<typeof ProposalItem> | React.ReactElement<typeof ProposalItem>[];
    view?: 'grid' | 'list';
}
export interface ProposalListContextValue {
    view?: 'grid' | 'list';
}
export declare const ProposalListContext: React.Context<{
    view: 'list' | 'grid';
}>;
export declare function ProposalList({ children, view, className, ...props }: ProposalListProps): JSX.Element;
export {};

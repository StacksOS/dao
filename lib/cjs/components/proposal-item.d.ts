import React from 'react';
interface ProposalItemProps extends React.HTMLAttributes<HTMLDivElement> {
    identifier: string;
    title: string;
    description: string;
    proposedBy: string;
    status?: string;
}
export declare function ProposalItem({ identifier, title, description, proposedBy, status, ...props }: ProposalItemProps): JSX.Element;
export {};

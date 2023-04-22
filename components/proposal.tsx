import React from 'react';

import { cn } from '../utils';
import { ProposalDescription } from './proposal-description';
import { ProposalHeader } from './proposal-header';
import { ProposalItem } from './proposal-item';
import { ProposalList } from './proposal-list';
import { ProposalTitle } from './proposal-title';
import { ProposalView } from './proposal-view';
import { Card } from './ui/card';

interface ProposalProps extends React.HTMLAttributes<HTMLDivElement> {
  address: string;
}

export interface ProposalContextValue {
  address: string | null;
}

export const ProposalContext = React.createContext<ProposalContextValue>({
  address: 'SP12345',
});

function Proposal({ address, className, children, ...props }: ProposalProps) {
  const value: ProposalContextValue = {
    address,
  };
  return (
    <ProposalContext.Provider value={value}>
      <Card
        className={cn('w-auto border-none p-6 shadow-none', className)}
        {...props}
      >
        {children}
      </Card>
    </ProposalContext.Provider>
  );
}

Proposal.Header = ProposalHeader;
Proposal.Title = ProposalTitle;
Proposal.Description = ProposalDescription;
Proposal.List = ProposalList;
Proposal.Item = ProposalItem;
Proposal.View = ProposalView;

export { Proposal };

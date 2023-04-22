import React from 'react';
import { ProposalContext } from '../components/proposal';
export function useProposalContext() {
    const context = React.useContext(ProposalContext);
    if (context === undefined) {
        console.warn('Component is not nested inside ProposalContext provider');
    }
    return context;
}

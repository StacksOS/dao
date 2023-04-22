import React from 'react';
import { cn } from '../utils';
import { ProposalDescription } from './proposal-description';
import { ProposalTitle } from './proposal-title';
import { CardHeader } from './ui/card';
export function ProposalHeader({ className, children }) {
    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child) ||
            (child.type !== ProposalTitle && child.type !== ProposalDescription)) {
            console.warn('Invalid child passed to ProposalHeader component. Only ProposalTitle and ProposalDescription components are allowed.');
        }
    });
    return (React.createElement(CardHeader, { className: cn('flex flex-col space-y-1.5 px-0 pt-0', className) }, children));
}

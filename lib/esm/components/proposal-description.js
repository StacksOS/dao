import React from 'react';
import { CardDescription } from './ui/card';
export function ProposalDescription({ className, children, }) {
    return React.createElement(CardDescription, { className: className }, children);
}

import React from 'react';
import { CardTitle } from './ui/card';
export function ProposalTitle({ className, children }) {
    return React.createElement(CardTitle, { className: className }, children);
}

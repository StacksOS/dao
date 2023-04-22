var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { cn } from '../utils';
import { ProposalDescription } from './proposal-description';
import { ProposalHeader } from './proposal-header';
import { ProposalItem } from './proposal-item';
import { ProposalList } from './proposal-list';
import { ProposalTitle } from './proposal-title';
import { ProposalView } from './proposal-view';
import { Card } from './ui/card';
export const ProposalContext = React.createContext({
    address: 'SP12345',
});
function Proposal(_a) {
    var { address, className, children } = _a, props = __rest(_a, ["address", "className", "children"]);
    const value = {
        address,
    };
    return (React.createElement(ProposalContext.Provider, { value: value },
        React.createElement(Card, Object.assign({ className: cn('w-auto border-none p-6 shadow-none', className) }, props), children)));
}
Proposal.Header = ProposalHeader;
Proposal.Title = ProposalTitle;
Proposal.Description = ProposalDescription;
Proposal.List = ProposalList;
Proposal.Item = ProposalItem;
Proposal.View = ProposalView;
export { Proposal };

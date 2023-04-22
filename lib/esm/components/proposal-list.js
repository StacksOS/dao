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
import { useProposalContext } from '../hooks/useProposalContext';
import { cn } from '../utils';
export const ProposalListContext = React.createContext({ view: 'list' });
export function ProposalList(_a) {
    var { children, view = 'list', className } = _a, props = __rest(_a, ["children", "view", "className"]);
    const isGridView = view === 'grid';
    const { address } = useProposalContext();
    console.log({ address });
    return (React.createElement(ProposalListContext.Provider, { value: { view } },
        React.createElement("div", Object.assign({ className: cn('space-y-4', isGridView &&
                'grid gap-4 space-x-0 space-y-0 md:grid-cols-2 lg:grid-cols-4', className) }, props), React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
                console.warn('Invalid child passed to ProposalList component.');
                return null;
            }
            return React.cloneElement(child);
        }))));
}

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
import { truncateAddress } from '@stacks-os/utils';
import Avatar from 'boring-avatars';
import { CheckCheck, DollarSign } from 'lucide-react';
import { useProposalListContext } from '../hooks/useProposalListContext';
import { cn } from '../utils';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
export function ProposalItem(_a) {
    var { identifier, title, description, proposedBy, status } = _a, props = __rest(_a, ["identifier", "title", "description", "proposedBy", "status"]);
    const { view } = useProposalListContext();
    const isGridView = view === 'grid';
    const signalsReceived = 1;
    const signalsRequired = 3;
    return (React.createElement("div", Object.assign({ className: cn('divide-y divide-muted-foreground', status === 'active' && 'font-bold', isGridView && 'grid grid-cols-[25px_1fr] items-start pb-4') }, props), isGridView ? (React.createElement(Card, null,
        React.createElement(CardHeader, { className: 'flex flex-row items-center justify-between space-y-0 pb-2' },
            React.createElement(CardTitle, { className: 'text-sm font-medium' }, "Total Revenue"),
            React.createElement(DollarSign, { className: 'h-4 w-4 text-muted-foreground' })),
        React.createElement(CardContent, null,
            React.createElement("div", { className: 'text-2xl font-bold' }, "$45,231.89"),
            React.createElement("p", { className: 'text-xs text-muted-foreground' }, "+20.1% from last month")))) : (React.createElement("div", { className: 'hover:cursor-pointe flex flex-row items-center justify-between border-b border-neutral-900 py-6' },
        React.createElement("div", { className: 'flex flex-row items-center space-x-4' },
            React.createElement("p", { className: 'text-gray font-regular text-md' }, identifier.toString().padStart(3, '0')),
            React.createElement("p", { className: 'text-light-900 text-md font-semibold' }, title),
            React.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                React.createElement(Avatar, { size: 15, name: proposedBy, variant: 'beam', colors: ['#624AF2', '#7301fa', '#eb00ff', '#27cb9f'] }),
                React.createElement("p", { className: 'text-gray font-regular text-sm' }, truncateAddress(proposedBy)))),
        React.createElement("div", { className: 'flex flex-row items-center space-x-6' },
            React.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                React.createElement("p", null,
                    signalsReceived,
                    "/",
                    signalsRequired),
                React.createElement("div", { className: 'w-24' },
                    React.createElement("div", { className: 'bg-dark-500 h-2 rounded-lg' },
                        React.createElement("div", { className: 'flex space-x-2' },
                            React.createElement("div", { className: 'h-3 rounded-md border border-green-500 bg-green-500', style: { width: `${(4 / 20) * 100}%` } }),
                            React.createElement("div", { className: 'h-3 rounded-md border border-orange-500 bg-orange-500', style: { width: `${(10 / 20) * 100}%` } }),
                            React.createElement("div", { className: 'h-3 rounded-md border border-gray-200 bg-gray-200', style: { width: `${(6 / 20) * 100}%` } }))))),
            React.createElement(Button, { variant: 'link', size: 'sm', className: cn('border-bg-gray-50/90 shadow-bg-gray-50 rounded-full border shadow-sm hover:no-underline') },
                status === 'pending' && (React.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                    React.createElement("div", { className: 'h-2 w-2 rounded-full bg-orange-500' }),
                    React.createElement("p", { className: cn('text-light-500') }, "Pending"))),
                status === 'active' && (React.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                    React.createElement("div", { className: 'h-2 w-2 rounded-full bg-green-500' }),
                    React.createElement("p", { className: cn('text-light-500') }, "Active"))),
                status === 'executed' && (React.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                    React.createElement(CheckCheck, { className: 'h-3 w-3 text-blue-500' }),
                    React.createElement("p", { className: cn('text-light-500', status === 'executed' && 'font-medium text-blue-500') }, "Executed")))))))));
}

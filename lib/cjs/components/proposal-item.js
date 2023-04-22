"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalItem = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@stacks-os/utils");
const boring_avatars_1 = __importDefault(require("boring-avatars"));
const lucide_react_1 = require("lucide-react");
const useProposalListContext_1 = require("../hooks/useProposalListContext");
const utils_2 = require("../utils");
const button_1 = require("./ui/button");
const card_1 = require("./ui/card");
function ProposalItem(_a) {
    var { identifier, title, description, proposedBy, status } = _a, props = __rest(_a, ["identifier", "title", "description", "proposedBy", "status"]);
    const { view } = (0, useProposalListContext_1.useProposalListContext)();
    const isGridView = view === 'grid';
    const signalsReceived = 1;
    const signalsRequired = 3;
    return (react_1.default.createElement("div", Object.assign({ className: (0, utils_2.cn)('divide-y divide-muted-foreground', status === 'active' && 'font-bold', isGridView && 'grid grid-cols-[25px_1fr] items-start pb-4') }, props), isGridView ? (react_1.default.createElement(card_1.Card, null,
        react_1.default.createElement(card_1.CardHeader, { className: 'flex flex-row items-center justify-between space-y-0 pb-2' },
            react_1.default.createElement(card_1.CardTitle, { className: 'text-sm font-medium' }, "Total Revenue"),
            react_1.default.createElement(lucide_react_1.DollarSign, { className: 'h-4 w-4 text-muted-foreground' })),
        react_1.default.createElement(card_1.CardContent, null,
            react_1.default.createElement("div", { className: 'text-2xl font-bold' }, "$45,231.89"),
            react_1.default.createElement("p", { className: 'text-xs text-muted-foreground' }, "+20.1% from last month")))) : (react_1.default.createElement("div", { className: 'hover:cursor-pointe flex flex-row items-center justify-between border-b border-neutral-900 py-6' },
        react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-4' },
            react_1.default.createElement("p", { className: 'text-gray font-regular text-md' }, identifier.toString().padStart(3, '0')),
            react_1.default.createElement("p", { className: 'text-light-900 text-md font-semibold' }, title),
            react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                react_1.default.createElement(boring_avatars_1.default, { size: 15, name: proposedBy, variant: 'beam', colors: ['#624AF2', '#7301fa', '#eb00ff', '#27cb9f'] }),
                react_1.default.createElement("p", { className: 'text-gray font-regular text-sm' }, (0, utils_1.truncateAddress)(proposedBy)))),
        react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-6' },
            react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                react_1.default.createElement("p", null,
                    signalsReceived,
                    "/",
                    signalsRequired),
                react_1.default.createElement("div", { className: 'w-24' },
                    react_1.default.createElement("div", { className: 'bg-dark-500 h-2 rounded-lg' },
                        react_1.default.createElement("div", { className: 'flex space-x-2' },
                            react_1.default.createElement("div", { className: 'h-3 rounded-md border border-green-500 bg-green-500', style: { width: `${(4 / 20) * 100}%` } }),
                            react_1.default.createElement("div", { className: 'h-3 rounded-md border border-orange-500 bg-orange-500', style: { width: `${(10 / 20) * 100}%` } }),
                            react_1.default.createElement("div", { className: 'h-3 rounded-md border border-gray-200 bg-gray-200', style: { width: `${(6 / 20) * 100}%` } }))))),
            react_1.default.createElement(button_1.Button, { variant: 'link', size: 'sm', className: (0, utils_2.cn)('border-bg-gray-50/90 shadow-bg-gray-50 rounded-full border shadow-sm hover:no-underline') },
                status === 'pending' && (react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                    react_1.default.createElement("div", { className: 'h-2 w-2 rounded-full bg-orange-500' }),
                    react_1.default.createElement("p", { className: (0, utils_2.cn)('text-light-500') }, "Pending"))),
                status === 'active' && (react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                    react_1.default.createElement("div", { className: 'h-2 w-2 rounded-full bg-green-500' }),
                    react_1.default.createElement("p", { className: (0, utils_2.cn)('text-light-500') }, "Active"))),
                status === 'executed' && (react_1.default.createElement("div", { className: 'flex flex-row items-center space-x-2' },
                    react_1.default.createElement(lucide_react_1.CheckCheck, { className: 'h-3 w-3 text-blue-500' }),
                    react_1.default.createElement("p", { className: (0, utils_2.cn)('text-light-500', status === 'executed' && 'font-medium text-blue-500') }, "Executed")))))))));
}
exports.ProposalItem = ProposalItem;

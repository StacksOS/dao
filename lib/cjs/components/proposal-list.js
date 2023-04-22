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
exports.ProposalList = exports.ProposalListContext = void 0;
const react_1 = __importDefault(require("react"));
const useProposalContext_1 = require("../hooks/useProposalContext");
const utils_1 = require("../utils");
exports.ProposalListContext = react_1.default.createContext({ view: 'list' });
function ProposalList(_a) {
    var { children, view = 'list', className } = _a, props = __rest(_a, ["children", "view", "className"]);
    const isGridView = view === 'grid';
    const { address } = (0, useProposalContext_1.useProposalContext)();
    console.log({ address });
    return (react_1.default.createElement(exports.ProposalListContext.Provider, { value: { view } },
        react_1.default.createElement("div", Object.assign({ className: (0, utils_1.cn)('space-y-4', isGridView &&
                'grid gap-4 space-x-0 space-y-0 md:grid-cols-2 lg:grid-cols-4', className) }, props), react_1.default.Children.map(children, (child) => {
            if (!react_1.default.isValidElement(child)) {
                console.warn('Invalid child passed to ProposalList component.');
                return null;
            }
            return react_1.default.cloneElement(child);
        }))));
}
exports.ProposalList = ProposalList;

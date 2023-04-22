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
exports.Proposal = exports.ProposalContext = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../utils");
const proposal_description_1 = require("./proposal-description");
const proposal_header_1 = require("./proposal-header");
const proposal_item_1 = require("./proposal-item");
const proposal_list_1 = require("./proposal-list");
const proposal_title_1 = require("./proposal-title");
const proposal_view_1 = require("./proposal-view");
const card_1 = require("./ui/card");
exports.ProposalContext = react_1.default.createContext({
    address: 'SP12345',
});
function Proposal(_a) {
    var { address, className, children } = _a, props = __rest(_a, ["address", "className", "children"]);
    const value = {
        address,
    };
    return (react_1.default.createElement(exports.ProposalContext.Provider, { value: value },
        react_1.default.createElement(card_1.Card, Object.assign({ className: (0, utils_1.cn)('w-auto border-none p-6 shadow-none', className) }, props), children)));
}
exports.Proposal = Proposal;
Proposal.Header = proposal_header_1.ProposalHeader;
Proposal.Title = proposal_title_1.ProposalTitle;
Proposal.Description = proposal_description_1.ProposalDescription;
Proposal.List = proposal_list_1.ProposalList;
Proposal.Item = proposal_item_1.ProposalItem;
Proposal.View = proposal_view_1.ProposalView;

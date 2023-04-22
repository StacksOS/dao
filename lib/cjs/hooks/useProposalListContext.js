"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProposalListContext = void 0;
const react_1 = __importDefault(require("react"));
const proposal_list_1 = require("../components/proposal-list");
function useProposalListContext() {
    const context = react_1.default.useContext(proposal_list_1.ProposalListContext);
    if (context === undefined) {
        console.warn('Component is not nested inside ProposalContext provider');
    }
    return context;
}
exports.useProposalListContext = useProposalListContext;

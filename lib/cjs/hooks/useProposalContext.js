"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProposalContext = void 0;
const react_1 = __importDefault(require("react"));
const proposal_1 = require("../components/proposal");
function useProposalContext() {
    const context = react_1.default.useContext(proposal_1.ProposalContext);
    if (context === undefined) {
        console.warn('Component is not nested inside ProposalContext provider');
    }
    return context;
}
exports.useProposalContext = useProposalContext;

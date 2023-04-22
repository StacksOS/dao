"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalHeader = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("../utils");
const proposal_description_1 = require("./proposal-description");
const proposal_title_1 = require("./proposal-title");
const card_1 = require("./ui/card");
function ProposalHeader({ className, children }) {
    react_1.default.Children.forEach(children, (child) => {
        if (!react_1.default.isValidElement(child) ||
            (child.type !== proposal_title_1.ProposalTitle && child.type !== proposal_description_1.ProposalDescription)) {
            console.warn('Invalid child passed to ProposalHeader component. Only ProposalTitle and ProposalDescription components are allowed.');
        }
    });
    return (react_1.default.createElement(card_1.CardHeader, { className: (0, utils_1.cn)('flex flex-col space-y-1.5 px-0 pt-0', className) }, children));
}
exports.ProposalHeader = ProposalHeader;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalDescription = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("./ui/card");
function ProposalDescription({ className, children, }) {
    return react_1.default.createElement(card_1.CardDescription, { className: className }, children);
}
exports.ProposalDescription = ProposalDescription;

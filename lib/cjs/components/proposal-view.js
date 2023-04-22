"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalView = void 0;
const react_1 = __importDefault(require("react"));
const proposal_1 = require("./proposal");
const button_1 = require("./ui/button");
function ProposalView({ proposalId }) {
    const { address } = react_1.default.useContext(proposal_1.ProposalContext);
    const [proposal, setProposal] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        function fetchProposal() {
            return __awaiter(this, void 0, void 0, function* () {
                // const voteExtension = new VoteExtension(votingExtensionAddress);
                // const proposalInfo = await voteExtension.getProposalInfo(proposalId);
                const proposalInfo = {
                    title: 'Proposal Title',
                    description: 'Proposal Description',
                    voted: false,
                };
                setProposal({
                    title: proposalInfo.title,
                    description: proposalInfo.description,
                    voted: proposalInfo.voted,
                });
            });
        }
        fetchProposal();
    }, [address, proposalId]);
    // async function voteForProposal() {
    //   const voteExtension = new VoteExtension(votingExtensionAddress);
    //   await voteExtension.voteForProposal(proposalId);
    //   setProposal((prevProposal) => {
    //     if (prevProposal) {
    //       return {
    //         ...prevProposal,
    //         voted: true,
    //       };
    //     }
    //     return null;
    //   });
    // }
    // async function voteAgainstProposal() {
    //   const voteExtension = new VoteExtension(votingExtensionAddress);
    //   await voteExtension.voteAgainstProposal(proposalId);
    //   setProposal((prevProposal) => {
    //     if (prevProposal) {
    //       return {
    //         ...prevProposal,
    //         voted: true,
    //       };
    //     }
    //     return null;
    //   });
    // }
    if (!proposal) {
        return react_1.default.createElement("div", null, "Loading...");
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, proposal.title),
        react_1.default.createElement("p", null, proposal.description),
        proposal.voted ? (react_1.default.createElement("p", null, "You have already voted on this proposal.")) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(button_1.Button, { variant: 'default', onClick: () => { } }, "Approve"),
            react_1.default.createElement(button_1.Button, { variant: 'ghost', onClick: () => { } }, "Reject")))));
}
exports.ProposalView = ProposalView;

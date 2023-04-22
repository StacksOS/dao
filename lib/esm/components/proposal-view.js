var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { ProposalContext } from './proposal';
import { Button } from './ui/button';
export function ProposalView({ proposalId }) {
    const { address } = React.useContext(ProposalContext);
    const [proposal, setProposal] = React.useState(null);
    React.useEffect(() => {
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
        return React.createElement("div", null, "Loading...");
    }
    return (React.createElement("div", null,
        React.createElement("h2", null, proposal.title),
        React.createElement("p", null, proposal.description),
        proposal.voted ? (React.createElement("p", null, "You have already voted on this proposal.")) : (React.createElement(React.Fragment, null,
            React.createElement(Button, { variant: 'default', onClick: () => { } }, "Approve"),
            React.createElement(Button, { variant: 'ghost', onClick: () => { } }, "Reject")))));
}

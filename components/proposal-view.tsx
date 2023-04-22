import React from 'react';

import { ProposalContext } from './proposal';
import { Button } from './ui/button';

interface ProposalViewProps {
  proposalId: string;
}

export function ProposalView({ proposalId }: ProposalViewProps) {
  const { address } = React.useContext(ProposalContext);
  const [proposal, setProposal] = React.useState<{
    title: string;
    description: string;
    voted: boolean;
  } | null>(null);

  React.useEffect(() => {
    async function fetchProposal() {
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{proposal.title}</h2>
      <p>{proposal.description}</p>
      {proposal.voted ? (
        <p>You have already voted on this proposal.</p>
      ) : (
        <>
          <Button variant='default' onClick={() => {}}>
            Approve
          </Button>
          <Button variant='ghost' onClick={() => {}}>
            Reject
          </Button>
        </>
      )}
    </div>
  );
}

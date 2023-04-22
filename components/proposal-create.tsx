import React from 'react';

interface ProposalCreateProps {
  proposal: string;
}

export function ProposalCreate({ proposal }: ProposalCreateProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [template, setTemplate] = React.useState('');

  const handleTemplateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTemplate(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    () => {
      console.log('Create Proposal');
    };

    // Create the proposal using the selected template
    // const proposalContract = await createProposalContract(template, title, description);
    // await submitProposal(proposal, proposalContract.address);
  };

  const renderFormFields = () => {
    switch (template) {
      case 'transfer_funds':
        return (
          <>
            <div>
              <label htmlFor='amount'>Amount:</label>
              <input type='text' id='amount' />
            </div>
            <div>
              <label htmlFor='recipient'>Recipient Address:</label>
              <input type='text' id='recipient' />
            </div>
          </>
        );
      case 'change_rules':
        return (
          <>
            <div>
              <label htmlFor='ruleId'>Rule ID:</label>
              <input type='text' id='ruleId' />
            </div>
            <div>
              <label htmlFor='newRuleValue'>New Rule Value:</label>
              <input type='text' id='newRuleValue' />
            </div>
          </>
        );
      // Add more cases for other proposal templates
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          id='description'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='template'>Template:</label>
        <select id='template' value={template} onChange={handleTemplateChange}>
          <option value=''>Select a template</option>
          <option value='transfer_funds'>Transfer Funds</option>
          <option value='change_rules'>Change Rules</option>
          {/* Add more options for other proposal templates */}
        </select>
      </div>
      {renderFormFields()}
      <button type='submit'>Create Proposal</button>
    </form>
  );
}

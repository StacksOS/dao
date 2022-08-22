(impl-trait .extension-trait.extension-trait)
(impl-trait .voting-trait.voting-trait)

(use-trait proposal-trait .proposal-trait.proposal-trait)
(use-trait sip10-trait .sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u2500))
(define-constant ERR_UNKNOWN_PARAMETER (err u2501))
(define-constant ERR_PROPOSAL_ALREADY_EXECUTED (err u2502))
(define-constant ERR_PROPOSAL_ALREADY_EXISTS (err u2503))
(define-constant ERR_UNKNOWN_PROPOSAL (err u2504))
(define-constant ERR_PROPOSAL_ALREADY_CONCLUDED (err u2505))
(define-constant ERR_PROPOSAL_INACTIVE (err u2506))
(define-constant ERR_END_BLOCK_HEIGHT_NOT_REACHED (err u2507))
(define-constant ERR_ALREADY_VOTED (err u2518))

(define-map Proposals
	principal
	{
		votesFor: uint,
		votesAgainst: uint,
		startBlockHeight: uint,
		endBlockHeight: uint,
		concluded: bool,
		passed: bool,
		proposer: principal
	}
)

(define-map MemberVotes { proposal: principal, voter: principal, tokenId: uint } bool)
(define-map parameters (string-ascii 34) uint)

(map-set parameters "quorumThreshold" u0)
(map-set parameters "executionDelay" u144)

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
	(begin
		(try! (is-dao-or-extension))
		(try! (get-parameter parameter))
		(ok (map-set parameters parameter value))
	)
)

(define-public (add-proposal (proposal <proposal-trait>) (data { startBlockHeight: uint, endBlockHeight: uint, proposer: principal }))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (is-none (contract-call? .core-dao executed-at proposal)) ERR_PROPOSAL_ALREADY_EXECUTED)
    (asserts! (map-insert Proposals (contract-of proposal) (merge { votesFor: u0, votesAgainst: u0, concluded: false, passed: false } data)) ERR_PROPOSAL_ALREADY_EXISTS)
    (print { event: "propose", proposal: proposal, startBlockHeight: (get startBlockHeight data), endBlockHeight: (get endBlockHeight data), proposer: tx-sender })
		(ok true)
	)
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
	(ok (unwrap! (map-get? parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (get-proposal-data (proposal principal))
	(map-get? Proposals proposal)
)

(define-read-only (get-voting-power (tokenId uint) (blockHeight uint))
  (at-block
    (unwrap! (get-block-info? id-header-hash blockHeight) none) (unwrap! (contract-call? .nft get-owner tokenId) none)
  )
)

(define-read-only (get-current-votes (proposal principal) (voter principal) (tokenId uint))
	(default-to false (map-get? MemberVotes { proposal: proposal, voter: voter, tokenId: tokenId }))
)

(define-read-only (can-vote (who principal) (tokenId uint) (blockHeight uint))
	(match (get-voting-power tokenId blockHeight) owner (is-eq who owner) false)
)

(define-public (vote (for bool) (proposal principal) (tokenId uint))
	(let
		(
			(proposalData (unwrap! (map-get? Proposals proposal) ERR_UNKNOWN_PROPOSAL))
		)
		(asserts! (can-vote tx-sender tokenId (get startBlockHeight proposalData)) ERR_UNAUTHORIZED)
		(asserts! (>= block-height (get startBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
		(asserts! (< block-height (get endBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
		(asserts! (is-eq false (get-current-votes proposal tx-sender tokenId)) ERR_ALREADY_VOTED)
		(map-set MemberVotes { proposal: proposal, voter: tx-sender, tokenId: tokenId }
			true
		)
		(map-set Proposals proposal
			(if for
				(merge proposalData { votesFor: (+ (get votesFor proposalData) u1) })
				(merge proposalData { votesAgainst: (+ (get votesAgainst proposalData) u1) })
			)
		)
		(print { event: "vote", proposal: proposal, voter: tx-sender, for: for, amount: u1, tokenId: tokenId })
		(ok true)
	)
)

(define-public (vote-many (votes (list 100 { for: bool, proposal: principal, tokenId: uint })))
	(ok (map vote-many-iter votes))
)

(define-private (vote-many-iter (data { for: bool, proposal: principal, tokenId: uint }))
	(let
		(
			(for (get for data))
			(proposal (get proposal data))
			(tokenId (get tokenId data))
		)
		(vote for proposal tokenId)
	)
)

(define-public (conclude (proposal <proposal-trait>))
	(let
		(
			(proposalData (unwrap! (map-get? Proposals (contract-of proposal)) ERR_UNKNOWN_PROPOSAL))
			(totalVotes (+ (get votesFor proposalData) (get votesAgainst proposalData)))
			(quorumThreshold (try! (get-parameter "quorumThreshold")))
      (passed (and (>= totalVotes quorumThreshold) (> (get votesFor proposalData) (get votesAgainst proposalData))))
		)
		(asserts! (not (get concluded proposalData)) ERR_PROPOSAL_ALREADY_CONCLUDED)
		(asserts! (>= block-height (+ (try! (get-parameter "executionDelay")) (get endBlockHeight proposalData))) ERR_END_BLOCK_HEIGHT_NOT_REACHED)
		(map-set Proposals (contract-of proposal) (merge proposalData { concluded: true, passed: passed }))
		(print { event: "conclude", proposal: proposal, totalVotes: totalVotes, quorum: quorumThreshold, passed: passed })
		(and passed (try! (contract-call? .core-dao execute proposal tx-sender)))
		(ok passed)
	)
)

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)

(impl-trait .extension-trait.extension-trait)

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
(define-constant ERR_ALREADY_VOTED (err u2508))
(define-constant ERR_BLOCK_HASH_NOT_AVAILABLE (err u2509))

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

(define-map MemberVotes { proposal: principal, voter: principal, tokenId: uint } uint)
(define-map parameters (string-ascii 34) uint)

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

(define-public (add-proposal (proposal <proposal-trait>) (data {startBlockHeight: uint, endBlockHeight: uint, proposer: principal}))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (is-none (contract-call? .core-dao executed-at proposal)) ERR_PROPOSAL_ALREADY_EXECUTED)
    (asserts! (map-insert Proposals (contract-of proposal) (merge { votesFor: u0, votesAgainst: u0, concluded: false, passed: false } data)) ERR_PROPOSAL_ALREADY_EXISTS)
    (ok (print { event: "propose", proposal: proposal, startBlockHeight: (get startBlockHeight data), endBlockHeight: (get endBlockHeight data), proposer: tx-sender }))
	)
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
	(ok (unwrap! (map-get? parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (get-proposal-data (proposal principal))
	(map-get? Proposals proposal)
)

(define-read-only (get-voting-power (voter principal) (blockHeight uint))
  (at-block
    (unwrap! (get-block-info? id-header-hash blockHeight) u0) (unwrap! (contract-call? .club-governance-token get-balance voter) u0)
  )
)

(define-read-only (get-current-votes (proposal principal) (voter principal) (tokenId uint))
	(default-to u0 (map-get? MemberVotes { proposal: proposal, voter: voter, tokenId: tokenId }))
)

(define-read-only (can-vote (who principal) (tokenId uint))
	(is-eq who (unwrap! (contract-call? .club-membership-nft get-owner tokenId) false))
)

(define-public (vote (for bool) (proposal principal) (tokenId uint))
	(let
		(
			(proposalData (unwrap! (map-get? Proposals proposal) ERR_UNKNOWN_PROPOSAL))
			(amount (get-voting-power tx-sender (get startBlockHeight proposalData)))
		)
		(asserts! (>= block-height (get startBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
		(asserts! (< block-height (get endBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
		(asserts! (can-vote tx-sender tokenId) ERR_UNAUTHORIZED)
		(asserts! (map-insert MemberVotes { proposal: proposal, voter: tx-sender, tokenId: tokenId } (+ u0 amount)) ERR_ALREADY_VOTED)
		(map-set Proposals proposal
			(if for
				(merge proposalData { votesFor: (+ (get votesFor proposalData) amount) })
				(merge proposalData { votesAgainst: (+ (get votesAgainst proposalData) amount) })
			)
		)
		(ok (print { event: "vote", proposal: proposal, voter: tx-sender, for: for, amount: amount }))
	)
)

(define-public (conclude (proposal <proposal-trait>))
	(let
		(
			(proposalData (unwrap! (map-get? Proposals (contract-of proposal)) ERR_UNKNOWN_PROPOSAL))
			(totalVotes (+ (get votesFor proposalData) (get votesAgainst proposalData)))
      (passed (and (> totalVotes u0) (> (get votesFor proposalData) (get votesAgainst proposalData))))
		)
		(asserts! (not (get concluded proposalData)) ERR_PROPOSAL_ALREADY_CONCLUDED)
		(asserts! (>= block-height (+ (try! (get-parameter "executionDelay")) (get endBlockHeight proposalData))) ERR_END_BLOCK_HEIGHT_NOT_REACHED)
		(map-set Proposals (contract-of proposal) (merge proposalData { concluded: true, passed: passed }))
		(print { event: "conclude", proposal: proposal, totalVotes: totalVotes, passed: passed })
		(and passed (try! (contract-call? .core-dao execute proposal tx-sender)))
		(ok passed)
	)
)

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)

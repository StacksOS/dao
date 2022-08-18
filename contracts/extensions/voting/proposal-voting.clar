(impl-trait .extension-trait.extension-trait)
(impl-trait .voting-trait.voting-trait)

(use-trait proposal-trait .proposal-trait.proposal-trait)
(use-trait sip10-trait .sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u2500))
(define-constant ERR_NOT_GOVERNANCE_TOKEN (err u2501))
(define-constant ERR_UNKNOWN_PARAMETER (err u2502))
(define-constant ERR_PROPOSAL_ALREADY_EXECUTED (err u2503))
(define-constant ERR_PROPOSAL_ALREADY_EXISTS (err u2504))
(define-constant ERR_UNKNOWN_PROPOSAL (err u2505))
(define-constant ERR_PROPOSAL_ALREADY_CONCLUDED (err u2506))
(define-constant ERR_PROPOSAL_INACTIVE (err u2507))
(define-constant ERR_END_BLOCK_HEIGHT_NOT_REACHED (err u2508))
(define-constant ERR_INSUFFICIENT_BALANCE (err u2509))
(define-constant ERR_ALREADY_VOTED (err u2510))

(define-constant MICRO (pow u10 u6))

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

(define-map MemberTotalVotes {proposal: principal, voter: principal, governanceToken: principal} uint)
(define-map parameters (string-ascii 34) uint)

(map-set parameters "voteThreshold" (get-micro-balance u1))
(map-set parameters "quorumThreshold" (get-micro-balance u12500))
(map-set parameters "executionDelay" u144)

(define-map Delegates principal principal)
(define-map Delegators principal bool)

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
    (asserts! (map-insert Proposals (contract-of proposal) (merge {votesFor: u0, votesAgainst: u0, concluded: false, passed: false} data)) ERR_PROPOSAL_ALREADY_EXISTS)
    (print {event: "propose", proposal: proposal, startBlockHeight: (get startBlockHeight data), endBlockHeight: (get endBlockHeight data), proposer: tx-sender})
		(ok true)
	)
)

(define-read-only (get-micro-balance (amount uint))
	(let
		(
			(decimals (unwrap-panic (contract-call? .token get-decimals)))
			(micro (pow u10 decimals))
		)

		(* micro amount)
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
    (unwrap! (get-block-info? id-header-hash blockHeight) none) (some (unwrap-panic (contract-call? .token get-balance voter)))
  )
)

(define-read-only (get-current-total-votes (proposal principal) (voter principal))
	(default-to u0 (map-get? MemberTotalVotes {proposal: proposal, voter: voter, governanceToken: .token}))
)

(define-public (can-vote (who principal) (tokenThreshold uint))
	(let
		(
			(balance (unwrap-panic (contract-call? .token get-balance tx-sender)))
		)
		(ok (>= balance (* MICRO tokenThreshold)))
	)
)

(define-public (vote (for bool) (proposal principal))
	(let
		(
			(proposalData (unwrap! (map-get? Proposals proposal) ERR_UNKNOWN_PROPOSAL))
			(amount (unwrap-panic (get-voting-power tx-sender (get startBlockHeight proposalData))))
		)
		(asserts! (>= block-height (get startBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
		(asserts! (< block-height (get endBlockHeight proposalData)) ERR_PROPOSAL_INACTIVE)
		(asserts! (unwrap-panic (can-vote tx-sender (try! (get-parameter "voteThreshold")))) ERR_INSUFFICIENT_BALANCE)
		(asserts! (is-eq u0 (get-current-total-votes proposal tx-sender)) ERR_ALREADY_VOTED)
		(map-set MemberTotalVotes {proposal: proposal, voter: tx-sender, governanceToken: .token}
			(+ (get-current-total-votes proposal tx-sender) amount)
		)
		(map-set Proposals proposal
			(if for
				(merge proposalData {votesFor: (+ (get votesFor proposalData) amount)})
				(merge proposalData {votesAgainst: (+ (get votesAgainst proposalData) amount)})
			)
		)
		(print {event: "vote", proposal: proposal, voter: tx-sender, for: for, amount: amount})
		(ok true)
	)
)

(define-public (conclude (proposal <proposal-trait>))
	(let
		(
			(proposalData (unwrap! (map-get? Proposals (contract-of proposal)) ERR_UNKNOWN_PROPOSAL))
			(totalVotes (+ (get votesFor proposalData) (get votesAgainst proposalData)))
			(quorumThreshold (* MICRO (try! (get-parameter "quorumThreshold"))))
      (passed (and (>= totalVotes quorumThreshold) (> (get votesFor proposalData) (get votesAgainst proposalData))))
		)
		(asserts! (not (get concluded proposalData)) ERR_PROPOSAL_ALREADY_CONCLUDED)
		(asserts! (>= block-height (+ (try! (get-parameter "executionDelay")) (get endBlockHeight proposalData))) ERR_END_BLOCK_HEIGHT_NOT_REACHED)
		(map-set Proposals (contract-of proposal) (merge proposalData {concluded: true, passed: passed}))
		(print {event: "conclude", proposal: proposal, totalVotes: totalVotes, quorum: quorumThreshold, passed: passed})
		(and passed (try! (contract-call? .core-dao execute proposal tx-sender)))
		(ok passed)
	)
)

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)

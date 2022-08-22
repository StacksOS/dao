(impl-trait .extension-trait.extension-trait)

(use-trait proposal-trait .proposal-trait.proposal-trait)
(use-trait sip10-trait .sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u2600))
(define-constant ERR_UNKNOWN_PARAMETER (err u2601))
(define-constant ERR_PROPOSAL_MINIMUM_START_DELAY (err u2602))
(define-constant ERR_PROPOSAL_MAXIMUM_START_DELAY (err u2603))
(define-constant ERR_PROPOSALS_LOCKED (err u2604))

(define-map Parameters (string-ascii 34) uint)

(map-set Parameters "proposalDuration" u144)
(map-set Parameters "minimumProposalStartDelay" u72)
(map-set Parameters "maximumProposalStartDelay" u432)

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
	(begin
		(try! (is-dao-or-extension))
		(try! (get-parameter parameter))
		(ok (map-set Parameters parameter value))
	)
)

(define-private (set-parameters-iter (item { parameter: (string-ascii 34), value: uint }) (previous (response bool uint)))
	(begin
		(try! previous)
		(try! (get-parameter (get parameter item)))
		(ok (map-set Parameters (get parameter item) (get value item)))
	)
)

(define-public (set-parameters (parameter-list (list 200 { parameter: (string-ascii 34), value: uint })))
	(begin
		(try! (is-dao-or-extension))
		(fold set-parameters-iter parameter-list (ok true))
	)
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
	(ok (unwrap! (map-get? Parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (can-propose (who principal) (tokenId uint))
	(is-eq who (unwrap! (contract-call? .club-membership-nft get-owner tokenId) false))
)

(define-public (propose (proposal <proposal-trait>) (startBlockHeight uint) (tokenId uint))
	(begin	
		(asserts! (>= startBlockHeight (+ block-height (try! (get-parameter "minimumProposalStartDelay")))) ERR_PROPOSAL_MINIMUM_START_DELAY)
		(asserts! (<= startBlockHeight (+ block-height (try! (get-parameter "maximumProposalStartDelay")))) ERR_PROPOSAL_MAXIMUM_START_DELAY)
		(asserts! (is-eq false (contract-call? .investment-club is-raising)) ERR_PROPOSALS_LOCKED)
		(asserts! (can-propose tx-sender tokenId) ERR_UNAUTHORIZED)
		(contract-call? .proposal-voting add-proposal
			proposal
			{
				startBlockHeight: startBlockHeight,
				endBlockHeight: (+ startBlockHeight (try! (get-parameter "proposalDuration"))),
				proposer: tx-sender
			}
		)
	)
)

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)

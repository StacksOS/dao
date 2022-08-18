(impl-trait .extension-trait.extension-trait)

(use-trait proposal-trait .proposal-trait.proposal-trait)
(use-trait sip10-trait .sip10-trait.sip10-trait)
(use-trait voting-trait .voting-trait.voting-trait)

(define-constant ERR_UNAUTHORIZED (err u2600))
(define-constant ERR_NOT_NFT_OWNER (err u2601))
(define-constant ERR_UNKNOWN_PARAMETER (err u2603))
(define-constant ERR_PROPOSAL_MINIMUM_START_DELAY (err u2604))
(define-constant ERR_PROPOSAL_MAXIMUM_START_DELAY (err u2605))

(define-map parameters (string-ascii 34) uint)

(map-set parameters "proposalDuration" u432)
(map-set parameters "minimumProposalStartDelay" u144)
(map-set parameters "maximumProposalStartDelay" u1008)

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

(define-private (set-parameters-iter (item { parameter: (string-ascii 34), value: uint }) (previous (response bool uint)))
	(begin
		(try! previous)
		(try! (get-parameter (get parameter item)))
		(ok (map-set parameters (get parameter item) (get value item)))
	)
)

(define-public (set-parameters (parameter-list (list 200 { parameter: (string-ascii 34), value: uint })))
	(begin
		(try! (is-dao-or-extension))
		(fold set-parameters-iter parameter-list (ok true))
	)
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
	(ok (unwrap! (map-get? parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (can-propose (who principal) (tokenId uint))
	(match (unwrap! (contract-call? .nft get-owner tokenId) false) owner (is-eq who owner) false)
)

(define-public (propose (proposal <proposal-trait>) (votingExtension <voting-trait>) (startBlockHeight uint) (tokenId uint))
	(begin
		(asserts! (can-propose tx-sender tokenId) ERR_NOT_NFT_OWNER)
		(asserts! (>= startBlockHeight (+ block-height (try! (get-parameter "minimumProposalStartDelay")))) ERR_PROPOSAL_MINIMUM_START_DELAY)
		(asserts! (<= startBlockHeight (+ block-height (try! (get-parameter "maximumProposalStartDelay")))) ERR_PROPOSAL_MAXIMUM_START_DELAY)
		(contract-call? votingExtension add-proposal
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

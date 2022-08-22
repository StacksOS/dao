(impl-trait .sip9-trait.sip9-trait)

(define-constant ERR_ONLY_OWNER (err u100))
(define-constant ERR_NOT_TOKEN_OWNER (err u101))

(define-data-var contractOwner principal .core-dao)
(define-data-var lastTokenId uint u0)

(define-non-fungible-token Stacks-OS uint)

(define-public (mint (recipient principal))
  (let
    (
      (tokenId (+ (var-get lastTokenId) u1))
    )
    (asserts! (is-eq tx-sender (var-get contractOwner)) ERR_ONLY_OWNER)
    (try! (nft-mint? Stacks-OS tokenId recipient))
    (ok (var-set lastTokenId tokenId))
  )
)

(define-public (mint-many (mints (list 200 principal)))
	(ok (map mint-many-iter mints))
)

(define-private (mint-many-iter (recipient principal))
	(begin
		(print { event: "mint-many", recipient: recipient })
		(mint recipient)
	)
)

(define-public (set-owner (newOwner principal))
	(begin
		(asserts! (is-eq tx-sender (var-get contractOwner)) ERR_ONLY_OWNER)
		(ok (var-set contractOwner newOwner))
	)
)

(define-read-only (get-last-token-id)
  (ok (var-get lastTokenId))
)

(define-read-only (get-token-uri (tokenId uint))
  (ok none)
)

(define-read-only (get-owner (tokenId uint))
  (ok (nft-get-owner? Stacks-OS tokenId))
)

(define-public (transfer (tokenId uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_NOT_TOKEN_OWNER)
    (nft-transfer? Stacks-OS tokenId sender recipient)
  )
)
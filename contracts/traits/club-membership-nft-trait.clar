(define-trait club-membership-nft-trait
	(
		(mint (principal) (response bool uint))

		(burn (uint principal) (response bool uint))
	)
)

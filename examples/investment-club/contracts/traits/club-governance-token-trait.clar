(define-trait club-governance-token-trait
	(
		(mint (uint principal) (response bool uint))

		(burn (uint principal) (response bool uint))
	)
)

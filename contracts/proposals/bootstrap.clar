(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		(let
			(
				(decimals (unwrap-panic (contract-call? .token get-decimals)))
				(microTokens (pow u10 decimals))
			)

			;; Enable extensions
			(try! (contract-call? .core-dao set-extensions
				(list
					{extension: .treasury, enabled: true}
					{extension: .token, enabled: true}
					{extension: .proposal-submission, enabled: true}
					{extension: .proposal-voting, enabled: true}
					{extension: .emergency-execute, enabled: true}
          {extension: .emergency-proposals, enabled: true}
				)
			))

			;; Set emergency team
			(try! (contract-call? .emergency-proposals set-emergency-team-member 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM true))

    	;; Set emergency signers
    	(try! (contract-call? .emergency-execute set-executive-team-member 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM true))
			(try! (contract-call? .emergency-execute set-executive-team-member 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5 true))
			(try! (contract-call? .emergency-execute set-executive-team-member 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG true))

			;; Set signals required
			(try! (contract-call? .emergency-execute set-signals-required u2))

			;; Whitelist token
			(try! (contract-call? .treasury set-whitelist .token true))

			;; Mint 700,000 tokens to the DAO treasury upon initialization.
			(try! (contract-call? .token mint (* microTokens u700000) .treasury))
			
			(print {message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender})
			(ok true)
		)
	)
)

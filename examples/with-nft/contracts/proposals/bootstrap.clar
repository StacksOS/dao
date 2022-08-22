(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		;; Enable extensions
		(try! (contract-call? .core-dao set-extensions
			(list
				{ extension: .treasury, enabled: true }
				{ extension: .nft, enabled: true }
				{ extension: .proposal-submission, enabled: true }
				{ extension: .proposal-voting, enabled: true }
			)
		))
		(unwrap-panic (contract-call? .nft mint-many
			(list
				'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
				'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
				'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
				'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
				'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
			)
		))

		;; Whitelist token
		(try! (contract-call? .treasury set-whitelist .nft true))
		
		(print { message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender })
		(ok true)
	)
)

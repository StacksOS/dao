(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		;; Enable extensions
		(try! (contract-call? .core-dao set-extensions
			(list
				{ extension: .treasury, enabled: true }
				{ extension: .club-governance-token, enabled: true }
				{ extension: .club-membership-nft, enabled: true }
				{ extension: .investment-club, enabled: true }
				{ extension: .proposal-submission, enabled: true }
				{ extension: .proposal-voting, enabled: true }
			)
		))

		(try! (contract-call? .club-membership-nft mint 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM))
		(try! (contract-call? .club-membership-nft mint 'ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5))

		(try! (contract-call? .investment-club start))
		
		(print { message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender })
		(ok true)
	)
)

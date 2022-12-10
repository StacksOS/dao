(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		(try! (contract-call? .core-dao set-extensions
			(list
				{ extension: .treasury, enabled: true }
				{ extension: .multisig, enabled: true }
			)
		))
		
		(print { message: "...to be a completely separate network and separate block chain, yet share CPU power with Bitcoin.", sender: sender })
		(ok true)
	)
)

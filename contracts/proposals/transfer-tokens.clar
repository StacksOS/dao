(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
	(begin
		(try! (contract-call? .treasury sip10-transfer u100000000 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6 none .token))
		(print {event: "execute", sender: sender})
		(ok true)
	)
)

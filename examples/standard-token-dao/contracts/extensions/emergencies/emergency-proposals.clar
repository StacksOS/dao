(impl-trait .extension-trait.extension-trait)

(use-trait proposal-trait .proposal-trait.proposal-trait)
(use-trait voting-trait .voting-trait.voting-trait)

(define-constant ERR_UNAUTHORIZED (err u2700))
(define-constant ERR_NOT_EMERGENCY_TEAM_MEMBER (err u2701))
(define-constant ERR_SUNSET_HEIGHT_REACHED (err u2702))
(define-constant ERR_SUNSET_HEIGHT_IN_PAST (err u2703))

(define-data-var emergencyProposalDuration uint u144)
(define-data-var emergencyTeamSunsetHeight uint (+ block-height u13140))

(define-map EmergencyTeam principal bool)

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-emergency-proposal-duration (duration uint))
	(begin
		(try! (is-dao-or-extension))
		(ok (var-set emergencyProposalDuration duration))
	)
)

(define-public (set-emergency-team-sunset-height (height uint))
	(begin
		(try! (is-dao-or-extension))
		(asserts! (> height block-height) ERR_SUNSET_HEIGHT_IN_PAST)
		(ok (var-set emergencyTeamSunsetHeight height))
	)
)

(define-public (set-emergency-team-member (who principal) (member bool))
	(begin
		(try! (is-dao-or-extension))
		(ok (map-set EmergencyTeam who member))
	)
)

(define-read-only (is-emergency-team-member (who principal))
	(default-to false (map-get? EmergencyTeam who))
)

(define-public (emergency-propose (proposal <proposal-trait>) (votingExtension <voting-trait>))
	(begin
		(asserts! (is-emergency-team-member tx-sender) ERR_NOT_EMERGENCY_TEAM_MEMBER)
		(asserts! (< block-height (var-get emergencyTeamSunsetHeight)) ERR_SUNSET_HEIGHT_REACHED)
		(contract-call? votingExtension add-proposal proposal
			{
				startBlockHeight: block-height,
				endBlockHeight: (+ block-height (var-get emergencyProposalDuration)),
				proposer: tx-sender
			}
		)
	)
)

(define-public (callback (sender principal) (memo (buff 34)))
	(ok true)
)

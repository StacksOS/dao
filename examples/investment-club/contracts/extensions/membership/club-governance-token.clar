(impl-trait .club-governance-token-trait.club-governance-token-trait)

(define-constant ERR_UNAUTHORIZED (err u2400))
(define-constant ERR_NOT_TOKEN_OWNER (err u2401))
(define-constant ERR_MEMBERSHIP_LIMIT_REACHED (err u2402))

(define-fungible-token Stacks-OS)

(define-data-var tokenName (string-ascii 32) "StacksOS")
(define-data-var tokenSymbol (string-ascii 10) "SOS")
(define-data-var tokenUri (optional (string-utf8 256)) none)
(define-data-var tokenDecimals uint u6)

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (mint (amount uint) (recipient principal))
	(begin
		(try! (is-dao-or-extension))
		(ft-mint? Stacks-OS amount recipient)
	)
)

(define-public (burn (amount uint) (owner principal))
	(begin
		(try! (is-dao-or-extension))
		(ft-burn? Stacks-OS amount owner)
	)
)

(define-private (mint-many-iter (item { amount: uint, recipient: principal }))
	(ft-mint? Stacks-OS (get amount item) (get recipient item))
)

(define-public (mint-many (recipients (list 200 { amount: uint, recipient: principal })))
	(begin
		(try! (is-dao-or-extension))
		(ok (map mint-many-iter recipients))
	)
)

(define-read-only (get-name)
	(ok (var-get tokenName))
)

(define-read-only (get-symbol)
	(ok (var-get tokenSymbol))
)

(define-read-only (get-decimals)
	(ok (var-get tokenDecimals))
)

(define-read-only (get-balance (who principal))
	(ok (ft-get-balance Stacks-OS who))
)

(define-read-only (get-total-supply)
	(ok (ft-get-supply Stacks-OS))
)

(define-read-only (get-token-uri)
	(ok (var-get tokenUri))
)
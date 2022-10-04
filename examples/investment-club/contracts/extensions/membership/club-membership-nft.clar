(impl-trait .club-membership-nft-trait.club-membership-nft-trait)

(define-constant ERR_UNAUTHORIZED (err u2400))
(define-constant ERR_NOT_TOKEN_OWNER (err u2401))
(define-constant ERR_MEMBERSHIP_LIMIT_REACHED (err u2402))
(define-constant ERR_ALREADY_MEMBER (err u2403))

(define-constant MEMBERSHIP_LIMIT u99)

(define-non-fungible-token Club-Pass uint)

(define-data-var lastId uint u0)
(define-data-var totalSupply uint u0)
(define-data-var tokenUri (optional (string-utf8 256)) none)

(define-map Members principal bool)

(define-public (is-dao-or-extension)
	(ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (mint (recipient principal))
	(begin
		(try! (is-dao-or-extension))
		(let
			(
				(nextId (+ (var-get lastId) u1))
				(newTotalSupply (+ (var-get totalSupply) u1))
			)
			(asserts! (<= newTotalSupply MEMBERSHIP_LIMIT) ERR_MEMBERSHIP_LIMIT_REACHED)
			(asserts! (map-insert Members recipient true) ERR_ALREADY_MEMBER)
			(var-set lastId nextId)
			(var-set totalSupply newTotalSupply)
			(nft-mint? Club-Pass nextId recipient)
		)
	)
)

(define-public (burn (tokenId uint) (owner principal))
	(begin
		(try! (is-dao-or-extension))
		(var-set totalSupply (- (var-get totalSupply) u1))
		(map-delete Members owner)
		(nft-burn? Club-Pass tokenId owner)
	)
)

(define-private (mint-many-iter (data { recipient: principal }))
	(mint (get recipient data))
)

(define-public (mint-many (recipients (list 200 { recipient: principal })))
	(begin
		(try! (is-dao-or-extension))
		(ok (map mint-many-iter recipients))
	)
)

(define-read-only (get-total-supply)
	(ok (var-get totalSupply))
)

(define-read-only (get-token-uri)
	(ok (var-get tokenUri))
)

(define-read-only (get-owner (tokenId uint))
	(nft-get-owner? Club-Pass tokenId)
)

(define-read-only (is-member (who principal))
	(default-to false (map-get? Members who))
)
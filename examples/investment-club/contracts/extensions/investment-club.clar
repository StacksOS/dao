;; Investment Clubs
;; Rules
;; 1. You can only claim your unallocated capital. (pro rata share of liquid STX in the treasury).
;; 2. You can claim during 2 windows: 
;;      - The first window is when a new member is being added.
;;      - The second window is when the IC is making an investment.
;; 3. Members can delegate their governance power to others (only non-members).

(impl-trait .extension-trait.extension-trait)

(define-constant ERR_UNAUTHORIZED (err u2300))
(define-constant ERR_DEPOSIT_WINDOW_ALREADY_OPEN (err u2301))
(define-constant ERR_DEPOSIT_WINDOW_CLOSED (err u2302))
(define-constant ERR_MINIMUM_DEPOSIT_NOT_REACHED (err u2303))
(define-constant ERR_REACHED_MAX_RAISE_AMOUNT (err u2304))
(define-constant ERR_CLAIM_WINDOW_NOT_OPEN (err u2305))
(define-constant ERR_UNKNOWN_PARAMETER (err u2306))
(define-constant ERR_NOT_ENOUGH_FUNDS (err u2307))

(define-data-var roundId uint u0)

(define-map Parameters (string-ascii 34) uint)
(define-map DepositRounds uint {cap: uint, closesAt: uint, raised: uint})

(map-set Parameters "startWindow" u720)
(map-set Parameters "minimumDepositAmount" u100)

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-parameter (parameter (string-ascii 34)) (value uint))
	(begin
		(try! (is-dao-or-extension))
		(try! (get-parameter parameter))
		(ok (map-set Parameters parameter value))
	)
)

(define-public (start)
  (begin
    (asserts! (is-eq (var-get roundId) u0) ERR_DEPOSIT_WINDOW_ALREADY_OPEN)
    (let
      (
        (nextRoundId (+ (var-get roundId) u1))
      )
      (var-set roundId nextRoundId)
      (ok (map-insert DepositRounds nextRoundId {cap: (* (pow u10 u6) u10000), closesAt: (+ block-height (try! (get-parameter "startWindow"))), raised: u0}))
    )
  )
)

(define-public (deposit (amount uint) (membershipTokenId uint))
  (begin
    (asserts! (is-eq tx-sender (unwrap! (contract-call? .club-membership-nft get-owner membershipTokenId) (err u1))) ERR_UNAUTHORIZED)
    (asserts! (is-eq true (is-raising)) ERR_DEPOSIT_WINDOW_CLOSED)
    (asserts! (<= (+ amount (unwrap-panic (get-raised (var-get roundId)))) (unwrap-panic (get-cap (var-get roundId)))) ERR_REACHED_MAX_RAISE_AMOUNT)
    (asserts! (>= amount (try! (get-parameter "minimumDepositAmount"))) ERR_MINIMUM_DEPOSIT_NOT_REACHED)
    (map-set DepositRounds (var-get roundId)
      (merge (unwrap-panic (get-round (var-get roundId))) {raised: (+ amount (unwrap-panic (get-raised (var-get roundId))))})
    )
    (try! (contract-call? .club-governance-token mint amount tx-sender))
    (stx-transfer? amount tx-sender .treasury)
  )
)

(define-public (ragequit (membershipTokenId uint))
  (begin
    (asserts! (is-eq false (is-raising)) ERR_CLAIM_WINDOW_NOT_OPEN)
    (try! (contract-call? .treasury stx-transfer (try! (get-payout tx-sender (get-treasury-balance block-height))) tx-sender none))
    (try! (contract-call? .club-membership-nft burn membershipTokenId tx-sender))
    (contract-call? .club-governance-token burn (unwrap-panic (contract-call? .club-governance-token get-balance tx-sender)) tx-sender)
  )
)

(define-read-only (get-ownership-percentage (member principal))
  (let
    (
      (totalSupply (unwrap-panic (contract-call? .club-governance-token get-total-supply)))
      (memberTokens (unwrap-panic (contract-call? .club-governance-token get-balance member)))
    )
    (if (is-eq memberTokens u0)
      u0
      (/ (* (pow u10 u6) memberTokens) totalSupply)
    )
  )
)

(define-public (distribute (member principal) (payoutAmount uint))
  (begin
    (try! (is-dao-or-extension))
    (let
      (
        (payout (try! (get-payout member payoutAmount)))
      )
      (print {
        event: "distribute",
        member: member,
        payout: payout
      })
      (ok (contract-call? .treasury stx-transfer payout member none))
    )
  )
)

(define-public (distribute-many (data (list 99 {member: principal, payoutAmount: uint})))
  (begin
    (try! (is-dao-or-extension))
    (ok (map distribute-many-iter data))
  )
)

(define-private (distribute-many-iter (data {member: principal, payoutAmount: uint}))
  (distribute (get member data) (get payoutAmount data))
)

(define-read-only (get-treasury-balance (blockHeight uint))
  (at-block
    (unwrap! (get-block-info? id-header-hash blockHeight) u0) (contract-call? .treasury get-balance)
  )
)

(define-read-only (get-payout (member principal) (payoutAmount uint))
  (let
    (
      (ownershipPercentage (get-ownership-percentage member))
      (treasuryBalance (get-treasury-balance block-height))
    )
    (asserts! (>= treasuryBalance payoutAmount) ERR_NOT_ENOUGH_FUNDS)
    (ok (/ (* payoutAmount ownershipPercentage) (pow u10 u6)))
  )
)

(define-read-only (get-parameter (parameter (string-ascii 34)))
	(ok (unwrap! (map-get? Parameters parameter) ERR_UNKNOWN_PARAMETER))
)

(define-read-only (get-round (id uint))
  (map-get? DepositRounds id)
)

(define-read-only (get-cap (id uint))
  (get cap (get-round id))
)

(define-read-only (get-closes-at (id uint))
  (get closesAt (get-round id))
)

(define-read-only (get-raised (id uint))
  (get raised (get-round id))
)

(define-read-only (is-raising)
  (<= block-height (unwrap! (get-closes-at (var-get roundId)) false))
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)
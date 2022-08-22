(impl-trait .extension-trait.extension-trait)

(use-trait sip9 .sip9-trait.sip9-trait)
(use-trait sip10 .sip10-trait.sip10-trait)

(define-constant ERR_UNAUTHORIZED (err u3200))
(define-constant ERR_ASSET_NOT_WHITELISTED (err u3201))

(define-constant TREASURY_ADDRESS (as-contract tx-sender))

(define-map WhitelistedAssets principal bool)

(define-public (is-dao-or-extension)
  (ok (asserts! (or (is-eq tx-sender .core-dao) (contract-call? .core-dao is-extension contract-caller)) ERR_UNAUTHORIZED))
)

(define-public (set-whitelist (token principal) (enabled bool))
  (begin
    (try! (is-dao-or-extension))
    (print { event: "whitelist", token: token, enabled: enabled, caller: tx-sender })
    (ok (map-set WhitelistedAssets token enabled))
  )
)

(define-public (set-whitelists (whitelist (list 100 { token: principal, enabled: bool })))
  (begin
    (try! (is-dao-or-extension))
    (ok (map set-whitelist-iter whitelist))
  )
)

(define-public (stx-deposit (amount uint))
  (begin
    (try! (stx-transfer? amount tx-sender TREASURY_ADDRESS))
    (print { event: "stx-deposit", amount: amount, caller: tx-sender })
    (ok true)
  )
)

(define-public (sip9-deposit (asset <sip9>) (id uint))
  (begin
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (contract-call? asset transfer id tx-sender TREASURY_ADDRESS))
    (print { event: "sip9-deposit", assetContract: (contract-of asset), tokenId: id, caller: tx-sender })
    (ok true)
  )
)

(define-public (sip10-deposit (asset <sip10>) (amount uint))
  (begin
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (contract-call? asset transfer amount tx-sender TREASURY_ADDRESS none))
    (print { event: "sip10-deposit", amount: amount, assetContract: (contract-of asset), caller: tx-sender })
    (ok true)
  )
)

(define-public (stx-transfer (amount uint) (recipient principal) (memo (optional (buff 34))))
  (begin
    (try! (is-dao-or-extension))
    (match memo with-memo (print with-memo) 0x)
    (try! (as-contract (stx-transfer? amount TREASURY_ADDRESS recipient)))
    (print { event: "stx-transfer", amount: amount, recipient: recipient, memo: (if (is-none memo) none (some memo)), caller: tx-sender })
    (ok true)
  )
)

(define-public (sip9-transfer (tokenId uint) (recipient principal) (asset <sip9>))
  (begin
    (try! (is-dao-or-extension))
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (as-contract (contract-call? asset transfer tokenId TREASURY_ADDRESS recipient)))
    (print { event: "sip9-transfer", tokenId: tokenId, recipient: recipient, caller: tx-sender })
    (ok true)
  )
)

(define-public (sip10-transfer (amount uint) (recipient principal) (memo (optional (buff 34))) (asset <sip10>))
  (begin
    (try! (is-dao-or-extension))
    (asserts! (is-whitelisted (contract-of asset)) ERR_ASSET_NOT_WHITELISTED)
    (try! (as-contract (contract-call? asset transfer amount TREASURY_ADDRESS recipient memo)))
    (print { event: "sip10-transfer", assetContract: (contract-of asset), recipient: recipient, caller: tx-sender })
    (ok true)
  )
)

(define-public (stx-transfer-many (payload (list 200 { amount: uint, recipient: principal, memo: (optional (buff 34)) })))
  (begin
    (try! (is-dao-or-extension))
    (as-contract (fold stx-transfer-many-iter payload (ok true)))
  )
)

(define-public (sip9-transfer-many (payload (list 200 { tokenId: uint, recipient: principal })) (asset <sip9>))
  (begin
    (try! (is-dao-or-extension))
    (ok (as-contract (fold sip9-transfer-many-iter payload asset)))
  )
)

(define-public (sip10-transfer-many (payload (list 200 { amount: uint, recipient: principal, memo: (optional (buff 34)) })) (asset <sip10>))
  (begin
    (try! (is-dao-or-extension))
    (ok (as-contract (fold sip10-transfer-many-iter payload asset)))
  )
)

(define-read-only (is-whitelisted (assetContract principal))
  (default-to false (get-whitelisted-asset assetContract))
)

(define-read-only (get-whitelisted-asset (assetContract principal))
  (map-get? WhitelistedAssets assetContract)
)

(define-read-only (get-balance)
  (stx-get-balance TREASURY_ADDRESS)
)

(define-private (set-whitelist-iter (data { token: principal, enabled: bool }))
  (begin
    (print { event: "whitelist", token: (get token data), enabled: (get enabled data) })
    (map-set WhitelistedAssets (get token data) (get enabled data))
  )
)

(define-private (stx-transfer-many-iter (data { amount: uint, recipient: principal, memo: (optional (buff 34)) }) (previousResult (response bool uint)))
  (begin
    (try! previousResult)
    (match (get memo data) with-memo (print with-memo) 0x)
    (print { event: "stx-transfer", amount: (get amount data), recipient: (get recipient data), memo: (if (is-none (get memo data)) none (some (get memo data))), caller: tx-sender })
    (stx-transfer? (get amount data) TREASURY_ADDRESS (get recipient data))
  )
)

(define-private (sip9-transfer-many-iter (data { tokenId: uint, recipient: principal }) (asset <sip9>))
  (begin
    (unwrap-panic (contract-call? asset transfer (get tokenId data) tx-sender (get recipient data)))
    asset
  )
)

(define-private (sip10-transfer-many-iter (data { amount: uint, recipient: principal, memo: (optional (buff 34)) }) (asset <sip10>))
  (begin
    (unwrap-panic (contract-call? asset transfer (get amount data) tx-sender (get recipient data) (get memo data)))
    asset
  )
)

(define-public (callback (sender principal) (memo (buff 34)))
  (ok true)
)

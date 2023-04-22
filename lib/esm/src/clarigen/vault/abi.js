// prettier-ignore
export const VaultInterface = {
    "functions": [
        {
            "access": "private",
            "args": [
                {
                    "name": "item",
                    "type": {
                        "tuple": [
                            {
                                "name": "enabled",
                                "type": "bool"
                            },
                            {
                                "name": "token",
                                "type": "principal"
                            }
                        ]
                    }
                }
            ],
            "name": "set-whitelist-iter",
            "outputs": {
                "type": "bool"
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "sender",
                    "type": "principal"
                },
                {
                    "name": "memo",
                    "type": {
                        "buffer": {
                            "length": 34
                        }
                    }
                }
            ],
            "name": "callback",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "amount",
                    "type": "uint128"
                }
            ],
            "name": "deposit",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "amount",
                    "type": "uint128"
                }
            ],
            "name": "deposit-ft",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "nft",
                    "type": "trait_reference"
                },
                {
                    "name": "id",
                    "type": "uint128"
                }
            ],
            "name": "deposit-nft",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "assetContract",
                    "type": "trait_reference"
                }
            ],
            "name": "get-balance-of",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [],
            "name": "is-dao-or-extension",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "token",
                    "type": "principal"
                },
                {
                    "name": "enabled",
                    "type": "bool"
                }
            ],
            "name": "set-whitelist",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "whitelist",
                    "type": {
                        "list": {
                            "length": 100,
                            "type": {
                                "tuple": [
                                    {
                                        "name": "enabled",
                                        "type": "bool"
                                    },
                                    {
                                        "name": "token",
                                        "type": "principal"
                                    }
                                ]
                            }
                        }
                    }
                }
            ],
            "name": "set-whitelists",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": {
                            "list": {
                                "length": 100,
                                "type": "bool"
                            }
                        }
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "amount",
                    "type": "uint128"
                },
                {
                    "name": "recipient",
                    "type": "principal"
                }
            ],
            "name": "transfer",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "ft",
                    "type": "trait_reference"
                },
                {
                    "name": "amount",
                    "type": "uint128"
                },
                {
                    "name": "recipient",
                    "type": "principal"
                }
            ],
            "name": "transfer-ft",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "public",
            "args": [
                {
                    "name": "nft",
                    "type": "trait_reference"
                },
                {
                    "name": "id",
                    "type": "uint128"
                },
                {
                    "name": "recipient",
                    "type": "principal"
                }
            ],
            "name": "transfer-nft",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "bool"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-balance",
            "outputs": {
                "type": "uint128"
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "assetContract",
                    "type": "principal"
                }
            ],
            "name": "get-whitelisted-asset",
            "outputs": {
                "type": {
                    "optional": "bool"
                }
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "assetContract",
                    "type": "principal"
                }
            ],
            "name": "is-whitelisted",
            "outputs": {
                "type": "bool"
            }
        }
    ],
    "fungible_tokens": [],
    "maps": [
        {
            "key": "principal",
            "name": "WhitelistedAssets",
            "value": "bool"
        }
    ],
    "non_fungible_tokens": [],
    "variables": [
        {
            "access": "constant",
            "name": "CONTRACT_ADDRESS",
            "type": "principal"
        },
        {
            "access": "constant",
            "name": "ERR_ASSET_NOT_WHITELISTED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_FAILED_TO_TRANSFER_FT",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_FAILED_TO_TRANSFER_NFT",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_FAILED_TO_TRANSFER_STX",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_UNAUTHORIZED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        }
    ]
};

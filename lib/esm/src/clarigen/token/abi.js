// prettier-ignore
export const TokenInterface = {
    "functions": [
        {
            "access": "public",
            "args": [],
            "name": "mint",
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
                    "name": "amount",
                    "type": "uint128"
                },
                {
                    "name": "sender",
                    "type": "principal"
                },
                {
                    "name": "recipient",
                    "type": "principal"
                },
                {
                    "name": "memo",
                    "type": {
                        "optional": {
                            "buffer": {
                                "length": 34
                            }
                        }
                    }
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
            "access": "read_only",
            "args": [
                {
                    "name": "who",
                    "type": "principal"
                }
            ],
            "name": "get-balance",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-decimals",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-name",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "string-ascii": {
                                "length": 4
                            }
                        }
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-symbol",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "string-ascii": {
                                "length": 4
                            }
                        }
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-token-uri",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "optional": {
                                "string-utf8": {
                                    "length": 256
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [],
            "name": "get-total-supply",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": "uint128"
                    }
                }
            }
        }
    ],
    "fungible_tokens": [
        {
            "name": "mega"
        }
    ],
    "maps": [],
    "non_fungible_tokens": [],
    "variables": [
        {
            "access": "constant",
            "name": "contract-owner",
            "type": "principal"
        },
        {
            "access": "constant",
            "name": "dao-principal",
            "type": "principal"
        },
        {
            "access": "constant",
            "name": "dao-supply",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "distribution-principal",
            "type": "principal"
        },
        {
            "access": "constant",
            "name": "distribution-supply",
            "type": "uint128"
        },
        {
            "access": "constant",
            "name": "err-max-supply",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "err-not-token-owner",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "err-owner-only",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "team-principal",
            "type": "principal"
        },
        {
            "access": "constant",
            "name": "team-supply",
            "type": "uint128"
        },
        {
            "access": "variable",
            "name": "token-uri",
            "type": {
                "optional": {
                    "string-utf8": {
                        "length": 256
                    }
                }
            }
        }
    ]
};

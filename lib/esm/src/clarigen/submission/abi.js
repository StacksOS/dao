// prettier-ignore
export const SubmissionInterface = {
    "functions": [
        {
            "access": "private",
            "args": [
                {
                    "name": "item",
                    "type": {
                        "tuple": [
                            {
                                "name": "parameter",
                                "type": {
                                    "string-ascii": {
                                        "length": 34
                                    }
                                }
                            },
                            {
                                "name": "value",
                                "type": "uint128"
                            }
                        ]
                    }
                },
                {
                    "name": "previous",
                    "type": {
                        "response": {
                            "error": "uint128",
                            "ok": "bool"
                        }
                    }
                }
            ],
            "name": "set-parameters-iter",
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
                    "name": "proposal",
                    "type": "trait_reference"
                },
                {
                    "name": "startBlockHeight",
                    "type": "uint128"
                }
            ],
            "name": "propose",
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
                    "name": "parameter",
                    "type": {
                        "string-ascii": {
                            "length": 34
                        }
                    }
                },
                {
                    "name": "value",
                    "type": "uint128"
                }
            ],
            "name": "set-parameter",
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
                    "name": "parameter-list",
                    "type": {
                        "list": {
                            "length": 200,
                            "type": {
                                "tuple": [
                                    {
                                        "name": "parameter",
                                        "type": {
                                            "string-ascii": {
                                                "length": 34
                                            }
                                        }
                                    },
                                    {
                                        "name": "value",
                                        "type": "uint128"
                                    }
                                ]
                            }
                        }
                    }
                }
            ],
            "name": "set-parameters",
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
                },
                {
                    "name": "tokenThreshold",
                    "type": "uint128"
                }
            ],
            "name": "can-propose",
            "outputs": {
                "type": "bool"
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "amount",
                    "type": "uint128"
                }
            ],
            "name": "get-micro-balance",
            "outputs": {
                "type": "uint128"
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "parameter",
                    "type": {
                        "string-ascii": {
                            "length": 34
                        }
                    }
                }
            ],
            "name": "get-parameter",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": "uint128"
                    }
                }
            }
        }
    ],
    "fungible_tokens": [],
    "maps": [
        {
            "key": {
                "string-ascii": {
                    "length": 34
                }
            },
            "name": "parameters",
            "value": "uint128"
        }
    ],
    "non_fungible_tokens": [],
    "variables": [
        {
            "access": "constant",
            "name": "ERR_PROPOSAL_MAXIMUM_START_DELAY",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_PROPOSAL_MINIMUM_START_DELAY",
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
        },
        {
            "access": "constant",
            "name": "ERR_UNAUTHORIZED_PROPOSER",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_UNKNOWN_PARAMETER",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        }
    ]
};

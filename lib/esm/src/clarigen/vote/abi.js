// prettier-ignore
export const VoteInterface = {
    "functions": [
        {
            "access": "private",
            "args": [
                {
                    "name": "delegator",
                    "type": {
                        "tuple": [
                            {
                                "name": "delegator",
                                "type": {
                                    "optional": "principal"
                                }
                            },
                            {
                                "name": "for",
                                "type": "bool"
                            },
                            {
                                "name": "proposal",
                                "type": "principal"
                            }
                        ]
                    }
                }
            ],
            "name": "vote-map",
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
                    "name": "data",
                    "type": {
                        "tuple": [
                            {
                                "name": "endBlockHeight",
                                "type": "uint128"
                            },
                            {
                                "name": "proposer",
                                "type": "principal"
                            },
                            {
                                "name": "startBlockHeight",
                                "type": "uint128"
                            }
                        ]
                    }
                }
            ],
            "name": "add-proposal",
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
            "args": [
                {
                    "name": "proposal",
                    "type": "trait_reference"
                }
            ],
            "name": "conclude",
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
                    "name": "who",
                    "type": "principal"
                }
            ],
            "name": "delegate",
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
                    "name": "who",
                    "type": "principal"
                }
            ],
            "name": "revoke-delegate",
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
                    "name": "for",
                    "type": "bool"
                },
                {
                    "name": "proposal",
                    "type": "principal"
                },
                {
                    "name": "delegator",
                    "type": {
                        "optional": "principal"
                    }
                }
            ],
            "name": "vote",
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
                    "name": "votes",
                    "type": {
                        "list": {
                            "length": 100,
                            "type": {
                                "tuple": [
                                    {
                                        "name": "delegator",
                                        "type": {
                                            "optional": "principal"
                                        }
                                    },
                                    {
                                        "name": "for",
                                        "type": "bool"
                                    },
                                    {
                                        "name": "proposal",
                                        "type": "principal"
                                    }
                                ]
                            }
                        }
                    }
                }
            ],
            "name": "vote-many",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "list": {
                                "length": 100,
                                "type": {
                                    "response": {
                                        "error": "uint128",
                                        "ok": "bool"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "voter",
                    "type": "principal"
                },
                {
                    "name": "blockHeight",
                    "type": "uint128"
                },
                {
                    "name": "tokenThreshold",
                    "type": "uint128"
                }
            ],
            "name": "can-vote",
            "outputs": {
                "type": "bool"
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "sender",
                    "type": "principal"
                },
                {
                    "name": "delegator",
                    "type": {
                        "optional": "principal"
                    }
                }
            ],
            "name": "can-vote-on-behalf",
            "outputs": {
                "type": "bool"
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "proposal",
                    "type": "principal"
                },
                {
                    "name": "voter",
                    "type": "principal"
                }
            ],
            "name": "get-current-total-votes",
            "outputs": {
                "type": "uint128"
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
            "name": "get-delegate",
            "outputs": {
                "type": {
                    "response": {
                        "error": "none",
                        "ok": {
                            "optional": "principal"
                        }
                    }
                }
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
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "proposal",
                    "type": "principal"
                }
            ],
            "name": "get-proposal-data",
            "outputs": {
                "type": {
                    "optional": {
                        "tuple": [
                            {
                                "name": "concluded",
                                "type": "bool"
                            },
                            {
                                "name": "endBlockHeight",
                                "type": "uint128"
                            },
                            {
                                "name": "passed",
                                "type": "bool"
                            },
                            {
                                "name": "proposer",
                                "type": "principal"
                            },
                            {
                                "name": "startBlockHeight",
                                "type": "uint128"
                            },
                            {
                                "name": "votesAgainst",
                                "type": "uint128"
                            },
                            {
                                "name": "votesFor",
                                "type": "uint128"
                            }
                        ]
                    }
                }
            }
        },
        {
            "access": "read_only",
            "args": [
                {
                    "name": "voter",
                    "type": "principal"
                },
                {
                    "name": "blockHeight",
                    "type": "uint128"
                }
            ],
            "name": "get-voting-power",
            "outputs": {
                "type": {
                    "optional": "uint128"
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
            "name": "is-delegating",
            "outputs": {
                "type": "bool"
            }
        }
    ],
    "fungible_tokens": [],
    "maps": [
        {
            "key": "principal",
            "name": "Delegates",
            "value": "principal"
        },
        {
            "key": "principal",
            "name": "Delegators",
            "value": "bool"
        },
        {
            "key": {
                "tuple": [
                    {
                        "name": "governanceToken",
                        "type": "principal"
                    },
                    {
                        "name": "proposal",
                        "type": "principal"
                    },
                    {
                        "name": "voter",
                        "type": "principal"
                    }
                ]
            },
            "name": "MemberTotalVotes",
            "value": "uint128"
        },
        {
            "key": "principal",
            "name": "Proposals",
            "value": {
                "tuple": [
                    {
                        "name": "concluded",
                        "type": "bool"
                    },
                    {
                        "name": "endBlockHeight",
                        "type": "uint128"
                    },
                    {
                        "name": "passed",
                        "type": "bool"
                    },
                    {
                        "name": "proposer",
                        "type": "principal"
                    },
                    {
                        "name": "startBlockHeight",
                        "type": "uint128"
                    },
                    {
                        "name": "votesAgainst",
                        "type": "uint128"
                    },
                    {
                        "name": "votesFor",
                        "type": "uint128"
                    }
                ]
            }
        },
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
            "name": "ERR_ALREADY_VOTED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_DELEGATE_NOT_FOUND",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_END_BLOCK_HEIGHT_NOT_REACHED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_INVALID_DELEGATION",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_PROPOSAL_ALREADY_CONCLUDED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_PROPOSAL_ALREADY_EXECUTED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_PROPOSAL_ALREADY_EXISTS",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_PROPOSAL_INACTIVE",
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
            "name": "ERR_UNAUTHORIZED_DELEGATE",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_UNAUTHORIZED_VOTER",
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
        },
        {
            "access": "constant",
            "name": "ERR_UNKNOWN_PROPOSAL",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        }
    ]
};

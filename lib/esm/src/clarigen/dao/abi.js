// prettier-ignore
export const DaoInterface = {
    "functions": [
        {
            "access": "private",
            "args": [],
            "name": "is-self-or-extension",
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
                                "name": "extension",
                                "type": "principal"
                            }
                        ]
                    }
                }
            ],
            "name": "set-extensions-iter",
            "outputs": {
                "type": "bool"
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
                    "name": "sender",
                    "type": "principal"
                }
            ],
            "name": "execute",
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
                }
            ],
            "name": "init",
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
                    "name": "extension",
                    "type": "trait_reference"
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
            "name": "request-extension-callback",
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
                    "name": "extension",
                    "type": "principal"
                },
                {
                    "name": "enabled",
                    "type": "bool"
                }
            ],
            "name": "set-extension",
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
                    "name": "extensionList",
                    "type": {
                        "list": {
                            "length": 200,
                            "type": {
                                "tuple": [
                                    {
                                        "name": "enabled",
                                        "type": "bool"
                                    },
                                    {
                                        "name": "extension",
                                        "type": "principal"
                                    }
                                ]
                            }
                        }
                    }
                }
            ],
            "name": "set-extensions",
            "outputs": {
                "type": {
                    "response": {
                        "error": "uint128",
                        "ok": {
                            "list": {
                                "length": 200,
                                "type": "bool"
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
                    "name": "proposal",
                    "type": "trait_reference"
                }
            ],
            "name": "executed-at",
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
                    "name": "extension",
                    "type": "principal"
                }
            ],
            "name": "is-extension",
            "outputs": {
                "type": "bool"
            }
        }
    ],
    "fungible_tokens": [],
    "maps": [
        {
            "key": "principal",
            "name": "ExecutedProposals",
            "value": "uint128"
        },
        {
            "key": "principal",
            "name": "Extensions",
            "value": "bool"
        }
    ],
    "non_fungible_tokens": [],
    "variables": [
        {
            "access": "constant",
            "name": "ERR_ALREADY_EXECUTED",
            "type": {
                "response": {
                    "error": "uint128",
                    "ok": "none"
                }
            }
        },
        {
            "access": "constant",
            "name": "ERR_INVALID_EXTENSION",
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
            "access": "variable",
            "name": "executive",
            "type": "principal"
        }
    ]
};

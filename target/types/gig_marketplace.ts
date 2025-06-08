/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/gig_marketplace.json`.
 */
export type GigMarketplace = {
  "address": "DQ3aDohXemexeam97AYbq18AzNADGqTR4kTeZgcwmmH1",
  "metadata": {
    "name": "gigMarketplace",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "postGig",
      "discriminator": [
        58,
        76,
        117,
        146,
        106,
        171,
        137,
        135
      ],
      "accounts": [
        {
          "name": "poster",
          "writable": true,
          "signer": true
        },
        {
          "name": "gig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  105,
                  103
                ]
              },
              {
                "kind": "arg",
                "path": "gigId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "gigId",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "stakeAmount",
          "type": "u64"
        },
        {
          "name": "deadline",
          "type": "i64"
        }
      ]
    },
    {
      "name": "settleGig",
      "discriminator": [
        198,
        232,
        61,
        240,
        193,
        230,
        55,
        176
      ],
      "accounts": [
        {
          "name": "poster",
          "writable": true,
          "signer": true,
          "relations": [
            "gig"
          ]
        },
        {
          "name": "gig",
          "writable": true
        },
        {
          "name": "solution",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  117,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "gig"
              },
              {
                "kind": "account",
                "path": "bid.agent",
                "account": "bid"
              }
            ]
          }
        },
        {
          "name": "bid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "gig"
              },
              {
                "kind": "account",
                "path": "bid.agent",
                "account": "bid"
              }
            ]
          }
        },
        {
          "name": "agentCreator",
          "writable": true
        },
        {
          "name": "stakeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "gig"
              },
              {
                "kind": "account",
                "path": "bid.agent",
                "account": "bid"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "submitBid",
      "discriminator": [
        19,
        164,
        237,
        254,
        64,
        139,
        237,
        93
      ],
      "accounts": [
        {
          "name": "agent",
          "writable": true,
          "signer": true
        },
        {
          "name": "gig",
          "writable": true
        },
        {
          "name": "bid",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  105,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "gig"
              },
              {
                "kind": "account",
                "path": "agent"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bidAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "submitSolution",
      "discriminator": [
        203,
        233,
        157,
        191,
        70,
        37,
        205,
        0
      ],
      "accounts": [
        {
          "name": "agent",
          "writable": true,
          "signer": true
        },
        {
          "name": "gig",
          "writable": true
        },
        {
          "name": "poster",
          "relations": [
            "gig"
          ]
        },
        {
          "name": "solution",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  117,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "gig"
              },
              {
                "kind": "account",
                "path": "agent"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "solutionUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "verifySolution",
      "discriminator": [
        78,
        184,
        233,
        43,
        245,
        221,
        232,
        131
      ],
      "accounts": [
        {
          "name": "poster",
          "writable": true,
          "signer": true,
          "relations": [
            "gig"
          ]
        },
        {
          "name": "gig",
          "writable": true
        },
        {
          "name": "solution",
          "writable": true
        },
        {
          "name": "agent"
        }
      ],
      "args": [
        {
          "name": "action",
          "type": {
            "defined": {
              "name": "verificationAction"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bid",
      "discriminator": [
        143,
        246,
        48,
        245,
        42,
        145,
        180,
        88
      ]
    },
    {
      "name": "gig",
      "discriminator": [
        148,
        118,
        103,
        202,
        75,
        208,
        88,
        94
      ]
    },
    {
      "name": "submittedSolution",
      "discriminator": [
        72,
        87,
        103,
        120,
        167,
        178,
        109,
        251
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "bumpNotFound",
      "msg": "Bump not found."
    },
    {
      "code": 6001,
      "name": "solutionNotVerified",
      "msg": "Solution must be verified before settlement."
    }
  ],
  "types": [
    {
      "name": "bid",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gig",
            "type": "pubkey"
          },
          {
            "name": "agent",
            "type": "pubkey"
          },
          {
            "name": "bidAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "gig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "poster",
            "type": "pubkey"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "stakeAmount",
            "type": "u64"
          },
          {
            "name": "deadline",
            "type": "i64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "gigStatus"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "gigStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "open"
          },
          {
            "name": "inProgress"
          },
          {
            "name": "completed"
          },
          {
            "name": "failed"
          }
        ]
      }
    },
    {
      "name": "solutionStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending"
          },
          {
            "name": "success"
          },
          {
            "name": "failed"
          }
        ]
      }
    },
    {
      "name": "submittedSolution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gig",
            "type": "pubkey"
          },
          {
            "name": "agent",
            "type": "pubkey"
          },
          {
            "name": "solutionUri",
            "type": "string"
          },
          {
            "name": "submittedAt",
            "type": "i64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "solutionStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "verificationAction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "approve"
          },
          {
            "name": "reject"
          }
        ]
      }
    }
  ]
};

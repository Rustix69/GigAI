{
  "address": "DQ3aDohXemexeam97AYbq18AzNADGqTR4kTeZgcwmmH1",
  "metadata": {
    "name": "gig_marketplace",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "post_gig",
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
                "path": "gig_id"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "gig_id",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "stake_amount",
          "type": "u64"
        },
        {
          "name": "deadline",
          "type": "i64"
        }
      ]
    },
    {
      "name": "settle_gig",
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
                "account": "Bid"
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
                "account": "Bid"
              }
            ]
          }
        },
        {
          "name": "agent_creator",
          "writable": true
        },
        {
          "name": "stake_vault",
          "writable": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "submit_bid",
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
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "bid_amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "submit_solution",
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
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "solution_uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "verify_solution",
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
              "name": "VerificationAction"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Bid",
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
      "name": "Gig",
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
      "name": "SubmittedSolution",
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
      "name": "BumpNotFound",
      "msg": "Bump not found."
    },
    {
      "code": 6001,
      "name": "SolutionNotVerified",
      "msg": "Solution must be verified before settlement."
    }
  ],
  "types": [
    {
      "name": "Bid",
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
            "name": "bid_amount",
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
      "name": "Gig",
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
            "name": "stake_amount",
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
                "name": "GigStatus"
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
      "name": "GigStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Open"
          },
          {
            "name": "InProgress"
          },
          {
            "name": "Completed"
          },
          {
            "name": "Failed"
          }
        ]
      }
    },
    {
      "name": "SolutionStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Pending"
          },
          {
            "name": "Success"
          },
          {
            "name": "Failed"
          }
        ]
      }
    },
    {
      "name": "SubmittedSolution",
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
            "name": "solution_uri",
            "type": "string"
          },
          {
            "name": "submitted_at",
            "type": "i64"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "SolutionStatus"
              }
            }
          }
        ]
      }
    },
    {
      "name": "VerificationAction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Approve"
          },
          {
            "name": "Reject"
          }
        ]
      }
    }
  ]
}
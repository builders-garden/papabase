export const PAPABASE_ABI = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "admin",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_usdcTokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_acrossSpokePool",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "needed",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ERC1155InsufficientBalance",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "approver",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidApprover",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "idsLength",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "valuesLength",
                    "type": "uint256"
                }
            ],
            "name": "ERC1155InvalidArrayLength",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidOperator",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidReceiver",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "name": "ERC1155InvalidSender",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "ERC1155MissingApprovalForAll",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "UnauthorizedSender",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "UnauthorizedToken",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                }
            ],
            "name": "CampaignCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                }
            ],
            "name": "CampaignHasEnded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "depositAmount",
                    "type": "uint256"
                }
            ],
            "name": "DepositFunds",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "depositAmount",
                    "type": "uint256"
                }
            ],
            "name": "PendingDeposit",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "totalDepositAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "recurringDepositAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "depositFrequency",
                    "type": "uint256"
                }
            ],
            "name": "RecurringDespositCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "TransferBatch",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "TransferSingle",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "value",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "URI",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "withdrawAmount",
                    "type": "uint256"
                }
            ],
            "name": "WithdrawFunds",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "acrossSpokePool",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "accounts",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                }
            ],
            "name": "balanceOfBatch",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "campaignCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "withdrawAmount",
                    "type": "uint256"
                }
            ],
            "name": "campaignWithdrawFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "campaigns",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "endDate",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "hasEnded",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "checkUpkeep",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "upkeepNeeded",
                    "type": "bool"
                },
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "endDate",
                    "type": "uint256"
                }
            ],
            "name": "createCampaign",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositAmount",
                    "type": "uint256"
                }
            ],
            "name": "depositFunds",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "donor",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "recurringAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "donationTimes",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "donationInterval",
                    "type": "uint256"
                }
            ],
            "name": "depositFundsRecurring",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "endCampaign",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "exists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "getCampaign",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "tokenAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "hasEnded",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct IPapaBase.PapaCampaign",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getUserCampaigns",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "tokenAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokenAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endDate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "hasEnded",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct IPapaBase.PapaCampaign[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenSent",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "relayer",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "message",
                    "type": "bytes"
                }
            ],
            "name": "handleV3AcrossMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "papaBaseAdmin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "performData",
                    "type": "bytes"
                }
            ],
            "name": "performUpkeep",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "recurringDepositCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeBatchTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_newAdmin",
                    "type": "address"
                }
            ],
            "name": "setPapaBaseAdmin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "recurringDepositId",
                    "type": "uint256"
                }
            ],
            "name": "triggerRecurringDeposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "uri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "usdcTokenAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userHasDonated",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "usersDonations",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "usersRecurringDeposits",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "campaignId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalDepositAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "donationAmountLeft",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "recurringDepositAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "depositFrequency",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "lastDepositTime",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "nextDepositTime",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "hasEnded",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "recurringDepositId",
                    "type": "uint256"
                }
            ],
            "name": "withdrawRecurringDeposit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
]

export const ACROSS_V3_ABI = [
    {"inputs":[{"internalType":"address","name":"_wrappedNativeTokenAddress","type":"address"},{"internalType":"uint32","name":"_depositQuoteTimeBuffer","type":"uint32"},{"internalType":"uint32","name":"_fillDeadlineBuffer","type":"uint32"},{"internalType":"contract IERC20","name":"_l2Usdc","type":"address"},{"internalType":"contract ITokenMessenger","name":"_cctpTokenMessenger","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ClaimedMerkleLeaf","type":"error"},{"inputs":[],"name":"DisabledRoute","type":"error"},{"inputs":[],"name":"ExpiredFillDeadline","type":"error"},{"inputs":[],"name":"InvalidChainId","type":"error"},{"inputs":[],"name":"InvalidExclusiveRelayer","type":"error"},{"inputs":[],"name":"InvalidExclusivityDeadline","type":"error"},{"inputs":[],"name":"InvalidFillDeadline","type":"error"},{"inputs":[],"name":"InvalidMerkleLeaf","type":"error"},{"inputs":[],"name":"InvalidMerkleProof","type":"error"},{"inputs":[],"name":"InvalidPayoutAdjustmentPct","type":"error"},{"inputs":[],"name":"InvalidQuoteTimestamp","type":"error"},{"inputs":[],"name":"InvalidSlowFillRequest","type":"error"},{"inputs":[],"name":"MsgValueDoesNotMatchInputAmount","type":"error"},{"inputs":[],"name":"MulticallExecuteLeaf","type":"error"},{"inputs":[],"name":"NoSlowFillsInExclusivityWindow","type":"error"},{"inputs":[],"name":"NotEOA","type":"error"},{"inputs":[],"name":"NotExclusiveRelayer","type":"error"},{"inputs":[],"name":"RelayFilled","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"rootBundleId","type":"uint256"}],"name":"EmergencyDeleteRootBundle","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"originToken","type":"address"},{"indexed":true,"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"EnabledDepositRoute","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountToReturn","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"chainId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"refundAmounts","type":"uint256[]"},{"indexed":true,"internalType":"uint32","name":"rootBundleId","type":"uint32"},{"indexed":true,"internalType":"uint32","name":"leafId","type":"uint32"},{"indexed":false,"internalType":"address","name":"l2TokenAddress","type":"address"},{"indexed":false,"internalType":"address[]","name":"refundAddresses","type":"address[]"},{"indexed":false,"internalType":"address","name":"caller","type":"address"}],"name":"ExecutedRelayerRefundRoot","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalFilledAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fillAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repaymentChainId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"originChainId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"indexed":false,"internalType":"int64","name":"relayerFeePct","type":"int64"},{"indexed":false,"internalType":"int64","name":"realizedLpFeePct","type":"int64"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":false,"internalType":"address","name":"destinationToken","type":"address"},{"indexed":false,"internalType":"address","name":"relayer","type":"address"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"},{"components":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"bool","name":"isSlowRelay","type":"bool"},{"internalType":"int256","name":"payoutAdjustmentPct","type":"int256"}],"indexed":false,"internalType":"struct SpokePool.RelayExecutionInfo","name":"updatableRelayData","type":"tuple"}],"name":"FilledRelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"inputToken","type":"address"},{"indexed":false,"internalType":"address","name":"outputToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"inputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"outputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"repaymentChainId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"originChainId","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"indexed":false,"internalType":"address","name":"exclusiveRelayer","type":"address"},{"indexed":true,"internalType":"address","name":"relayer","type":"address"},{"indexed":false,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"},{"components":[{"internalType":"address","name":"updatedRecipient","type":"address"},{"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"internalType":"uint256","name":"updatedOutputAmount","type":"uint256"},{"internalType":"enum V3SpokePoolInterface.FillType","name":"fillType","type":"uint8"}],"indexed":false,"internalType":"struct V3SpokePoolInterface.V3RelayExecutionEventInfo","name":"relayExecutionInfo","type":"tuple"}],"name":"FilledV3Relay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"originChainId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"indexed":false,"internalType":"int64","name":"relayerFeePct","type":"int64"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"quoteTimestamp","type":"uint32"},{"indexed":false,"internalType":"address","name":"originToken","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"}],"name":"FundsDeposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PausedDeposits","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PausedFills","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"address","name":"rootMessageSender","type":"address"}],"name":"ReceivedMessageFromL1","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint32","name":"rootBundleId","type":"uint32"},{"indexed":true,"internalType":"bytes32","name":"relayerRefundRoot","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"slowRelayRoot","type":"bytes32"}],"name":"RelayedRootBundle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int64","name":"newRelayerFeePct","type":"int64"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"updatedRecipient","type":"address"},{"indexed":false,"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"depositorSignature","type":"bytes"}],"name":"RequestedSpeedUpDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"updatedOutputAmount","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"updatedRecipient","type":"address"},{"indexed":false,"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"depositorSignature","type":"bytes"}],"name":"RequestedSpeedUpV3Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"inputToken","type":"address"},{"indexed":false,"internalType":"address","name":"outputToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"inputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"outputAmount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"originChainId","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"indexed":false,"internalType":"address","name":"exclusiveRelayer","type":"address"},{"indexed":false,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"}],"name":"RequestedV3SlowFill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newFxChild","type":"address"}],"name":"SetFxChild","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newHubPool","type":"address"}],"name":"SetHubPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"polygonTokenBridger","type":"address"}],"name":"SetPolygonTokenBridger","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAdmin","type":"address"}],"name":"SetXDomainAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountToReturn","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"chainId","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"leafId","type":"uint32"},{"indexed":true,"internalType":"address","name":"l2TokenAddress","type":"address"},{"indexed":false,"internalType":"address","name":"caller","type":"address"}],"name":"TokensBridged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"inputToken","type":"address"},{"indexed":false,"internalType":"address","name":"outputToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"inputAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"outputAmount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"depositId","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"quoteTimestamp","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"indexed":false,"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"address","name":"exclusiveRelayer","type":"address"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"}],"name":"V3FundsDeposited","type":"event"},{"inputs":[],"name":"EMPTY_RELAYER","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EMPTY_REPAYMENT_CHAIN_ID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INFINITE_FILL_DEADLINE","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_TRANSFER_SIZE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SLOW_FILL_MAX_TOKENS_TO_SEND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPDATE_DEPOSIT_DETAILS_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"UPDATE_V3_DEPOSIT_DETAILS_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_initialDepositId","type":"uint32"},{"internalType":"address","name":"_crossDomainAdmin","type":"address"},{"internalType":"address","name":"_hubPool","type":"address"}],"name":"__SpokePool_init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cctpTokenMessenger","outputs":[{"internalType":"contract ITokenMessenger","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"crossDomainAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"originToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"uint32","name":"quoteTimestamp","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"originToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"uint32","name":"quoteTimestamp","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"originToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"uint256","name":"maxCount","type":"uint256"}],"name":"depositForNow","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"originToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"uint256","name":"maxCount","type":"uint256"}],"name":"depositNow","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"depositQuoteTimeBuffer","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"inputToken","type":"address"},{"internalType":"address","name":"outputToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"internalType":"address","name":"exclusiveRelayer","type":"address"},{"internalType":"uint32","name":"quoteTimestamp","type":"uint32"},{"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"}],"name":"depositV3","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"rootBundleId","type":"uint256"}],"name":"emergencyDeleteRootBundle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"enabledDepositRoutes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"rootBundleId","type":"uint32"},{"components":[{"internalType":"uint256","name":"amountToReturn","type":"uint256"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"uint256[]","name":"refundAmounts","type":"uint256[]"},{"internalType":"uint32","name":"leafId","type":"uint32"},{"internalType":"address","name":"l2TokenAddress","type":"address"},{"internalType":"address[]","name":"refundAddresses","type":"address[]"}],"internalType":"struct SpokePoolInterface.RelayerRefundLeaf","name":"relayerRefundLeaf","type":"tuple"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"executeRelayerRefundLeaf","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"destinationToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"int64","name":"realizedLpFeePct","type":"int64"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"uint32","name":"rootBundleId","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"int256","name":"payoutAdjustment","type":"int256"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"executeSlowRelayLeaf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"components":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"exclusiveRelayer","type":"address"},{"internalType":"address","name":"inputToken","type":"address"},{"internalType":"address","name":"outputToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"}],"internalType":"struct V3SpokePoolInterface.V3RelayData","name":"relayData","type":"tuple"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"uint256","name":"updatedOutputAmount","type":"uint256"}],"internalType":"struct V3SpokePoolInterface.V3SlowFill","name":"slowFillLeaf","type":"tuple"},{"internalType":"uint32","name":"rootBundleId","type":"uint32"},{"internalType":"bytes32[]","name":"proof","type":"bytes32[]"}],"name":"executeV3SlowRelayLeaf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fillDeadlineBuffer","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"destinationToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"maxTokensToSend","type":"uint256"},{"internalType":"uint256","name":"repaymentChainId","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"int64","name":"realizedLpFeePct","type":"int64"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"uint256","name":"maxCount","type":"uint256"}],"name":"fillRelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"updatedRecipient","type":"address"},{"internalType":"address","name":"destinationToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"maxTokensToSend","type":"uint256"},{"internalType":"uint256","name":"repaymentChainId","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"int64","name":"realizedLpFeePct","type":"int64"},{"internalType":"int64","name":"relayerFeePct","type":"int64"},{"internalType":"int64","name":"updatedRelayerFeePct","type":"int64"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"internalType":"bytes","name":"depositorSignature","type":"bytes"},{"internalType":"uint256","name":"maxCount","type":"uint256"}],"name":"fillRelayWithUpdatedDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"fillStatuses","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"exclusiveRelayer","type":"address"},{"internalType":"address","name":"inputToken","type":"address"},{"internalType":"address","name":"outputToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"}],"internalType":"struct V3SpokePoolInterface.V3RelayData","name":"relayData","type":"tuple"},{"internalType":"uint256","name":"repaymentChainId","type":"uint256"}],"name":"fillV3Relay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"exclusiveRelayer","type":"address"},{"internalType":"address","name":"inputToken","type":"address"},{"internalType":"address","name":"outputToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"}],"internalType":"struct V3SpokePoolInterface.V3RelayData","name":"relayData","type":"tuple"},{"internalType":"uint256","name":"repaymentChainId","type":"uint256"},{"internalType":"uint256","name":"updatedOutputAmount","type":"uint256"},{"internalType":"address","name":"updatedRecipient","type":"address"},{"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"internalType":"bytes","name":"depositorSignature","type":"bytes"}],"name":"fillV3RelayWithUpdatedDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fxChild","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hubPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_initialDepositId","type":"uint32"},{"internalType":"contract PolygonTokenBridger","name":"_polygonTokenBridger","type":"address"},{"internalType":"address","name":"_crossDomainAdmin","type":"address"},{"internalType":"address","name":"_hubPool","type":"address"},{"internalType":"address","name":"_fxChild","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"numberOfDeposits","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"pause","type":"bool"}],"name":"pauseDeposits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"pause","type":"bool"}],"name":"pauseFills","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pausedDeposits","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pausedFills","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"polygonTokenBridger","outputs":[{"internalType":"contract PolygonTokenBridger","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"rootMessageSender","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"processMessageFromRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recipientCircleDomainId","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"relayerRefundRoot","type":"bytes32"},{"internalType":"bytes32","name":"slowRelayRoot","type":"bytes32"}],"name":"relayRootBundle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"exclusiveRelayer","type":"address"},{"internalType":"address","name":"inputToken","type":"address"},{"internalType":"address","name":"outputToken","type":"address"},{"internalType":"uint256","name":"inputAmount","type":"uint256"},{"internalType":"uint256","name":"outputAmount","type":"uint256"},{"internalType":"uint256","name":"originChainId","type":"uint256"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"uint32","name":"fillDeadline","type":"uint32"},{"internalType":"uint32","name":"exclusivityDeadline","type":"uint32"},{"internalType":"bytes","name":"message","type":"bytes"}],"internalType":"struct V3SpokePoolInterface.V3RelayData","name":"relayData","type":"tuple"}],"name":"requestV3SlowFill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rootBundles","outputs":[{"internalType":"bytes32","name":"slowRelayRoot","type":"bytes32"},{"internalType":"bytes32","name":"relayerRefundRoot","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newCrossDomainAdmin","type":"address"}],"name":"setCrossDomainAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"originToken","type":"address"},{"internalType":"uint256","name":"destinationChainId","type":"uint256"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setEnableRoute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newFxChild","type":"address"}],"name":"setFxChild","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newHubPool","type":"address"}],"name":"setHubPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"newPolygonTokenBridger","type":"address"}],"name":"setPolygonTokenBridger","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"int64","name":"updatedRelayerFeePct","type":"int64"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"address","name":"updatedRecipient","type":"address"},{"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"internalType":"bytes","name":"depositorSignature","type":"bytes"}],"name":"speedUpDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"depositor","type":"address"},{"internalType":"uint32","name":"depositId","type":"uint32"},{"internalType":"uint256","name":"updatedOutputAmount","type":"uint256"},{"internalType":"address","name":"updatedRecipient","type":"address"},{"internalType":"bytes","name":"updatedMessage","type":"bytes"},{"internalType":"bytes","name":"depositorSignature","type":"bytes"}],"name":"speedUpV3Deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"usdcToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"wrappedNativeToken","outputs":[{"internalType":"contract WETH9Interface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}
]
export const ticketContractAdress='0x436E1eF339151479fE0aBB2A2d6F6Cd227D9C36C'
export const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_nbrTicket",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_prix",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_nomEvenement",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_dateEvenement",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "acheteurs",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dateAchat",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "acheteur",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "prix",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "enVente",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "dateEvenement",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "nbrTicket",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "nomEvenement",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dateAchat",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "acheteur",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "prix",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "enVente",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_enVente",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "vendre",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idTicket",
          "type": "uint256"
        }
      ],
      "name": "acheter",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "recolter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
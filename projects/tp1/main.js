import { BlockChain } from "./models/BlockChain.js";
import SHA256 from 'crypto-js/sha256.js';



let blockchain = new BlockChain(4,blockData=>SHA256(blockData).toString());
let block2 = blockchain.generateBlock("this is the second block")
block2.mine(blockchain.difficulty,blockchain.hashAlogrithm)
blockchain.addBlock(block2)
let block3 = blockchain.generateBlock("this is the third block")
block3.mine(blockchain.difficulty,blockchain.hashAlogrithm)
blockchain.addBlock(block3)
console.log(blockchain.blocks);
console.log("is the blockchain valid : " , blockchain.isValid())
console.log("changing values")
block2.data="this the fake data"
console.log("is the blockchain still valid : " , blockchain.isValid())
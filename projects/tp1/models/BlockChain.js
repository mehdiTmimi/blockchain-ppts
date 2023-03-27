import { Block } from "./Block.js";

export class BlockChain{
    constructor(difficulty=0,hashAlogrithm){
        this.difficulty=difficulty
        this.hashAlogrithm=hashAlogrithm // function
        this.blocks=[];
        this.blocks.push(this.generateGenesisBlock())
    }
    generateGenesisBlock() {
        let block = new Block(0,0,"this is the genesis block",Date.now(),null);
        this.mine(block)
        // calculate Hash
        block.hash=block.calculateHash(this.hashAlogrithm);
        return block;
    }
    check(hash,difficulty){
        for(let i=0;i<difficulty;i++)
            if(hash.at(i)!="0")
                return false
    
        return true;
    }
    mine(block){
        let timeStart=Date.now();
       while(true){
            block.hash= block.calculateHash(this.hashAlogrithm)
            //console.log(block.hash,block.nonce)
            if(this.check(block.hash,this.difficulty))
            {
                let timeEnd=Date.now();
                let timeDiff=(timeEnd-timeStart)/1000
                console.log("hash power = ", block.nonce/timeDiff )
                return;
            }

            block.nonce++;
       }
       
    }
    addBlock(block){
        // TODO verification
        // add
        this.blocks.push(block);
    }
    generateBlock(data){
        let previousHash=this.blocks[this.blocks.length-1].hash
        let block = new Block(this.blocks.length,0,data,Date.now(),previousHash)
        block.hash=block.calculateHash(this.hashAlogrithm);
        return block;
    }
    isValid(){
        let genesisBlock= this.blocks[0];
        if(genesisBlock.hash!=genesisBlock.calculateHash(this.hashAlogrithm))
            return false

        for(let i=1;i<this.blocks.length;i++)
        {
            let previousBlock=this.blocks[i-1]
            let currentBlock=this.blocks[i]
            if(previousBlock.hash!=currentBlock.prevHash)
                return false;
            if(currentBlock.hash!=currentBlock.calculateHash(this.hashAlogrithm))
                return false
        }
        return true
    }
    
 
}
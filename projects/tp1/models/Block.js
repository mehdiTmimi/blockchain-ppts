export class Block{
    constructor(height,nonce,data,timestamp,prevHash,hash)
    {
        this.height=height
        this.nonce=nonce
        this.data=data
        this.timestamp=timestamp
        this.prevHash=prevHash
        this.hash=hash
    }
    calculateHash(hashAlogrithm){
        return hashAlogrithm(this.timestamp+this.data+this.height+this.prevHash+this.nonce)
    }
    mine(difficulty,hashAlogrithm){
        //todo
      }
}
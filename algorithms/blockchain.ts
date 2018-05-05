import { Block } from "../models/Block";

var sha256 = require('sha256')

export class Blockchain{
    
    maximumNonce = 500000
    pattern = '00'
    difficulty = 2;

    public mine(block:Block){
        for (var x = 0; x <= this.maximumNonce; x++) {
            block.nonce = x;
            const hash = sha256([block.block,block.user,block.previous,block.nonce]);
            if( hash.substr(0,this.difficulty) === this.pattern ){
              block.hash = hash;
              return block
            }
          }
    }

    public addBlock(blockchain:Block[],block:Block):boolean{

        if(!this.verifySignature(block)){
            return false
        }

        if( blockchain.length === 0){
           block.previous = '0000000000000000000000000000000000000000000000000000000000000000'
           block = this.mine(block)
           blockchain.push(block)
        }
        else{
            block.previous = blockchain[blockchain.length -1 ].hash;
            block = this.mine(block)
            blockchain.push(block)
        }
        return true;
    }

    public verifySignature(block:Block){
        
    }

}
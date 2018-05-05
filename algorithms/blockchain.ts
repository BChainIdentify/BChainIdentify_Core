import { Block } from "../models/Block";
import * as NodeRSA from 'node-rsa'


export class Blockchain{
    
    maximumNonce = 500000
    pattern = '0'
    difficulty = 1;

    public mine(block:Block){
        for (var x = 0; x <= this.maximumNonce; x++) {
            block.nonce = x;
            const hash = require('sha256')([block.block,block.user,block.previous,block.nonce]);
            //console.log(hash)
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
        
        const isVerified = this.verififyMessage(block.user.userhash,block.user.signedHashedUserName,block.user.publicKey)

        return isVerified

    }

    public searchUser(blockChain:Block[],userHash:string):Block{
        blockChain.forEach(
            (block) => {
                if(block.user.userhash === userHash){
                    return block
                }
            }
        )
        return null
    }

    public verififyMessage(message:string,signedMessage:string,publicKey:string){
        const key = new NodeRSA();
        console.log(publicKey)
        key.importKey(publicKey,'pkcs8-public-pem')
        const signedMessagedDec = Buffer.from(signedMessage, 'base64'); 
        const isVerified = key.verify((message as any),(signedMessagedDec as any));
        
        return isVerified
    }

}
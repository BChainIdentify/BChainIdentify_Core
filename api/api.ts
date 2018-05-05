import { Router, Request, Response } from 'express';
import { Block } from '../models/Block';
import { Blockchain } from '../algorithms/blockchain';

export class Api {

    router: Router = Router()

    blockChain : Block[]

    chainName = 'A'

    blockChainAlgs:Blockchain

    constructor(){
        this.blockChainAlgs = new Blockchain();
    }

    public apiRoutes(): Router {

        this.router.post('/addUser', (req, res) => {
            /*
            hash(BN)
            public key
            signHash
            */

            const usernameHash = req.body['usernameHash']
            const publicKey = req.body['publicKey']
            const signHash = req.body['signHash']
            let newUserBlock:Block
            if(this.blockChain.length === 0) {
                this.blockChain = []
                newUserBlock = {
                    chain : this.chainName,
                    block:1,
                    user:{
                        userhash :usernameHash,
                        publicKey:publicKey,
                        signedHashedUserName:signHash
                    }
                }
            }else{
                newUserBlock = {
                    chain:this.blockChain[this.blockChain.length - 1].chain,
                    block:this.blockChain[this.blockChain.length - 1].block,
                    user:{
                        userhash :usernameHash,
                        publicKey:publicKey,
                        signedHashedUserName:signHash
                    }
                }
            }

            const success = this.blockChainAlgs.addBlock(this.blockChain,newUserBlock);

            if(success){
                res.sendStatus(200)
            }
            else{
                res.sendStatus(403)
            }

        })

        this.router.get('/userExists', (req,res) => {
            /*
            hash(BN)
            message
            signedMessage
            */

            

        })

        return this.router

    }

}
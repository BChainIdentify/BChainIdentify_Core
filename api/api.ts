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
            const signHash = req.body['signedHash']
            let newUserBlock:Block
            if(typeof this.blockChain  === "undefined") {
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

            const hash = req.query['userhash']
            const message = req.query['message']
            const signedMessage = req.query['signedMessage']

            const block = this.blockChainAlgs.searchUser(this.blockChain,hash)

            const isVerified = this.blockChainAlgs.verififyMessage(message,signedMessage,block.user.publicKey)            

            if(isVerified)[
                res.sendStatus(200)
            ]
            else{
                res.sendStatus(401)
            }

        })

        return this.router

    }

}
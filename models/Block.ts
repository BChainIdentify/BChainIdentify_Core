import { User } from "./User";

export interface Block {

    block: Number,
    chain: string,
    nonce?: Number,
    user: User 
    previous?: string,
    hash?: ''

}


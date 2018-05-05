import { User } from "./User";

export interface Block {

    block: Number,
    chain: String,
    nonce?: Number,
    user: User 
    previous?: String,
    hash?: ''

}


import { User } from "./User";

export interface Block {

    block: number,
    chain: string,
    nonce?: number,
    user: User 
    previous?: string,
    hash?: ''

}


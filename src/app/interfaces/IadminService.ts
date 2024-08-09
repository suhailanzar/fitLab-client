import { Reports } from "../core/models/admin";
import { User } from "../core/models/user";

export interface reports{
    message:string,
    reports:Reports[]
}
export interface response{
    message:string,
}

export interface userResponse{
    message:string,
    users:User[]
}
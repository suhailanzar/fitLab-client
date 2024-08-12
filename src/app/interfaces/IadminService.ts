import { Reports } from "../core/models/admin";
import { Trainer } from "../core/models/trainer";
import { User } from "../core/models/user";

export interface reports {
    message: string,
    reports: Reports[]
}
export interface response {
    message: string,
}

export interface userResponse {
    message: string,
    users: User[]
}

export interface GetTrainers {
    message: string,
    trainers: Trainer[]
}
export interface viewTrainer {
    message: string,
    trainer: Trainer
}
export interface adminLogin {
    message: string,
    token: string
}
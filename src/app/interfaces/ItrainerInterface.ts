import { Reports } from "../core/models/admin";
import { ICourse, Slot, Trainer, Transaction } from "../core/models/trainer";
import { User } from "../core/models/user";

export interface reports {
    message: string,
    reports: Reports[]
}
export interface trainerResponse {
    message: string,
}

export interface getClientsResponse {
    message: string,
    clients: User[]
}


export interface viewTrainer {
    message: string,
    trainer: Trainer
}
export interface trainerLogin {
    message: string,
    token: string,
    Trainerdata:Trainer
}
export interface trainerEditProfile{
    message: string,
    updatedProfile:Trainer
}
export interface trainerProfile{
    message: string,
    Details:Trainer
}
export interface trainerProfile{
    message: string,
    Details:Trainer
}
export interface addSlot{
    message: string,
    addedslot:Slot
}
export interface getSlot {
    message: string;
    Details: {
      availableslots: Slot[];
    };
  }
  
export interface getBookingsResponse {
    message: string;
  }

export interface trainerCourseResponse {
    message: string;
    availableCourses:ICourse[]
  }
  
export interface trainerTransactionResponse {
    message: string;
    revenueData:Transaction
  }
  
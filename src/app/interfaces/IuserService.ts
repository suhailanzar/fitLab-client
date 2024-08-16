import { Meal, Reports } from "../core/models/admin";

export interface reportResponse{
     message:string;
     success:boolean;
}
export interface saveMealResponse{
     name:string;
     meal:Meal
}

export interface reports {
     message: string,
     reports: Reports[]
 }
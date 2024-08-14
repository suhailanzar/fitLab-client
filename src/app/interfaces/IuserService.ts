import { Meal } from "../core/models/admin";

export interface reportResponse{
     message:string;
     success:boolean;
}
export interface saveMealResponse{
     name:string;
     meal:Meal
}
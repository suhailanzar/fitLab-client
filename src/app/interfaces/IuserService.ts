import { Meal, Reports } from "../core/models/admin";
import { ICourse, Trainer } from "../core/models/trainer";
import { IEnrolledCourse, User } from "../core/models/user";

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

 export interface userResponse {
     message: string,
 }

 export interface userLogin {
     message: string,
     token: string,
     userdata:UserD
 }

 export interface UserD {
     _id: string;       // This should match how the ID is returned from the backend
     username: string;
     email: string;
   }

   export interface GetTrainersUser {
     message: string,
     trainers: Trainer[]
 }
   export interface editProfileRes {
     message: string,
     profile: User
 }

 export interface userCourseResponse {
     courses: ICourse[];         
     currentPage: number;
     totalPages: number;
     totalCourses: number;
   }

 export interface courseDetailsRes {
    message:string,
    course: ICourse
   }

 export interface getPurchasedCoursesRes {
    message:string,
    Courses: ICourse,
    Enrolled:IEnrolledCourse
   }
 export interface completeModule {
    message:string,
    Courses: ICourse,
    Enrolled:IEnrolledCourse
   }

   


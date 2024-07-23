export interface User {
  name: string; 
  email: string;
  password: string;
  isblocked: boolean;
  place?:string;
  age?:number;
  gender?: string; 
  weight?: number;
  height?: number;
  image?:string;
  createdAt?: Date;
  id?:string
  subscription?:Subscription
  courses?:[string];
}

export interface Subscription {
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}




  export interface Payment {
    razorpayPaymentId: string;
    amount: number;
    currency: string;
    userid: string;
    slotid: string;
    trainerid: string;
  }

  export interface coursePayment {
    razorpayPaymentId: string;
    amount: number;
    currency: string;
    courseId: string;
    trainerId:string;
    courseName: string;
  }
  

  export interface IEnrolledModule {
    moduleId:string;
    completed: boolean;
}

export interface IEnrolledCourse  {
    userId: string;
    courseId: string;
    enrolledAt: Date;
    completed: boolean;
    modules: IEnrolledModule[];
    createdAt: Date;
    updatedAt: Date;
}
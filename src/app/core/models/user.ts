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

export interface User {
    name: string;
    email: string;
    password: string;
    isblocked:boolean;
    gender: string
    weight: number
    height: number
    createdAt:  Date
  }



  export interface Payment {
    razorpayPaymentId: string;
    amount: number;
    currency: string;
    email: string;
    slotid: string;
    trainerid: string;
  }

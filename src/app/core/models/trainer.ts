export interface Trainer {
  trainername:string
  email:string
  password:string
  isblocked:boolean
  isapproved:boolean
  specification:string
  phone:number
  image:string
  availibilty:boolean
  availableslots:Slot[]
  _id:string

  }



  export interface Slot {
    username?:string;
    date: Date;
    startTime: string;
    endTime:string;
    price:number;
    status:boolean;
    _id?:string,
  
  }



 export interface IModule {
    name: string;
    description: string;
    videoUrl: string;
    isSaved?: boolean;
    id?:string;
    completed:boolean;
}

export  interface ICourse  {
    author: string;
    courseName: string;
    description: string;
    thumbnail: string;
    modules: IModule[];
    Price: number;
    trainerId: string;
    createdAt: Date;
    updatedAt: Date;
    id?:string;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentType: string;
  paymentDate: Date;
  createdAt: Date;
  trainerId: string;
  slotId: string;
  courseId: string;
  id: string;
}

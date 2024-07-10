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
    username:string;
    date: string;
    startTime: string;
    price:number;
    status:boolean;
    _id:string,

  
  }



 export interface IModule {
    name: string;
    description: string;
    videoUrl: string;
    isSaved?: boolean;
}

export  interface ICourse  {
    author: string;
    courseName: string;
    description: string;
    modules: IModule[];
    price: number;
    trainerId: string;
    createdAt: Date;
    updatedAt: Date;
}
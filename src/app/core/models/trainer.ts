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
    _id:string,
    date: string;
    startTime: string;
    price:number;
    status:boolean;
  
  }
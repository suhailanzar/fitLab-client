export interface Meal {
       type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
       category: 'Veg' | 'Non-veg' ,
       name: string,
       image: string,
       description: string,
       calories: number,
       protein: number,
       fats: number,
       date: Date,
       _id?: string,
  }


export interface Reports {
    userId:string,
    userName:string,
    trainerName:string,
    date:Date,
    reportType:string,
    description:string,
    evidence:string,
    isReported:boolean,
    _id:string
}

  
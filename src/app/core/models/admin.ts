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
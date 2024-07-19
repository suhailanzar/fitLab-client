import { Component, OnInit } from '@angular/core';
import { adminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-diet-plans',
  templateUrl: './diet-plans.component.html',
  styleUrl: './diet-plans.component.css'
})
export class DietPlansComponent implements OnInit {

  selectedDiet!: string 
  filteredMeals: any[] = [];
  calorieLimit: number = 1000
  mealtype: string = 'Breakfast'
  meals: any[] = [];


  constructor(private adminservice: adminService){}

  dietOptions = [
    { name: 'Non-veg', image: 'https://img.icons8.com/cotton/64/steak-rare--v1.png' },
    { name: 'Veg', image: 'https://img.icons8.com/color/48/group-of-vegetables.png' }
  ];

  ngOnInit(): void {
    this.selectedDiet = this.dietOptions[0].name
    this.adminservice.getMeals().subscribe(data => {
      this.meals = data.meal;   
      
    });
  }


  selectDiet(dietName: string): void {
    this.selectedDiet = dietName;
  }


  generateMeals() {
  
    this.filteredMeals = this.filterMeals(this.meals, this.selectedDiet, this.calorieLimit, this.mealtype);
    }

  filterMeals(meals: any[], category: string, calorieLimit: number, mealType: string): any[] {
    const lowerCategory = category.toLowerCase();
    const lowerMealType = mealType.toLowerCase();
    
    const filteredMeals = meals.filter(meal => 
      meal.category.toLowerCase() === lowerCategory && 
      meal.type.toLowerCase() === lowerMealType
    );    
    
    let selectedMeals: any[] = [];
    let totalCalories = 0;
    
    // Shuffle the filtered meals array
    const shuffledMeals = this.shuffleArray([...filteredMeals]);
    
    for (let meal of shuffledMeals) {
      if (totalCalories + meal.calories <= calorieLimit) {
        selectedMeals.push(meal);
        totalCalories += meal.calories;
      }
      
      // Break if we're very close to the calorie limit
      if (calorieLimit - totalCalories < 50) break;
    }
    
    return selectedMeals;
  }
  
  // Helper function to shuffle an array
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}

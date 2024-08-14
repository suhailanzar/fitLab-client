import { Component, OnInit } from '@angular/core';
import { adminService } from '../../../core/services/module-services/admin.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { Meal } from '../../../core/models/admin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diet-plans',
  templateUrl: './diet-plans.component.html',
  styleUrl: './diet-plans.component.css'
})
export class DietPlansComponent implements OnInit {

  selectedDiet!: string 
  filteredMeals: Meal[] = [];
  calorieLimit: number = 1000
  mealtype: string = 'Breakfast'
  meals: any[] = [];
  gender!: string;
  age!: number;
  weight!: number;
  height!: number;
  goal!: string;
  bmi!: number;
  calories!: number;
  saveMeal:boolean = false;
  visibleSaveMeal:boolean = false;

  saveMealsubscrition!:Subscription
  mealForm!: FormGroup;



  constructor(private adminservice: adminService, private userService:UserService,private formbuilder: FormBuilder){
  }

  dietOptions = [
    { name: 'Non-veg', image: 'https://img.icons8.com/cotton/64/steak-rare--v1.png' },
    { name: 'Veg', image: 'https://img.icons8.com/color/48/group-of-vegetables.png' }
  ];

  ngOnInit(): void {
    this.selectedDiet = this.dietOptions[0].name
    this.adminservice.getMeals().subscribe(data => {
      this.meals = data.meal;   
      
    });

    this.mealForm = this.formbuilder.group({
      mealName:['',[Validators.required]]
    })
  }


  selectDiet(dietName: string): void {
    this.selectedDiet = dietName;
  }


  generateMeals() {
    console.log('entered the generate meal');
    
  
    this.filteredMeals = this.filterMeals(this.meals, this.selectedDiet, this.calorieLimit, this.mealtype);
    console.log('filtered meals are',this.filteredMeals);
    
    this.saveMeal = true
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

  saveMealModal(){
    this.visibleSaveMeal = true;
  }
  SaveMealtoDb() {
    console.log('entered the mealform validation');
    console.log('meal form value is',this.mealForm.value);
    
    
    this.mealForm.markAllAsTouched(); 
    
    if (this.mealForm.valid) {
      console.log('entered the meal form valid');
      
      this.visibleSaveMeal = false;    
      this.saveMealsubscrition = this.userService.saveMeal(this.mealForm.value, this.filteredMeals).subscribe(data => {
        this.filteredMeals = [];
        this.saveMeal = false;
      });
    }
  }


  onSubmit() {
    this.calculateBMI();
    this.calculateCalories();
  }

  calculateBMI() {
    const heightInMeters = this.height / 100;
    this.bmi = this.weight / (heightInMeters * heightInMeters);
  }

  calculateCalories() {
    const baseCalories = this.gender === 'male' ? 10 * this.weight + 6.25 * this.height - 5 * this.age + 5 : 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;

    switch (this.goal) {
      case 'loss':
        this.calories = baseCalories - 500;
        break;
      case 'maintain':
        this.calories = baseCalories;
        break;
      case 'build':
        this.calories = baseCalories + 500;
        break;
    }
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

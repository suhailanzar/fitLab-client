import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/module-services/user.service';
import { MessageService } from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { Meal } from '../../../core/models/admin';

@Component({
  selector: 'app-show-saved-plans',
  templateUrl: './show-saved-plans.component.html',
  styleUrls: ['./show-saved-plans.component.css'] // Corrected to 'styleUrls'
})
export class ShowSavedPlansComponent implements OnInit, OnDestroy {

  visible: boolean = false;
  profileSubscription: Subscription | null = null;
  profile!: User;
  selectedMeal!:Meal

  constructor(
    private service: UserService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.profileSubscription = this.service.getprofile().subscribe({
      next: (res:any) => {
        if (res && res.message) {
          console.log('response is', res);
          
          this.profile = {
            name: res.profile.username,
            email: res.profile.email,
            password: res.profile.password,
            isblocked: res.profile.isblocked,
            place: res.profile.place,
            age: res.profile.age,
            gender: res.profile.gender,
            weight: res.profile.weight,
            height: res.profile.height,
            image: res.profile.image,
            createdAt: new Date(),
            subscription: res.profile.subscription,
            id: res.profile._id,
            savedDiets:res.profile.savedMeals

          };

          // Trigger change detection
          this.cdr.detectChanges();
        }
      },
      // Since you're using an interceptor for errors, no need to handle it here.
    });
  }

  mealDetails(mealId: string) {
    this.selectedMeal = this.profile.savedDiets
      ?.flatMap(diet => diet.meals)
      .find(meal => meal._id === mealId)!; // Non-null assertion

      console.log('this.selectd meal is',this.selectedMeal);
      
  
    if (!this.selectedMeal) {
      console.error(`Meal with ID ${mealId} not found.`);
    }
  }
  
  

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }
}

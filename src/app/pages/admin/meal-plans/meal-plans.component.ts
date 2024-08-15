import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { adminService } from '../../../core/services/module-services/admin.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meal-plans',
  templateUrl: './meal-plans.component.html',
  styleUrls: ['./meal-plans.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class MealPlansComponent implements OnInit,OnDestroy {

  meals: any[] = [];  
  totalRecords!: number;
  loading: boolean = false;
  private getMealSub!:Subscription

  columns = [
    { field: 'name', header: 'Name', width: '15%' },
    { field: 'type', header: 'Type', width: '10%' },
    { field: 'description', header: 'Description', width: '30%' },
    { field: 'calories', header: 'Calories', width: '10%' },
    { field: 'protein', header: 'Protein', width: '10%' },
    { field: 'fats', header: 'Fats', width: '10%' }
  ];

  constructor(private service: adminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getMealSub = this.service.getMeals().subscribe({
      next: (data) => {
        this.meals = data.meal;
        console.log('meals are ',this.meals);
        
        this.totalRecords = this.meals.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching meals', err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: TableLazyLoadEvent): void {
    this.loading = true;
    const start = event.first ?? 0;
    const end = start + (event.rows ?? 5);
    this.meals = this.meals.slice(start, end);
    this.loading = false;
  }


  ngOnDestroy(): void {
    if(this.getMealSub) this.getMealSub.unsubscribe()

  }
}

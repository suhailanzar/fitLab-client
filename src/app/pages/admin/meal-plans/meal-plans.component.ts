import { Component, OnInit } from '@angular/core';
import { adminService } from '../../../core/services/admin.service';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-meal-plans',
  templateUrl: './meal-plans.component.html',
  styleUrls: ['./meal-plans.component.css']
})
export class MealPlansComponent implements OnInit {

  meals: any[] = [];  
  totalRecords!: number;
  loading: boolean = false;

  constructor(private service: adminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.getMeals().subscribe({
      next: (data) => {
        this.meals = data.meal;
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
}

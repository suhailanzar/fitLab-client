
import { Component, OnInit ,OnDestroy } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponentuser implements OnInit , OnDestroy {
  courses: any[] = [];
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 6;
  private courseSubscription: Subscription | undefined;

  constructor(private Service: UserService ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.Service.getAllCourses(this.currentPage, this.limit).subscribe({
      next: (data) => {
        this.courses = data.courses;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages; 
        
        console.log('feont end ',this.currentPage,this.totalPages,this.courses);
        
      },
      error: (err) => {
        this.error = 'Failed to load courses. Please try again later.';
        console.error('Error loading courses:', err);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCourses();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCourses();
    }
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCourses();
    }
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }
}
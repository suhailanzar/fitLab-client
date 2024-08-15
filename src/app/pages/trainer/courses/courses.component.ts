import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { trainerService } from '../../../core/services/module-services/trainer.service';
import { ICourse } from '../../../core/models/trainer';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: ICourse[] = [];
  private coursesSub: Subscription | null = null;

  constructor(
    private service: trainerService
  ) { }

  ngOnInit(): void {
    this.coursesSub = this.service.getCourses().subscribe({
      next: (res) => {
        if (res && res.message) {
          this.courses = [...this.courses, ...res.availableCourses];
          console.log('Courses in the component:', this.courses);
        }
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }
}

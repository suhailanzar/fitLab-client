import { Component, OnInit } from '@angular/core';
import { trainerService } from '../../../core/services/module-services/trainer.service';
import { ICourse } from '../../../core/models/trainer';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {

  courses: ICourse[]=[];

  constructor(
    private service: trainerService
  ) { }

  ngOnInit(): void {

    this.service.getCourses().subscribe({
      next: (res) => {

        if (res && res.message) {

          this.courses = [...this.courses, ...res.availableCourses];
          console.log('courses in the compnent are', this.courses);


        }

      }
    })

  }

}

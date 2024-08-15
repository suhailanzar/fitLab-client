import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { ICourse } from '../../../core/models/trainer';

@Component({
  selector: 'app-coursedetails-admin',
  templateUrl: './coursedetails-admin.component.html',
  styleUrls: ['./coursedetails-admin.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class CoursedetailsAdminComponent implements OnInit, OnDestroy {

  public courseId!: string | null;
  course!: ICourse;
  private courseDetailsSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private service: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.getCourseDetails(this.courseId);
    }
  }

  getCourseDetails(id: string): void {
    this.courseDetailsSub = this.service.getCourseDetails(id).subscribe({
      next: (response) => {
        console.log(response);
        this.course = response.course;
        console.log('this.course is', this.course);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.courseDetailsSub) {
      this.courseDetailsSub.unsubscribe();
    }
  }
}

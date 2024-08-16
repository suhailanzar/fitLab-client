import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { ICourse } from '../../../core/models/trainer';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrl: './mycourse.component.css'
})
export class MycourseComponent implements OnInit, OnDestroy {

  purchasedCourses: any[] = [];
  showVideoModal: boolean = false;
  isLoading: boolean = true;
  error: string | null = null;
  coursevideo!:string

  private courseSubscription: Subscription | null = null;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.fetchPurchasedCourses();
  }



  fetchPurchasedCourses(): void {
    this.isLoading = true;
    this.courseSubscription = this.service.getPurchasedCourses().subscribe({
      next: (res:any) => {
        this.purchasedCourses = res.Courses;
        console.log('this.purchased ourse is',res);
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.error = 'Failed to load courses. Please try again later.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  openVideoModal(id: string ) {


    this.courseSubscription = this.service.getCourseDetails(id).subscribe({
      next: (res) => {
        this.coursevideo = res.course.modules[0].videoUrl
        
        this.showVideoModal = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.error = 'Failed to load courses. Please try again later.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });   
  }

  closeVideoModal() {
    this.showVideoModal = false;
    this.coursevideo = ""
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }
}
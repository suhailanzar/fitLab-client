import { Component , NgZone  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/module-services/user.service';
import { ICourse } from '../../../core/models/trainer';
import { RZPKEYID } from '../../../../env/environment';
import { Subscription } from 'rxjs';

declare var Razorpay: any;

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css'
})
export class CoursedetailsComponent {

  public courseId!: string | null;
  course!:ICourse
  private courseDetailsub: Subscription | null = null;

  constructor(private route: ActivatedRoute , private messageService:MessageService, private service:UserService ,  private router:Router ,    private ngZone: NgZone  ) {}


  ngOnInit(){
    this.courseId = this.route.snapshot.paramMap.get('id');    
    this.getCourseDetails(this.courseId)    

  }

  getCourseDetails(id:string | null) {
   this.courseDetailsub =   this.service.getCourseDetails(id).subscribe({
      next: (response) => {
        console.log(response);
        this.course = response.course
        console.log('this.course is',this.course);
        
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }


  
  // Razorpay integration
  checkout(id: string | undefined): void {

    const options = {
      key: RZPKEYID,
      amount: this.course.Price * 100,
      currency: 'INR',
      name: 'fitLab',
      description: 'Payment for course',
      handler: (response: any) => {
        this.handlePaymentSuccess(response, this.course);
      },
      theme: {
        color: '#3b28fe'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  handlePaymentSuccess(response: any, course: any): void {
    const paymentData = {
      razorpayPaymentId: response.razorpay_payment_id,
      amount: course.Price * 10,
      currency: 'INR',
      courseId:course.id,
      trainerId:course.trainerId,
      courseName:course.courseName
    };

    console.log('this corse is',this.course);
    

    this.service.saveCourse(paymentData).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          if (res && res.message) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.router.navigateByUrl('/courses')
            
          } else {
            console.warn('Unexpected response structure:', res);
          }
        });
      },
      error: (err: any) => {
        this.ngZone.run(() => {
          console.error('Error saving course:', err);
          if (err && err.error && err.error.message) {
            this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'An unexpected error occurred' });
          }
        });
      }
    });

  }

  ngOnDestroy() {    
    if (this.courseDetailsub) {
      this.courseDetailsub.unsubscribe();
    }
      }




}

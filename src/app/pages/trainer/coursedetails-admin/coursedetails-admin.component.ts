import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { ICourse } from '../../../core/models/trainer';

@Component({
  selector: 'app-coursedetails-admin',
  templateUrl: './coursedetails-admin.component.html',
  styleUrl: './coursedetails-admin.component.css'
})
export class CoursedetailsAdminComponent {

  
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
    });
  }



  ngOnDestroy() {    
    if (this.courseDetailsub) {
      this.courseDetailsub.unsubscribe();
    }
      }




}

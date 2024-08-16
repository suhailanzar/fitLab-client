import { Component , NgZone  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/module-services/user.service';
import { ICourse, IModule } from '../../../core/models/trainer';
import { Subscription } from 'rxjs';
import { IEnrolledCourse, IEnrolledModule } from '../../../core/models/user';


@Component({
  selector: 'app-mycourse-view',
  templateUrl: './mycourse-view.component.html',
  styleUrl: './mycourse-view.component.css'
})
export class MycourseViewComponent {


  
  public courseId!: string | null;
  course!:ICourse
  private courseDetailsub: Subscription | null = null;
  showVideoModal: boolean = false;
  coursevideo!:string
  isLoading: boolean = true;
  error: string | null = null;
  private courseSubscription: Subscription | null = null;
  purchasedCourses!:IEnrolledCourse;
  progressPercentage: number = 0;


  constructor(private route: ActivatedRoute , private messageService:MessageService, private service:UserService ,  private router:Router ,    private ngZone: NgZone  ) {}


  ngOnInit(){
    this.courseId = this.route.snapshot.paramMap.get('id');    
    this.getCourseDetails(this.courseId)   
    this.fetchPurchasedCourses() 

  }



  updateCompletion(module: IEnrolledModule) {
    module.completed = true
    this.updateModuleCompletion(module);
  }

  updateModuleCompletion(module: IEnrolledModule) {
    if(module.moduleId!=undefined){
      this.service.updateModuleCompletion(module.moduleId, this.courseId, module.completed).subscribe({
        next: (response) => {
          this.calculateProgress( this.purchasedCourses);
          
        },
      });
    }
 
  }

  
  fetchPurchasedCourses(): void {
    this.courseSubscription = this.service.getPurchasedCourses().subscribe({
      next: (res:any) => {
        const enrolledCourses = res.Enrolled;

        const targetCourse = enrolledCourses.find((enrolledCourse: { courseId: string | null; }) => enrolledCourse.courseId === this.courseId);

        this.purchasedCourses = targetCourse

        this.calculateProgress( this.purchasedCourses);

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

  calculateProgress(course: IEnrolledCourse): void {
    const totalModules = course.modules.length;
    const completedModules = course.modules.filter(module => module.completed).length;
    this.progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  }

  

  getCourseDetails(id:string | null) {
   this.courseDetailsub =   this.service.getCourseDetails(id).subscribe({
      next: (response) => {
        console.log(response);
        this.course = response.course
        
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
      }
    });
  }


  openVideoModal(id: string ) {


    this.courseSubscription = this.service.getCourseDetails(this.courseId).subscribe({
      next: (res:any) => {


        
        const ModuleDetails = res.course.modules.find((module: any) => module.id === id);
        console.log('enrolled  course is',this.purchasedCourses);
        
        const selectedModule = this.purchasedCourses.modules.find(module => module.moduleId === id);
        if(selectedModule)
        this.updateCompletion(selectedModule)        
        
        this.coursevideo =  ModuleDetails.videoUrl

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


  ngOnDestroy() {    
    if (this.courseDetailsub) {
      this.courseDetailsub.unsubscribe();
    }
      }




}

import { Component,OnInit } from '@angular/core';
import { Trainer } from '../../../core/models/trainer';
import { ActivatedRoute } from '@angular/router';
import { adminService } from '../../../core/services/module-services/admin.service';
import { MessageService } from 'primeng/api'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrl: './trainer-details.component.css'
})
export class TrainerDetailsComponentUser {

  
  public trainerId: any;
  public trainerDetail?: Trainer;
  private viewtrainerSub!:Subscription
  
  constructor(private route: ActivatedRoute, private service:adminService , private messageService:MessageService) {}


  ngOnInit() {
    this.trainerId = this.route.snapshot.paramMap.get('id');     
     this.viewtrainerSub =  this.service.viewtrainers(this.trainerId).subscribe({
      next:(res=>{
        if(res){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
          this.trainerDetail = res.trainer
          console.log('trainer details are',this.trainerDetail);
          

        }
      })
    })

  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.viewtrainerSub.unsubscribe();
  }
  
}

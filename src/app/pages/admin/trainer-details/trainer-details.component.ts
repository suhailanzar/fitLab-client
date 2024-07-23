import { Component , OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adminService } from '../../../core/services/admin.service';
import { MessageService } from 'primeng/api';
import { Trainer } from '../../../core/models/trainer';


@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrl: './trainer-details.component.css',
  
})
export class TrainerDetailsComponent  implements OnInit{

  public trainerId: any;
  public trainerDetail?: Trainer;
  constructor(private route: ActivatedRoute, private service:adminService , private messageService:MessageService) {}

  ngOnInit() {
    this.trainerId = this.route.snapshot.paramMap.get('id');     
       this.service.viewtrainers(this.trainerId).subscribe({
      next:(res=>{
        if(res){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
          this.trainerDetail = res.trainer
          console.log('trainer details are',this.trainerDetail);
        
        }
      })
    })

  }

  
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../core/models/user';
import { ActivatedRoute } from '@angular/router';
import { adminService } from '../../../core/services/module-services/admin.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit,OnDestroy {


  public trainerId!: string;
  public userDetail!: any;
  viewUserSub!:Subscription;
  constructor(private route: ActivatedRoute, private service:adminService , private messageService:MessageService) {}

  ngOnInit() {
    const trainerid= this.route.snapshot.paramMap.get('id');  
        
    if(trainerid) this.trainerId = trainerid
    
     this.viewUserSub =   this.service.viewUser(this.trainerId).subscribe({
      next:(res=>{
        if(res){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
          this.userDetail = res.user
          console.log('user is',this.userDetail);
        }
      })
    })

  }

  ngOnDestroy(): void {
    if(this.viewUserSub) this.viewUserSub.unsubscribe()
  }

}

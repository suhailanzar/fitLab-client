import { Component } from '@angular/core';
import { User } from '../../../core/models/user';
import { ActivatedRoute } from '@angular/router';
import { adminService } from '../../../core/services/module-services/admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent {


  public trainerId!: string;
  public userDetail!: any;
  constructor(private route: ActivatedRoute, private service:adminService , private messageService:MessageService) {}

  ngOnInit() {
    const trainerid= this.route.snapshot.paramMap.get('id');  
        
    if(trainerid) this.trainerId = trainerid
    
       this.service.viewUser(this.trainerId).subscribe({
      next:(res=>{
        if(res){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message })
          this.userDetail = res.user
          console.log('user is',this.userDetail);
        }
      })
    })

  }

}

import { Component,ViewEncapsulation } from '@angular/core';
import { adminService } from '../../../core/services/admin.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Trainer } from '../../../core/models/trainer';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TrainersComponent {

  private trainersubscription : Subscription | null = null;
  public trainers:Trainer[] = []

  constructor( private service:adminService , private messageService: MessageService  ){
  }

  ngOnInit():void{
    this.service.getTrainers().subscribe({
      next:(res =>{
        if(res){
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });          
          this.trainers = res.trainers

        }
      }),error: (err =>{
        if(err && err.error.message){
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          
        }
      })
    })
  }

 


}

import { Component,OnInit,OnDestroy,OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { trainerService } from '../../../core/services/module-services/trainer.service';
import { User } from '../../../core/models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit, OnDestroy {

  clients!:User[];
  private clientsubscription : Subscription | null = null;


  constructor(  private service:trainerService , private messageService: MessageService){

  }

  ngOnInit(): void {
    this.service.getClients().subscribe({
      next:(res =>{
        if(res){
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });          
          this.clients = res.clients.map((client: any) => ({
            name: client.username,
            email: client.email,
            password: client.password,
            isblocked: client.isblocked,
            image:client.image
          }));  
          

        }
      }),error: (err =>{
        if(err && err.error.message){
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          
        }
      })
    })

  }

  ngOnDestroy(): void {
    
  }

}

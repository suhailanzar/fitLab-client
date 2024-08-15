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
   this.clientsubscription = this.service.getClients().subscribe({
      next:(res =>{
        if(res){
          this.clients = res.clients.map((client: any) => ({
            name: client.username,
            email: client.email,
            password: client.password,
            isblocked: client.isblocked,
            image:client.image
          }));  
          

        }
      })
    })

  }

  ngOnDestroy(): void {
    if(this.clientsubscription) this.clientsubscription.unsubscribe()
  }

}

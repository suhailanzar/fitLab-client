import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { adminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Trainer } from '../../../core/models/trainer';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RequestsComponent {
  private trainerSubscription: Subscription | null = null;
  trainers: Trainer[] = [];

  constructor(private service: adminService, private router: Router, private messageService: MessageService) { }


  ngOnInit(): void {
    this.service.get_requests().subscribe({
      next: (res => {
        if (res) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.trainers = res.trainers

        }
      }), error: (err => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          console.log('error', err);
        }
      })
    });
  }

  trainerApproval(id:string,index:number){
    this.service.trainerApproval(id).subscribe({
      next: (res => {
        if (res) {   
          this.trainers[index].isapproved = true       
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        }
      }), error: (err => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          console.log('error', err);

        }
      })

    })
  }


}

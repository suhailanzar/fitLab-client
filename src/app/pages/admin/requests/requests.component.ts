import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { adminService } from '../../../core/services/module-services/admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Trainer } from '../../../core/models/trainer';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
  encapsulation: ViewEncapsulation.None
})

export class RequestsComponent implements OnInit, OnDestroy {
  private trainerRequestsSubscription: Subscription | null = null;
  private trainerApprovalSubscription: Subscription | null = null;
  trainers: Trainer[] = [];

  constructor(private service: adminService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.trainerRequestsSubscription = this.service.get_requests().subscribe({
      next: (res => {
        if (res) {
          this.trainers = res.trainers;
        }
      }), 
    });
  }

  trainerApproval(id: string, index: number): void {
    this.trainerApprovalSubscription = this.service.trainerApproval(id).subscribe({
      next: (res => {
        if (res) {   
          this.trainers[index].isapproved = true;       
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        }
      })
    });
  }

  ngOnDestroy(): void {
    if(this.trainerRequestsSubscription) this.trainerRequestsSubscription.unsubscribe();
    if(this.trainerApprovalSubscription) this.trainerApprovalSubscription.unsubscribe();
  }
}

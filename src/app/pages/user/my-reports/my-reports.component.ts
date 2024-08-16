import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reports } from '../../../core/models/admin';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrl: './my-reports.component.css'
})
export class MyReportsComponent implements OnInit ,OnDestroy{

  reports: Reports[] = [];  
  totalRecords!: number;
  loading: boolean = false;
  reportSubscription: Subscription | null = null;
 
  constructor(
    private service: UserService, 
    private router: Router, 
    private messageService: MessageService,
  ){}

  ngOnInit(){
    this.reportSubscription = this.service.getReportsUser().subscribe({
      next: (data) => {
        this.reports = data.reports;
        console.log('Reports fetched:', this.reports);
        this.totalRecords = this.reports.length;
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.reportSubscription){
      this.reportSubscription.unsubscribe();
    }
    
  }



}

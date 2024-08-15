import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { adminService } from '../../../core/services/module-services/admin.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { Reports } from '../../../core/models/admin';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-reports-admin',
  templateUrl: './reports-admin.component.html',
  styleUrls: ['./reports-admin.component.css'] // corrected from 'styleUrl' to 'styleUrls'
})
export class ReportsAdminComponent implements OnInit, OnDestroy {

  reports: Reports[] = [];  
  totalRecords!: number;
  loading: boolean = false;
  reportSubscription: Subscription | null = null;
  visibleBooking: boolean = false;
  selectedReport: Reports | null = null;

  columns = [
    { field: 'userName', header: 'User Name', width: '15%', type: '', alt: 'name' },
    { field: 'trainerName', header: 'Trainer Name', width: '15%', type: '', alt: 'name' },
    { field: 'date', header: 'Date', width: '15%', type: 'date' },
    { field: 'reportType', header: 'Report type', width: '15%' },
    { field: 'isReported', header: 'Status', width: '15%', type: 'boolean' },
    { 
      header: 'Action', 
      width: '20%', 
      type: 'actions',
      actions: [
        {
          action: 'view',
          label:  (item: User) => this.viewLabel(),
          buttonClass: (item: User) => this.viewButtonClass()
        },      ]
    }
  ];

  constructor(
    private service: adminService, 
    private router: Router, 
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.reportSubscription = this.service.getReports().subscribe({
      next: (data) => {
        this.reports = data.reports;
        console.log('Reports fetched:', this.reports);
        this.totalRecords = this.reports.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching reports:', err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: TableLazyLoadEvent): void {
    this.loading = true;
    const start = event.first ?? 0;
    const end = start + (event.rows ?? 5);
    this.reports = this.reports.slice(start, end);
    this.loading = false;
  }

  onAction(event: { action: string; item: Reports }): void {

    console.log('event is',event);
    
    if (event.action === 'view') {
      this.visibleBooking = true;
      const foundReport = this.reports.find((report) => report._id === event.item._id);
      if (foundReport) {
        this.selectedReport = foundReport;
        console.log('Selected report:', this.selectedReport);
        this.cdr.detectChanges(); // Ensure changes are detected
      } else {
        console.error('Report not found');
      }
    }
  }

  sendMail(userid: string ,ReportId:string) {
    this.visibleBooking = false;
    if (userid) {
      this.reportSubscription = this.service.sendMail(userid,ReportId).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        },
        error: (err) => {
          console.error('Error sending mail:', err);
        }
      });
    } else {
      console.error('No report selected to send mail');
    }
  }

  viewLabel():string{
    return "View"
  }

  viewButtonClass():string{
    return 'w-20 text-white bg-gradient-to-r from-blue-400 via-blue-500 w-100 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2';  
  }

  ngOnDestroy(): void {
    if (this.reportSubscription) {
      this.reportSubscription.unsubscribe();
    }
  }
}

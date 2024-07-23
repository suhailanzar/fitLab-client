import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { adminService } from '../../../core/services/admin.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Trainer } from '../../../core/models/trainer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TrainersComponent implements OnInit, OnDestroy {

  private trainerSubscription: Subscription | null = null;
  public trainers: Trainer[] = [];
  columns = [
    { field: 'trainername', header: 'Name', width: '20%', type: 'text' },
    { field: 'specification', header: 'Specification', width: '20%' },
    { field: 'email', header: 'Email', width: '20%' },
    { field: 'image', header: 'Image', width: '20%', type: 'image', alt: 'trainername' },
    { 
      header: 'Action', 
      width: '20%', 
      type: 'actions',
      actions: [
        { action: 'view', label: 'View', buttonClass: 'bg-blue-800 text-white font-semibold py-2 px-4 rounded-md text-sm shadow-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50' }
      ]
    }
  ];

  constructor(private service: adminService, private messageService: MessageService , private router:Router) {}

  ngOnInit(): void {
    this.loadTrainers();
  }

  ngOnDestroy(): void {
    if (this.trainerSubscription) {
      this.trainerSubscription.unsubscribe();
    }
  }

  loadTrainers(): void {
    this.trainerSubscription = this.service.getTrainers().subscribe({
      next: (res) => {
        if (res && res.trainers) {
          this.trainers = res.trainers;
          console.log('trainers are', this.trainers);
        }
      },
      error: (error) => {
        console.error('Error fetching trainers:', error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to load trainers'});
      }
    });
  }

  onTrainerAction(event: {action: string, item: Trainer}): void {
    if (event.action === 'view') {
      this.router.navigate(['/admin/trainerdetails', event.item._id]);
    }
  }
}
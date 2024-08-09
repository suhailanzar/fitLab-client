import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { adminService } from '../../../core/services/module-services/admin.service';
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
    { field: 'isblocked', header: 'IsBlocked', width: '10%' },
    {
      header: 'Action',
      width: '20%',
      type: 'actions',
      actions: [
        {
          action: 'toggleBlock',
          label: (item: Trainer) => this.toggleBlockLabel(item),
          buttonClass: (item: Trainer) => this.toggleBlockButtonClass(item)
        },
        {
          action: 'view',
          label:  (item: Trainer) => this.viewLabel(),
          buttonClass: (item: Trainer) => this.viewButtonClass()
        },
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

  updateTrainerStatus(id: string, isBlocked: boolean) {
    const trainer = this.trainers.find(t => t._id === id); 
    if (trainer) {
      trainer.isblocked = isBlocked;
    }
  }

  blockTrainer(id:string,isBlocked: boolean): void {
    this.trainerSubscription = this.service.blockTrainer(id).subscribe({
      next: (res) => {
        this.updateTrainerStatus(id, !isBlocked);
      },
   
    });
  }

  onTrainerAction(event: { action: string,item: Trainer }): void {
    const { action, item } = event;
    if (action === 'toggleBlock') {
      this.blockTrainer(item._id, item.isblocked);
    } if (action === 'view') {
      this.router.navigate(['/admin/trainerdetails', event.item._id]);    }
  }


  toggleBlockLabel(item: Trainer): string {
    return item.isblocked ? 'Unblock' : 'Block';
  }
  
  toggleBlockButtonClass(item: Trainer): string {
    return item.isblocked 
      ? ' w-20 text-white bg-gradient-to-r from-green-400 via-green-500 w-100 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2'
      : 'w-20 text-white bg-gradient-to-r from-red-400 via-red-500 w-100 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2';
  }

  viewLabel():string{
    return "View"
  }

  viewButtonClass():string{
    return 'w-20 text-white bg-gradient-to-r from-blue-400 via-blue-500 w-100 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2';  
  }
  
  }


import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription, noop } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Trainer } from '../../../core/models/trainer';
import { FormControl , ReactiveFormsModule  } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
  encapsulation:ViewEncapsulation.None
})
export class TrainersComponentuser {
  private trainerSubscription: Subscription | null = null;
  trainers: Trainer[] = [];
  filteredTrainers: Trainer[] = [];
  searchControl = new FormControl();
  results: string [] = [];
  hasTypedQuery: boolean = false;
  selectedTrainer: any; // Track the selected trainer here




  constructor(private service: UserService, private router: Router, private messageService: MessageService ) {
    this.setupSearchSubscription();
   }

  ngOnInit(): void {

    this.service.getTrainers().subscribe({
      next: (res => {
        if (res) {
         
          console.log('trainers are',res.trainers);
          
          this.trainers = res.trainers
        }
      }), error: (err => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          console.log('error', err);

        }
      })
    })

    
  }

  
  private setupSearchSubscription() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(query => !!query || query === ''), // Include empty query ('') to clear results
      switchMap(query => {
        if (query === '') {
          this.clearSearch(); // Clear results if query is empty
          return [];
        } else {
          return this.service.searchTrainers(query);
        }
      })
    ).subscribe({
      next: results => {
        this.results = results;
        this.hasTypedQuery = true;
      },
      error: error => {
        console.error('Error fetching search results', error);
      }
    });
  }


  clearSearch(): void {
    this.searchControl.setValue('');
    this.results = []; 
    this.hasTypedQuery = false; 
    this.selectedTrainer = null;
  }


  selectTrainer(trainer: string): void {
    console.log('entered the select trainer', trainer);
    
    this.selectedTrainer = this.trainers.find(t => t.trainername === trainer);
    console.log('selected trainer is', this.selectedTrainer);
    
    this.results = []; 
  }
 
}






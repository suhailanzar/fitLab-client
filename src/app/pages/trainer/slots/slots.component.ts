import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { trainerService } from '../../../core/services/trainer.service';
import { Slot } from '../../../core/models/trainer';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.css'
})
export class SlotsComponent {

  slots: Slot[] = [];


  slotForm!:FormGroup
  private slotSubscription: Subscription | null = null;

  constructor(private fb: FormBuilder  , private router:Router , private messageService:MessageService, private service:trainerService  , private cdr: ChangeDetectorRef) {
    this.slotForm = this.fb.group({
      date: ['', Validators.required], 
      startTime: ['', Validators.required],
      price:['', Validators.required]
     
    }); 

  }



  ngOnInit() {

      this.slotSubscription = this.service.getslots().subscribe({
        next: (res) =>{
          console.log('respojns os ',res.Details.availableslots);
          
          if(res && res.message){
            this.slots = res.Details.availableslots
            console.log('slots are ',this.slots);
            
          }
        }
      })
    
  }

  fullvalid(){
    Object.keys(this.slotForm.controls).forEach(control => {
      this.slotForm.get(control)?.markAsTouched();
    });
  }

  addSlot(data:Slot) {
    
 
    this.slotSubscription = this.service.addSlot(data).subscribe({
      next: (res) => {

        if (res && res.message) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.slotForm.reset();
          this.cdr.detectChanges(); 

        }
      },
      error: (err:any) => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
        }
      },
    }); 


  }


  
  onSubmit() {
    
    if (this.slotForm.valid) {
      
      this.addSlot(this.slotForm.value);
    }

  }

  deleteSlot(slot: Slot) {
    this.slots = this.slots.filter(s => s !== slot);
  }

  ngOnDestroy() {
    console.log('slotpage destroyed');
    
    if (this.slotSubscription) {
      this.slotSubscription.unsubscribe();
    }
      }

}

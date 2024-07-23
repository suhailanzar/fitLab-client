import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { trainerService } from '../../../core/services/trainer.service';
import { Slot } from '../../../core/models/trainer';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit, OnDestroy {

  slots: Slot[] = [];
  visibleBooking: boolean = false;
  bookedslots: Slot[] = [];
  trainerid: string | null = this.getTrainerId();
  slotForm!: FormGroup;
  visibilitySlot: boolean = false;
  private slotSubscription: Subscription | null = null;
  currentslotid!: string;
  minDate!: string;
  newSlots: Slot[] = []

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private service: trainerService, private cdr: ChangeDetectorRef) {
    this.slotForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit() {

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`;


    this.slotSubscription = this.service.getslots().subscribe({
      next: (res) => {
        if (res && res.message) {
          this.slots = res.Details.availableslots;
        }
      },
      error: (err) => {
        console.error('Error fetching slots:', err);
      }
    });
  }

  getTrainerId(): string | null {
    const userString = localStorage.getItem('trainer');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        return user.id;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  showDialog() {
    this.visibleBooking = true;
  }

  fullValid() {
    Object.keys(this.slotForm.controls).forEach(control => {
      this.slotForm.get(control)?.markAsTouched();
    });
  }

  addSlot(data: Slot[]) {
    this.slotSubscription = this.service.addSlot(data).subscribe({
      next: (res) => {
        if (res && res.message) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.slotForm.reset();
          this.newSlots = []
          this.slots.push(res.addedslot);
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
        }
      },
    });
  }

  viewBookings() {
    this.bookedslots = this.slots.filter(slot => slot.status === true);
  }

  generateSlots(): void {
    console.log('Entered generate slots');
  
    const startTimeStr = this.slotForm.value.startTime;
    const endTimeStr = this.slotForm.value.endTime;
  
    console.log('Start time string:', startTimeStr, 'End time string:', endTimeStr);
  
    // Create Date objects for today with the given times
    const today = new Date();
    const startTime = this.createDateWithTime(today, startTimeStr);
    const endTime = this.createDateWithTime(today, endTimeStr);
    
    if (startTime >= endTime) {
      this.messageService.add({ severity: 'error', summary: 'Alert', detail: "Start time must be before end time"  });

      return;
    }
  
    this.newSlots = [];
  
    let currentTime = new Date(startTime.getTime());
    while (currentTime < endTime) {
      const slotEnd = new Date(currentTime.getTime() + 60 * 60 * 1000); // Add 1 hour
  
      if (slotEnd > endTime) {
        slotEnd.setTime(endTime.getTime());
      }
  
      const slot = {
        date:new Date(),
        price:150,
        status:false,
        startTime: this.formatTime(currentTime),
        endTime:this.formatTime(endTime)
      };
  
      this.newSlots.push(slot);
      currentTime = new Date(slotEnd.getTime());
    }

    }


    addSlotToDb(){
      this.addSlot(this.newSlots)
    }
  
  private createDateWithTime(date: Date, timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  }
  
  private formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  editSlotVisible(id: string) {
    this.visibilitySlot = true;
    this.currentslotid = id;
  
    // Fetch the slot details and populate the form
    const slot = this.slots.find(s => s._id === id);
    if (slot) {
      this.slotForm.patchValue({
        date: slot.date,
        startTime: slot.startTime,
        price: slot.price
      });
    }
  }
  

  onSubmitEditSlot() {
    if (this.slotForm.valid) {
      this.visibilitySlot = false;
      const formData : Slot = {
        date: this.slotForm.get('date')!.value,
        startTime: this.slotForm.get('startTime')!.value,
        endTime: this.slotForm.get('endTime')!.value,
        status: false,
        price: 150
      };
      this.editSlot(formData);
    } else {
      this.fullValid();
    }
  }
  
  editSlot(data: Slot) {
    this.service.editSlot(this.currentslotid, data).subscribe({
      next: (res) => {
        if (res && res.message) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
  
          const index = this.slots.findIndex(slot => slot._id === this.currentslotid);
          if (index !== -1) {
            this.slots[index] = { ...this.slots[index], ...data };
          }
  
          this.slotForm.reset();
          this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
        }
      }
    });
  }
  

  onSubmit() {
    if (this.slotForm.valid) {
      this.generateSlots()
    } else {
      this.fullValid();
    }
  }

  deleteSlot(slot: Slot) {
    this.slots = this.slots.filter(s => s !== slot);
  }

  ngOnDestroy() {
    if (this.slotSubscription) {
      this.slotSubscription.unsubscribe();
    }
  }
}

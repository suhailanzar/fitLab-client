
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { adminService } from '../../../core/services/module-services/admin.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-addmeal',
  templateUrl: './addmeal.component.html',
  styleUrl: './addmeal.component.css'
})
export class AddmealComponent implements OnInit,OnDestroy {

  mealForm!: FormGroup;
  selectedFileName: string | null = null;
  addMealSubscription!:Subscription

  constructor(private fb: FormBuilder , private service:adminService ,  private messageService: MessageService) {}

  ngOnInit() {
    this.mealForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      calories: ['', [Validators.required, Validators.min(0)]],
      protein: ['', [Validators.required, Validators.min(0)]],
      fats: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.mealForm.patchValue({
        image: file
      });
      this.mealForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.mealForm.valid) {

      const formData = new FormData();
      formData.append('name', this.mealForm.get('name')!.value);
      formData.append('type', this.mealForm.get('type')!.value);
      formData.append('category', this.mealForm.get('category')!.value);
      formData.append('image', this.mealForm.get('image')!.value);
      formData.append('description', this.mealForm.get('description')!.value); 
      formData.append('calories', this.mealForm.get('calories')!.value); 
      formData.append('protein', this.mealForm.get('protein')!.value); 
      formData.append('fats', this.mealForm.get('fats')!.value); 

      this.addMealSubscription = this.service.addmeal(formData).subscribe({
        next:(res) =>{
          if(res && res.message){
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.mealForm.reset();
          }

        },
      })
    } else {
      Object.keys(this.mealForm.controls).forEach(key => {
        const control = this.mealForm.get(key);
        control?.markAsTouched();
      });
    }
  }


  ngOnDestroy(): void {
    if(this.addMealSubscription){
      this.addMealSubscription.unsubscribe();
    }
    
  }
}

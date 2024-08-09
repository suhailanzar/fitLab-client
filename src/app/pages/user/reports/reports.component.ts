import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../core/services/module-services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

  reportform!:FormGroup
  selectedFiles: FileList | null = null;
  reportSubscription!:Subscription

  constructor(
    private fb:FormBuilder,
    private messageService:MessageService,
    private service:UserService
  ){}
  ngOnInit(): void {
    this.reportform = this.fb.group({
      trainerName: ['', Validators.required],
      date: ['', Validators.required],
      reportType: ['', Validators.required],
      description: ['', Validators.required],
      evidence: [null]  
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const fileNames = Array.from(this.selectedFiles).map(file => file.name).join(', ');
      this.reportform.patchValue({
        evidence: fileNames
      });
    }
  }

  onSubmit() {
    if (this.reportform.valid) {
      const formData = new FormData();
      formData.append('trainerName', this.reportform.get('trainerName')?.value);
      formData.append('date', this.reportform.get('date')?.value);
      formData.append('reportType', this.reportform.get('reportType')?.value);
      formData.append('description', this.reportform.get('description')?.value);
      
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('evidence', this.selectedFiles[i]);
        }
      }

      this.submitReport(formData)
      
    }else{
        Object.keys(this.reportform.controls).forEach(control => {
          this.reportform.get(control)?.markAsTouched();
        });
    }
  }



  submitReport(data:FormData){    
   this.reportSubscription =  this.service.submitReport(data).subscribe({
      next:(res)=>{
        console.log('got the response from the backend',res);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.reportform.reset();

      }
    })
  }

  ngOnDestroy() {
    if(this.reportSubscription){
      this.reportSubscription.unsubscribe();
    }
  }

}

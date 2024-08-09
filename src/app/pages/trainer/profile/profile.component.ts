
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ValidatorFn , AbstractControl} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { trainerService } from '../../../core/services/module-services/trainer.service';
import { Trainer } from '../../../core/models/trainer';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None ,
 
})
export class ProfileComponent {
  form!: FormGroup;
  private editprofilesub: Subscription | null = null;
  visible: boolean = false;
  profile!: Trainer;

  constructor(private fb: FormBuilder, private http: HttpClient, private service: trainerService, private router: Router, private messageService: MessageService) {
    this.form = this.fb.group({
      image: ['', [ this.imageValidator]],
      trainername: ['', Validators.required],
      specification: ['', Validators.required],
      phone: ['', Validators.required]
      
    });
  }



  ngOnInit(): void {
    this.service.getprofile().subscribe({
      next: (res) => {
        if (res) {
          this.profile = res.Details;
          this.form.patchValue(this.profile);
          
        }
      },
      error: (err) => {
        if (err && err.error && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          console.error('Error fetching profile:', err);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: 'Unknown error occurred' });
          console.error('Unknown error fetching profile:', err);
        }
      }
    });
  }


   imageValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; 
    }
  
    const file = control.value;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { invalidFileType: true };
    }
  
    const maxFileSize = 1 * 1024 * 1024;
    if (file.size > maxFileSize) {
      return { fileTooLarge: true };
    }
  
    return null; 
  };

  showDialog() {
    this.visible = true;
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.visible = false;


      const formData = new FormData();
      formData.append('trainername', this.form.get('trainername')!.value);
      formData.append('specification', this.form.get('specification')!.value);
      formData.append('phone', this.form.get('phone')!.value);
      formData.append('image', this.form.get('image')!.value); 

      this.sendData(formData);
    }
  }

  sendData(data: FormData) {
    console.log('inside the senddata',data);
    
    this.editprofilesub = this.service.editprofile(data).subscribe({
      next: (res) => {
        console.log('response is ',res.updatedProfile);
        
        if (res && res.message) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

          this.form.patchValue(this.profile);
        }
      },
      error: (err: any) => {
        if (err && err.error.message) {
          this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
        }
      }
    });
  }


  fullvalid() {
    Object.keys(this.form.controls).forEach(control => {
      this.form.get(control)?.markAsTouched();
    });
  }
}

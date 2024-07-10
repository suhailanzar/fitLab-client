import { Component, OnInit } from '@angular/core';
import { IModule } from '../../../core/models/trainer';
import { FormBuilder, FormGroup, FormArray, AbstractControl, Validators, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { trainerService } from '../../../core/services/trainer.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {


  myDate = new Date();
  courseForm!: FormGroup;
  errorMessage!:string;
  private coursesub: Subscription | null = null;
  isLoading:boolean= false;
 

  constructor(private fb: FormBuilder,private router:Router , private messageService:MessageService ,private service:trainerService ) {}

  ngOnInit() {

    this.initForm();

  }

  initForm() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      Price: ['', Validators.required],
      modules: this.fb.array([])
    });

    this.addModule();
  }

  get modules() {
    return this.courseForm.get('modules') as FormArray;
  }

  validateAndAddModule() {
    const modules = this.courseForm.get('modules') as FormArray;
    
    // Check if there are any modules
    if (modules.length === 0) {
      this.addModule();
      return;
    }
  
    // Get the last module
    const lastModule = modules.at(modules.length - 1) as FormGroup;
  
    // Check if the last module is valid
    if (lastModule.valid) {
      this.addModule();
    } else {
      // Mark all fields in the last module as touched to trigger validation messages
      Object.keys(lastModule.controls).forEach(key => {
        lastModule.get(key)?.markAsTouched();
      });
  
      // This assumes you have an error message container in your template
      this.errorMessage = 'Please fill in all required fields in the current module before adding a new one.';
  
    }
  }


  validateModulebyeach(){
    const modules = this.courseForm.get('modules') as FormArray;
    const lastModule = modules.at(modules.length - 1) as FormGroup;
    Object.keys(lastModule.controls).forEach(key => {
      lastModule.get(key)?.markAsTouched();
    });
    this.errorMessage = 'Please fill in all required fields in the current module before adding a new one.';


  }




  checkModulesValidity(): boolean {
    let isValid = true;
    
    const modulesArray = this.courseForm.get('modules') as FormArray;
    
    modulesArray.controls.forEach((abstractControl: AbstractControl, index: number) => {
      if (abstractControl instanceof FormGroup) {
        const moduleGroup = abstractControl as FormGroup;
        
        // Mark all controls in this module as touched
        Object.values(moduleGroup.controls).forEach(control => {
          control.markAsTouched();
        });
        
        // Now check validity
        if (moduleGroup.invalid) {
          isValid = false;
          console.log(`Module ${index + 1} is invalid:`, moduleGroup.errors);
        }
      }
    });
    
    console.log('Validity of modules is', isValid);
    
    return isValid;
  }
  
  
  addModule() {
    const modules = this.courseForm.get('modules') as FormArray;
    modules.push(this.fb.group({
      moduleName: ['', Validators.required],
      moduleDescription: ['', Validators.required],
      videoFile: [null, Validators.required],
      videoPreviewUrl: ['']
    }));
  
    this.errorMessage = '';
  }

  

  removeModule(index: number) {
    this.modules.removeAt(index);
  }

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.modules.at(index).patchValue({
          videoFile: file,
          videoFileName: file.name,
          videoPreviewUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }
  

  fullvalid(){
    Object.keys(this.courseForm.controls).forEach(control => {
      this.courseForm.get(control)?.markAsTouched();
    });
    this.validateModulebyeach()

  return this.courseForm.valid;

  }

    startLoading() {
      this.isLoading = true;
    }
  
    stopLoading() {
      this.isLoading = false;
    }
    


  onSubmit() {

    this.startLoading()
  
    if (this.courseForm.valid && this.checkModulesValidity()) {

      const formData = new FormData();
      formData.append('courseName', this.courseForm.get('courseName')?.value);
      formData.append('description', this.courseForm.get('description')?.value);
      formData.append('Price', this.courseForm.get('Price')?.value);
  
      this.modules.controls.forEach((module, index) => {
        formData.append(`modules[${index}][moduleName]`, module.get('moduleName')?.value);
        formData.append(`modules[${index}][moduleDescription]`, module.get('moduleDescription')?.value);
        formData.append(`modules[${index}][videoFile]`, module.get('videoFile')?.value);
      });

      console.log('Logging FormData entries:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      

      this.service.addCourse(formData).subscribe({
        next:(res)=>{
            if(res && res.message){
              this.stopLoading()
              this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.courseForm.reset();
              this.modules.clear();
              this.addModule();

              }    
        },
        error: (err) => {
          this.stopLoading();
          console.error('Error:', err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred' });
        }
      })

      
    } else {
      this.stopLoading()
      console.log('Form errors:', this.courseForm.errors);
      console.log('Modules errors:', this.modules.errors);
    }
  }
  
}

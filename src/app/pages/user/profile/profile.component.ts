import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/module-services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  visible: boolean = false;
  form!: FormGroup;
   editprofilesub: Subscription | null = null;
   profileSubscription: Subscription | null = null;
  profile!: User;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  imageUrl!: string | undefined
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef 
  ) {
    this.form = this.fb.group({
      username: [''],
      place: [''],
      age: [''],
      weight: [''],
      height: [''],
      gender: [''],
    });
  }



  ngOnInit() {
    console.log('profile initiated');

   this.profileSubscription = this.service.getprofile().subscribe({
      next: (res:any) => {
        if (res && res.message) {
          console.log('resposne is',res);
          
          const userProfile: User = {
            name: res.profile.username,
            email: res.profile.email,
            password: res.profile.password,
            isblocked: res.profile.isblocked,
            place: res.profile.place,
            age: res.profile.age,
            gender: res.profile.gender,
            weight: res.profile.weight,
            height: res.profile.height,
            image: res.profile.image,
            createdAt: new Date(),
            subscription:res.profile.subscription,
            id: res.profile._id,
            savedDiets:res.profile.savedDiets
          };

          this.profile = userProfile;
          this.imageUrl = this.profile.image;           
          this.form.patchValue(this.profile);
          this.cdr.detectChanges(); 
          
        }
      },
    });
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.cdr.detectChanges(); 

      };
      reader.readAsDataURL(this.selectedFile);
      this.uploadImage();
    }
  }

  uploadImage(): void {

    console.log('selected image file is',this.selectedFile);
    
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.editProfile(formData)
    }
  }

 
  editProfileVisible(vis: boolean) {
    this.visible = vis;
  }

  onSubmit() {
    console.log('inside the onsubmit');

    this.visible = false;

    const formData = new FormData();
    formData.append('username', this.form.get('username')!.value);
    formData.append('place', this.form.get('place')!.value);
    formData.append('age', this.form.get('age')!.value);
    formData.append('weight', this.form.get('weight')!.value);
    formData.append('height', this.form.get('height')!.value);
    formData.append('gender', this.form.get('gender')!.value);

    this.editProfile(formData);
  }

  editProfile(data: FormData) {
    console.log('inside the senddata', data);

    this.editprofilesub = this.service.editprofile(data).subscribe({
      next: (res) => {
        if (res && res.message) {
          console.log('response after editing is',res);
          
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });

          const updatedProfile: User = {
            ...this.profile,
            name: data.get('username') as string,
            place: data.get('place') as string,
            age: Number(data.get('age')),
            weight: Number(data.get('weight')),
            height: Number(data.get('height')),
            gender: data.get('gender') as string,
            image:res.profile.image
          };

          this.profile = updatedProfile;
          this.imageUrl = res.profile.image
          console.log('profile is ',this.profile);
          
          this.form.patchValue(this.profile);
        }
      },
  
    });
  }

  ngOnDestroy() {
    if (this.editprofilesub) {
      this.editprofilesub.unsubscribe();
    }
    if(this.profileSubscription) this.profileSubscription.unsubscribe();
  }
}

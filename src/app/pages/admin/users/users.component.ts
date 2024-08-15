 import { Component, OnInit, OnDestroy } from '@angular/core';
import { adminService } from '../../../core/services/module-services/admin.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { adminUser, User } from '../../../core/models/user';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponentadmin implements OnInit, OnDestroy {

  
  private userSubscription: Subscription | null = null;
  private userBlockSubscription: Subscription | null = null;
  public users: any[] = [];

  
  columns = [
    { field: 'username', header: 'Name', width: '20%', type: 'text' },
    { field: 'email', header: 'Email', width: '20%' },
    { field: 'image', header: 'Image', width: '20%', type: 'image', alt: 'trainername' },
    { field: 'isblocked', header: 'Is Blocked', width: '20%' },
    { 
      header: 'Action', 
      width: '20%', 
      type: 'actions',
      actions: [
        {
          action: 'toggleBlock',
          label: (item: User) => this.toggleBlockLabel(item),
          buttonClass: (item: User) => this.toggleBlockButtonClass(item)
        },
        {
          action: 'view',
          label:  (item: User) => this.viewLabel(),
          buttonClass: (item: User) => this.viewButtonClass()
        },
      ]
    }
  ];

  constructor(private service: adminService, private messageService: MessageService , private router:Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

 

  loadUsers(): void {
    this.userSubscription = this.service.getusers().subscribe({
      next: (res) => {
        if (res && res.users) {          
          this.users = res.users;
          console.log('this users are',this.users);
          
        }
      },
    });
  }

  blockUser(id:string,isBlocked: boolean): void {    
    this.userBlockSubscription = this.service.blockUser(id).subscribe({
      next: (res) => {
        this.updateUserStatus(id, !isBlocked);
      },
   
    });
  }
  updateUserStatus(id: string, isBlocked: boolean) {
    const user = this.users.find(t => t._id=== id); 
    if (user) {
      console.log('entered the if user');
    
      user.isblocked = isBlocked  
      }
  }


  onUserAction(event: {action: string, item: adminUser}): void {
     
    const { action, item } = event;
    if (action === 'toggleBlock') {
   
      this.blockUser(item._id, item.isblocked);
    } else if (action === 'view') {
      this.router.navigate(['/admin/userDetails', event.item._id]);
    }
  }

  toggleBlockLabel(item: User): string {
    return item.isblocked ? 'Unblock' : 'Block';
  }
  
  toggleBlockButtonClass(item: User): string {
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


  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.userBlockSubscription) {
      this.userBlockSubscription.unsubscribe();
    }
  }


}

import { Component,Input, OnInit  } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @Input() activeRoute!: string;
  isMobileMenuOpen = false;



  constructor(private authservice:AuthService , private confirmationService: ConfirmationService , private messageService: MessageService){}
  
  logout(): void {
    this.authservice.userlogout();
  }

  ngOnInit() {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Mobile menu toggled:', this.isMobileMenuOpen);  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-danger",
        acceptButtonStyleClass: "p-button-success", 
        accept: () => {
            this.logout()
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'logout successful' });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'cancelled' });
        }
    });
}



}

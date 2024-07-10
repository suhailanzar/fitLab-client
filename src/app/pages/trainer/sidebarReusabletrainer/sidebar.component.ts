import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  constructor(private authservice:AuthService , private confirmationService: ConfirmationService , private messageService: MessageService){}
  
  logout(): void {
    this.authservice.trainerlogout();
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptButtonStyleClass:"  text-slate-200 bg-green-800 px-2 py-1 me-3",
        rejectButtonStyleClass:"  text-slate-200 bg-red-800 px-2 py-1 me-3",
        accept: () => {
            this.logout()
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'logout successful' });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'cancelled' });
        }
    });
}

}

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  constructor(private messageService: MessageService) {}

  show(){
    this.messageService.add({ severity: 'contrast', summary: 'Get started', detail: 'signup to continue the journey' });
  }
}

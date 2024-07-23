import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private messageService:MessageService
  ){}

  handleError(error: any) {
    console.error('Full error:', error);

    let userMessage = 'An error occurred';

    if (error.error && error.error.message) {
      userMessage = error.error.message;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: userMessage,
      life: 1000 // Duration in milliseconds
    });
  }

}
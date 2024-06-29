import { Component, Input, OnInit, OnDestroy, SimpleChanges, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { Subscription } from 'rxjs';
import { Trainer } from '../../../core/models/trainer';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-userchat',
  templateUrl: './userchat.component.html',
  styleUrls: ['./userchat.component.css']
})
export class UserchatComponent implements OnInit, OnDestroy, OnChanges {
  @Input() trainerid!: string;
  @Input() trainer!: string;
  @Output() messageSent = new EventEmitter<void>();


  messages: any[] = [];
  newMessage: string = '';
  senderId: string | null;
  receiverId: string;
  roomId: string;
  messageSubscription!: Subscription;
  selectedtrainer!:any;

  constructor(private chatService: ChatService ,  private service:UserService,  private messageService: MessageService ,  private cdr: ChangeDetectorRef) {
    this.senderId = this.getUserId();
    this.receiverId = '';
    this.roomId = ''; 
  }

  ngOnInit(): void {
    this.selectedtrainer = this.trainer

    if (!this.senderId) {
      console.error('User ID not found');
      return;
    }

    this.receiverId = this.trainerid;
    
    this.roomId = this.generateRoomId(this.senderId, this.receiverId);

    // Join the room
    this.chatService.joinRoom(this.roomId);

    // Subscribe to incoming messages
    this.messageSubscription = this.chatService.receiveMessage().subscribe((message: any) => {
      const formattedMessage = {
        message: message.message,
        receiverId: message.receiverId,
        senderId: message.senderId,
        timestamp: message.timestamp,
        _id: message._id
      };
  
      this.messages.push(formattedMessage);
      this.cdr.detectChanges();  // Manually trigger change detection

    });
    
    
    this.loadMessages();

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trainerid']  && !changes['trainerid'].isFirstChange()) {
      this.receiverId = this.trainerid;
      this.roomId = this.generateRoomId(this.senderId!, this.receiverId);
      this.loadMessages();
    }
  }



  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.senderId) {      
      this.chatService.sendMessage(this.senderId, this.receiverId, this.newMessage);
      const formattedMessage = {
        message: this.newMessage,
        receiverId: this.receiverId,
        senderId:this.senderId,
        timestamp:Date.now(),
        _id: ""
      }
  
      this.messages.push(formattedMessage);
      this.newMessage = '';
      this.messageSent.emit(); 

    }
  }

  loadMessages(): void {
    console.log('entered the load messages');
    
    if (this.senderId && this.trainerid) {
      console.log('got the  sender or receiver id');

      this.chatService.getMessages(this.senderId, this.trainerid).subscribe((data: any) => {
        this.messages = data.messages;
        console.log('messages were',this.messages);
        
      });
    }else{
      console.log('no sender or receiver id');
      
    }
  }

  ngOnDestroy(): void {
    // Leave the room
    this.chatService.leaveRoom(this.roomId);

    // Unsubscribe from incoming messages
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  private getUserId(): string | null {
    const userString = localStorage.getItem('user');

    if (userString) {      
      try {
        const user = JSON.parse(userString);
        return user.id;
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  private generateRoomId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_');
  }
}
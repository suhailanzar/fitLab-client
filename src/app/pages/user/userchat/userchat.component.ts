import { Component, Input, OnInit, OnDestroy, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userchat',
  templateUrl: './userchat.component.html',
  styleUrls: ['./userchat.component.css']
})
export class UserchatComponent implements OnInit, OnDestroy, OnChanges {

  trainerid!: string;
  messages: any[] = [];
  newMessage: string = '';
  senderId: string | null = null;
  receiverId: string = '';
  roomId: string = '';
  messageSubscription!: Subscription;
  selectedtrainer: string = '';

  constructor(
    private chatService: ChatService,
    private service: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeChat();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trainer'] && !changes['trainer'].isFirstChange()) {
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
        senderId: this.senderId,
        timestamp: Date.now(),
        _id: ""
      };

      this.messages.push(formattedMessage);
      this.newMessage = '';
    }
  }

  loadMessages(): void {
    if (this.senderId && this.trainerid) {
      this.chatService.getMessages(this.senderId, this.trainerid).subscribe((data: any) => {
        this.messages = data.messages || [];
      }, error => {
        console.error('Error loading messages:', error);
        this.messages = [];
      });
    } else {
      console.log('No sender or receiver ID');
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

  private initializeChat(): void {
    this.senderId = this.getUserId();
    const trainerid = this.route.snapshot.paramMap.get('id');
    if (trainerid) {
      this.trainerid = trainerid;
    }

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

    });

    this.loadMessages();
  }

  private getUserId(): string | null {
    const userString = localStorage.getItem('user');
    console.log('User ID is', userString);

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

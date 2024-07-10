import { Component, Input, SimpleChanges, OnInit, OnDestroy, OnChanges, ViewEncapsulation } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { Subscription } from 'rxjs';
import { trainerService } from '../../../core/services/trainer.service';
import { MessageService } from 'primeng/api';
import { User } from '../../../core/models/user';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-traine-chat',
  templateUrl: './traine-chat.component.html',
  styleUrl: './traine-chat.component.css',
})
export class TraineChatComponent implements OnInit, OnDestroy, OnChanges {
  @Input() trainerid!: string;

  messages: any[] = [];
  unreadCounts: { [userId: string]: number } = {};
  newMessage: string = '';
  senderId: string | null;
  receiverId: string = '';
  roomId: string = '';
  messageSubscription!: Subscription;
  private clientsubscription: Subscription | null = null;
  clients!: User[];
  selectedUser!: User;

  constructor(
    private chatService: ChatService,
    private service: trainerService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.senderId = this.getTrainerId();
  }

  ngOnInit(): void {
    console.log('chat page init');

   

    this.loadClients();
    this.subscribeToMessages();

  }

  loadClients(): void {
    this.service.getClients().subscribe({
      next: (res) => {
        if (res) {
          this.clients = res.clients.map((client: any) => ({
            name: client.username,
            email: client.email,
            password: client.password,
            isblocked: client.isblocked,
            id: client._id,
          }));

          if (this.clients && this.clients.length > 0) {
            this.selectedUserFunction(this.clients[0].id);
          }
        }
      },
      error: (err) => {
        if (err && err.error.message) {
          this.messageService.add({
            severity: 'error',
            summary: 'Alert',
            detail: err.error.message,
          });
        }
      },
    });
  }

  selectedUserFunction(userid: any) {
    // Leave the current room if any
    if (this.roomId) {
      this.chatService.leaveRoom(this.roomId);
    }

    this.loadMessages()

    if (this.unreadCounts[userid] !== undefined) {
      this.unreadCounts[userid] = 0;
    }

    this.receiverId = userid;
    const selecteduser = this.clients.find((user) => user.id === userid);
    if (selecteduser) {
      this.selectedUser = selecteduser;
    }

    // Generate and join the new room
    this.roomId = this.generateRoomId(this.senderId!, this.receiverId);
    this.chatService.joinRoom(this.roomId);

    // Resubscribe to messages
    this.subscribeToMessages();

    this.loadMessages();
  }

  private subscribeToMessages() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.messageSubscription = this.chatService.receiveMessage().subscribe((message: any) => {
      const formattedMessage = {
        message: message.message,
        receiverId: message.receiverId,
        senderId: message.senderId,
        timestamp: message.timestamp,
        _id: message._id,
      };

      if (this.selectedUser.id !== message.receiverId) {
        this.unreadCounts[message.senderId] = (this.unreadCounts[message.senderId] || 0) + 1;
      }

      console.log('this.unreadCounts', this.unreadCounts);

      this.messages.push(formattedMessage);
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trainerid'] && !changes['trainerid'].firstChange) {
      this.receiverId = this.trainerid;
      this.selectedUserFunction(this.receiverId);
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
        _id: '',
      };

      this.messages.push(formattedMessage);
      this.newMessage = '';
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  loadMessages(): void {
    if (this.senderId && this.receiverId) {
      this.chatService.getMessages(this.senderId, this.receiverId).subscribe((data: any) => {
        this.messages = data.messages;
        this.cdr.detectChanges(); // Trigger change detection
      });
    } else {
      console.log('no sender or receiver id');
    }
  }

  ngOnDestroy(): void {
    if (this.roomId) {
      this.chatService.leaveRoom(this.roomId);
    }

    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.clientsubscription) {
      this.clientsubscription.unsubscribe();
    }
  }

  private getTrainerId(): string | null {
    const userString = localStorage.getItem('trainer');

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

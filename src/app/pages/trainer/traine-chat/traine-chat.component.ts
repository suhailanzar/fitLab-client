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
  newMessage: string = '';
  senderId: string | null;
  receiverId: string = '';
  roomId: string = '';
  messageSubscription!: Subscription;
  private clientsubscription: Subscription | null = null;
  clients!: User[];
  selectedUser!: User;
 unreadMessagesCount: number = 0;



  constructor(
    private chatService: ChatService,
    private service: trainerService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    this.senderId = this.getTrainerId();
    this.messages = [];

  }

  ngOnInit(): void {
    console.log('chat page init');

    this.messages = [];
    this.loadClients();
    this.subscribeToMessages();

  }

  loadClients(): void {
    console.log('entered the loadclients');

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

    });
    console.log('end of the loadclients');

  }

  selectedUserFunction(userid: any) {
    // Leave the current room if any
    if (this.roomId) {
      this.chatService.leaveRoom(this.roomId);
    }

    this.unreadMessagesCount = 0;

    // this.chatService.markMessagesAsRead(this.senderId, this.receiverId).subscribe(() => {
    //   // Messages marked as read
    // });

    // Clear the messages array to avoid showing previous user's messages
    this.messages = [];

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

    // Load messages for the selected user
    this.loadMessages();
  }


  private subscribeToMessages() {
    console.log('entered the loadclients');
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.messageSubscription = this.chatService.receiveMessage().subscribe((message: any) => {
      console.log('received message is',message);
      
      const formattedMessage = {
        message: message.message,
        receiverId: message.receiverId,
        senderId: message.senderId,
        timestamp: message.timestamp,
        isRead: message.isRead,
        _id: message._id,
      };

      if (!formattedMessage.isRead) {
        this.unreadMessagesCount++;
    }


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

      this.newMessage = ''

      if (!Array.isArray(this.messages)) {
        this.messages = []; // Ensure messages is always an array
      }

      this.messages.push(formattedMessage);
      this.newMessage = '';
      this.cdr.detectChanges();   
    }
  }

  loadMessages(): void {
    if (this.senderId && this.receiverId) {
      console.log('load messages send and receiver id is',this.senderId,this.receiverId);
      
      this.chatService.getMessagesTrainer(this.senderId, this.receiverId).subscribe((data: any) => {
        console.log('messages are', data);

        this.messages = data.messages || []; 
        this.cdr.detectChanges(); 
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

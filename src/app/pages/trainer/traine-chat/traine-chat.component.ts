
import { Component, Input, SimpleChanges, OnInit, OnDestroy, OnChanges, ViewEncapsulation } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { Subscription } from 'rxjs';
import { trainerService } from '../../../core/services/module-services/trainer.service';
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
  unreadMessageCounts: Map<string, { count: number, isRead: boolean }> = new Map();
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
            // Join all rooms
            this.joinAllRooms();

            // Select the first user
            this.selectedUserFunction(this.clients[0].id);
          }
        }
      },
    });
  }

  joinAllRooms(): void {
    if (this.senderId) {
      this.clients.forEach(client => {
        if (client.id) {
          const roomId = this.generateRoomId(this.senderId!, client.id);
          this.chatService.joinRoom(roomId);
          console.log('joined room for user and trainer:', roomId);
        } else {
          console.warn('Client without id encountered:', client);
        }
      });

    } else {
      console.warn('senderId is not set');
    }
  }

  selectedUserFunction(userid: any) {
    // Clear the messages array to avoid showing previous user's messages
    this.messages = [];

    this.unreadMessagesCount = this.unreadMessageCounts.get(userid)?.count || 0;
    if (this.unreadMessageCounts.has(userid)) {
      this.unreadMessageCounts.set(userid, { count: 0, isRead: true });
    }
    this.receiverId = userid;
    const selecteduser = this.clients.find((user) => user.id === userid);
    if (selecteduser) {
      this.selectedUser = selecteduser;
    }

    // Set the current room ID
    this.roomId = this.generateRoomId(this.senderId!, this.receiverId);

    this.subscribeToMessages();

    this.loadMessages();
  }

  private subscribeToMessages() {
    console.log('entered subscribeToMessages');
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.messageSubscription = this.chatService.receiveMessage().subscribe((message: any) => {
      console.log('received message is', message);

      const formattedMessage = {
        message: message.message,
        receiverId: message.receiverId,
        senderId: message.senderId,
        timestamp: message.timestamp,
        isRead: message.isRead,
        _id: message._id,
        roomId: message.roomId
      };

      console.log('room id from messages is',formattedMessage.roomId);
      console.log('room id from component is',this.roomId);
      

      // // Ensure the message is for the current room
      // if (formattedMessage.roomId !== this.roomId) {
      //   return;
      // }

      // if (formattedMessage.senderId !== this.receiverId) {
      //   const currentStatus = this.unreadMessageCounts.get(formattedMessage.senderId) || { count: 0, isRead: false };
      //   this.unreadMessageCounts.set(formattedMessage.senderId, { count: currentStatus.count + 1, isRead: false });
      // } else {
      //   formattedMessage.isRead = true;
      // }

      // this.messages.push(formattedMessage);
      // this.cdr.detectChanges(); // Manually trigger change detection
      

        // Ensure the message is for the current room
    if (formattedMessage.roomId !== this.roomId) {
      // Increase unread count for the sender if the message is not for the current room
      const currentStatus = this.unreadMessageCounts.get(formattedMessage.senderId) || { count: 0, isRead: false };
      this.unreadMessageCounts.set(formattedMessage.senderId, { count: currentStatus.count + 1, isRead: false });
      return;
    }

    // Mark message as read if it is for the current room
    if (formattedMessage.senderId === this.receiverId) {
      formattedMessage.isRead = true;
    }

    this.messages.push(formattedMessage);
    this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  getUnreadCountForUser(userId: string): number {
    return this.unreadMessageCounts.get(userId)?.count || 0;
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
        roomId: this.roomId
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

      this.chatService.getMessagesTrainer(this.senderId, this.receiverId).subscribe((data: any) => {

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


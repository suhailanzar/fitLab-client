// import { Component, Input, SimpleChanges, OnInit, OnDestroy, OnChanges, ViewEncapsulation } from '@angular/core';
// import { ChatService } from '../../../core/services/chat.service';
// import { Subscription } from 'rxjs';
// import { trainerService } from '../../../core/services/trainer.service';
// import { MessageService } from 'primeng/api';
// import { User } from '../../../core/models/user';
// import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef


// @Component({
//   selector: 'app-traine-chat',
//   templateUrl: './traine-chat.component.html',
//   styleUrl: './traine-chat.component.css',
//   // encapsulation: ViewEncapsulation.None

// })
// export class TraineChatComponent implements OnInit, OnDestroy, OnChanges {


//   @Input() trainerid!: string;

//   messages: any[] = [];
//   newMessage: string = '';
//   senderId: string | null;
//   receiverId: string;
//   roomId: string;
//   messageSubscription!: Subscription;
//   private clientsubscription : Subscription | null = null;
//   clients!:User[];
//   selectedUser!: User; 



//   constructor(private chatService: ChatService , private service:trainerService,  private messageService: MessageService, private cdr: ChangeDetectorRef) {
//     this.senderId = this.getTrainerId();
//     this.receiverId = '';
//     this.roomId = '';
//   }


//   ngOnInit(): void {
//     console.log('chat page init');
    

//     if (this.clients) { 
//       this.selectedUser = this.clients[0]; 
//       this.selectedUserFunction(this.selectedUser.id); 
//     }

 

//     this.service.getClients().subscribe({      
//       next:(res =>{

//         if(res){
//           this.clients = res.clients.map((client: any) => ({
//             name: client.username,
//             email: client.email,
//             password: client.password,
//             isblocked: client.isblocked,
//             id:client._id
//           }));  
          
          
//           console.log('clients details are',this.clients);          
           

//         }
//       }),error: (err =>{
//         if(err && err.error.message){
//           this.messageService.add({ severity: 'error', summary: 'Alert', detail: err.error.message });
          
//         }
//       })
//     })


//     if (!this.senderId) {
//       console.error('User ID not found');
//       return;
//     }


//     this.roomId = this.generateRoomId(this.senderId, this.receiverId);

//     // Join the room
//     this.chatService.joinRoom(this.roomId);

//     // Subscribe to incoming messages
//     this.messageSubscription = this.chatService.receiveMessage().subscribe((message: any) => {
//       const formattedMessage = {
//         message: message.message,
//         receiverId: message.receiverId,
//         senderId: message.senderId,
//         timestamp: message.timestamp,
//         _id: message._id
//       };
  
//       this.messages.push(formattedMessage);
//       this.cdr.detectChanges();  // Manually trigger change detection

//     });

      
//   }

//   selectedUserFunction(userid:any ){    
//     this.receiverId = userid
//     const selecteduser = this.clients.find(user => user.id === userid);
//     if (selecteduser) {
//         this.selectedUser= selecteduser
//     }
//     // Resubscribe to messages
//   this.subscribeToMessages();
//     this.loadMessages();

//   }

//   private subscribeToMessages() {
//     if (this.messageSubscription) {
//       this.messageSubscription.unsubscribe();
//     }
  
//     this.messageSubscription = this.chatService.receiveMessage().subscribe((message: any) => {
//       const formattedMessage = {
//         message: message.message,
//         receiverId: message.receiverId,
//         senderId: message.senderId,
//         timestamp: message.timestamp,
//         _id: message._id
//       };
  
//       this.messages.push(formattedMessage);
//       this.cdr.detectChanges();  // Manually trigger change detection
//     });
//   }

 


//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['trainerid']) {
//       this.receiverId = this.trainerid;

//     }
//   }

//   sendMessage(): void { 

//     if (this.newMessage.trim() !== '' && this.senderId) {
//       this.chatService.sendMessage(this.senderId, this.receiverId, this.newMessage);
//       const formattedMessage = {
//         message: this.newMessage,
//         receiverId: this.receiverId,
//         senderId:this.senderId,
//         timestamp:Date.now(),
//         _id: ""
//       }
  
//       this.messages.push(formattedMessage);
//       this.newMessage = '';
//     }
//   }

//   loadMessages(): void {
    
//     if (this.senderId && this.receiverId) {

//       this.chatService.getMessages(this.senderId, this.receiverId).subscribe((data: any) => {
//         this.messages = data.messages;
//         console.log('messages were',this.messages);
        
//       });
//     }else{
//       console.log('no sender or receiver id');
      
//     }
//   }

//   ngOnDestroy(): void {
//     // Leave the room
//     this.chatService.leaveRoom(this.roomId);

//     // Unsubscribe from incoming messages
//     if (this.messageSubscription) {
//       this.messageSubscription.unsubscribe();
//     }
//   }

//   private getTrainerId(): string | null {
//     const userString = localStorage.getItem('trainer');

//     if (userString) {
//       try {
//         const user = JSON.parse(userString);
//         return user._id;
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//         return null;
//       }
//     }
//     return null;
//   }

//   private generateRoomId(userId1: string, userId2: string): string {
//     return [userId1, userId2].sort().join('_');
//   }

// }






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

    if (!this.senderId) {
      console.error('Trainer ID not found');
      return;
    }

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

          console.log('clients details are', this.clients);

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
    this.receiverId = userid;
    const selecteduser = this.clients.find((user) => user.id === userid);
    if (selecteduser) {
      this.selectedUser = selecteduser;
    }

    // Leave the current room if any
    if (this.roomId) {
      this.chatService.leaveRoom(this.roomId);
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
        console.log('messages were', this.messages);
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
        return user._id;
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

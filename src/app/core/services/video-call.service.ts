import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../env/environment';
import { Observable, BehaviorSubject } from 'rxjs';

interface OfferMessage {
  offer: RTCSessionDescriptionInit;
  roomId: string;
}

interface AnswerMessage {
  answer: RTCSessionDescriptionInit;
  roomId: string;
}

interface IceCandidateMessage {
  candidate: RTCIceCandidate;
  roomId: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private socket: Socket;
  private _url = environment.BASE_URL;
  private _baseUrl = environment.BASE_URL;
  private currentRoom: string | null = null;
  private connectionStatus = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');

  constructor(private http: HttpClient) { 
    this.socket = this.initializeSocket();
  }


  private initializeSocket(): Socket {
    const socket = io(this._url, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('Successfully connected to socket server');
      this.connectionStatus.next('connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.connectionStatus.next('disconnected');
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
      this.connectionStatus.next('disconnected');
    });

    return socket;
  }


  activateSocket() {
    return this.http.get(`${this._baseUrl}activate`);
  }

  joinRoom(roomId: string) {
    console.log(`Joining room: ${roomId}`);
    this.socket.emit('joinRoom', roomId);
    this.currentRoom = roomId;
  }
  
  leaveRoom(roomId: string) {
    console.log(`Leaving room: ${roomId}`);
    this.socket.emit('leaveRoom', roomId);
    this.currentRoom = null;
  }

  getCurrentRoom(): string | null {
    return this.currentRoom;
  }


  sendOffer(offer: RTCSessionDescriptionInit, roomId: string): void {
    this.socket.emit('offer', offer, roomId);
    console.log("The offered room id is", roomId);
  };

  sendAnswer(answer: RTCSessionDescriptionInit, roomId: string): void {
    this.socket.emit('answer', answer, roomId);
    console.log("The answered room id is", roomId);
  };

  sendCandidate(candidate: RTCIceCandidate, roomId: string): void {
    this.socket.emit('candidate', candidate, roomId);
    console.log("The candidate room id is", roomId);
  };

  receiveOffer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('offer', (offer) => {
        observer.next(offer);
      });
    });
  };

  receiveAnswer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('answer', (answer) => {
        observer.next(answer);
      });
    });
  };

  receiveCandidate(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('candidate', (candidate) => {
        observer.next(candidate);
      });
    });
  };

}
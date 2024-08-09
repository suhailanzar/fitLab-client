import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { VideoCallService } from '../../../core/services/video-call.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-call-trainer',
  templateUrl: './video-call-trainer.component.html',
  styleUrls: ['./video-call-trainer.component.css']
})
export class VideoCallTrainerComponent implements OnInit , OnDestroy {


  senderId!: string;
  receiverId!: string;
  roomId: string = '';
  selectedUser!: User;

  private messageSubscription!: Subscription;
  private offerSubscription!: Subscription;
  private answerSubscription!: Subscription;
  private candidateSubscription!: Subscription

  private localStream!: MediaStream;
  private remoteStream!: MediaStream;

  private peerConnection: RTCPeerConnection | null = null;

  constructor(
    private videoCallService: VideoCallService,
    private route: ActivatedRoute,
  ) {}

  

  config = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };


  ngOnInit() {
    this.initializeCall();

    console.log('room id is ',this.roomId);
    console.log('sender id is ',this.senderId);
    console.log('reciever id is ',this.receiverId);
    

    
    this.offerSubscription = this.videoCallService.receiveOffer().subscribe(async (offer) => {
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.videoCallService.sendAnswer(answer, this.roomId);
      }
    });

    this.answerSubscription = this.videoCallService.receiveAnswer().subscribe(async (answer) => {
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    this.candidateSubscription = this.videoCallService.receiveCandidate().subscribe(async (candidate) => {
      if (this.peerConnection) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });


  }

 

  private initializeCall(): void {
    const senderId = this.route.snapshot.paramMap.get('id');
    if (senderId) this.senderId = senderId;

    this.receiverId = this.getTrainerId() as string;
    this.roomId = this.generateRoomId(this.senderId, this.receiverId);

    console.log('sender and receiver id and room id', this.senderId, this.receiverId, this.roomId);

    this.videoCallService.joinRoom(this.roomId);
  }

  private getTrainerId(): string | null {
    const userString = localStorage.getItem('trainer');
    console.log('trainer ID is', userString);

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


  async startCall() {
    this.createPeerConnection();
    // Request local media stream
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localStream = stream;
      stream.getTracks().forEach(track => this.peerConnection!.addTrack(track, stream));

      const localVideo: HTMLVideoElement = document.getElementById('localVideo') as HTMLVideoElement;
      localVideo.srcObject = stream;

      // Create offer and send it to the other peer
      const offer = await this.peerConnection!.createOffer();
      await this.peerConnection!.setLocalDescription(offer);
      this.videoCallService.sendOffer(this.peerConnection!.localDescription!, this.roomId);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  async answerCall() {
    this.createPeerConnection();
  };

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(this.config);

    this.peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        this.videoCallService.sendCandidate(candidate, this.roomId);
      }
    };

    this.peerConnection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      const remoteVideo: HTMLVideoElement = document.getElementById('remoteVideo') as HTMLVideoElement;
      console.log("remote video", remoteVideo);
      if (remoteVideo) {
        remoteVideo.srcObject = remoteStream;
      }
    };
    

    // Get local media stream and add tracks to peer connection
    const localVideo: HTMLVideoElement = document.getElementById('localVideo') as HTMLVideoElement;
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        stream.getTracks().forEach(track => this.peerConnection!.addTrack(track, stream));
        localVideo.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };



  endCall() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;

      // Stop all tracks in the local stream
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
      }

      const localVideo: any = document.getElementById('localVideo');
      localVideo.srcObject = null;

      const remoteVideo: any = document.getElementById('remoteVideo');
      remoteVideo.srcObject = null;


      this.videoCallService.leaveRoom(this.roomId);
    }
  };

  toggleCamera() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
    }
  };

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
    this.offerSubscription?.unsubscribe();
    this.answerSubscription?.unsubscribe();
    this.candidateSubscription?.unsubscribe();
    this.videoCallService.leaveRoom(this.roomId);
  };








  private generateRoomId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort().join('_');
  }
}
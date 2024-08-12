
import { io, Socket } from 'socket.io-client';

// Directly initialize the socket connection
export const socket: Socket = io('http://localhost:5000', {});

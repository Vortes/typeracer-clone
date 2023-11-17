import { io } from 'socket.io-client';

export const socket = io(process.env.DEVELOPMENT_MODE ?"http://localhost:3000" : "https://typeracer-clone-backend-iwcj.onrender.com");
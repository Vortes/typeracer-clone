import { io } from 'socket.io-client';

export const socket = io(process.env.DEVELOPMENT_MODE ? "https://typeracer-clone-backend-iwcj.onrender.com" : "http://localhost:3000");
import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_DEVELOPMENT_MODE ? "http://localhost:3000" : "https://typeracer-clone-backend-iwcj.onrender.com");
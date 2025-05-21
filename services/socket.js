import { io } from "socket.io-client";

const SOCKET_URL = "wss://<SEU_WEBSOCKET_URL>.railway.app"; // Altere para a URL do seu WebSocket

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

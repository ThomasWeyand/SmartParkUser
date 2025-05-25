import { io, Socket } from "socket.io-client";
import type { VagaSocketResponse, ExcludeSocketResponse } from '../types';

const SOCKET_URL = "https://smartparkwebsocket-production.up.railway.app";

interface ServerToClientEvents {
  notificacaoNovaVaga: (vaga: VagaSocketResponse) => void;
  notificacaoAlteracaoDeVaga: (vaga: VagaSocketResponse) => void;
  notificacaoExcluirVaga: (exclude: ExcludeSocketResponse) => void;
}

interface ClientToServerEvents { }

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
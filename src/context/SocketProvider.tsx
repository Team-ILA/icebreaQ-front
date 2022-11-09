import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import ServerToClientEvents from '../lib/socketio/events/ServerToClientEvents';
import ClientToServerEvents from '../lib/socketio/events/ClientToServerEvents';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `ws://${process.env.REACT_APP_SERVER_HOST}`
);

export const SocketContext = createContext<
  Socket<ServerToClientEvents, ClientToServerEvents>
>(io());

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

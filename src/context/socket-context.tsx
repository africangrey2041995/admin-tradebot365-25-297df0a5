
import React, { createContext, useContext, ReactNode } from "react";

interface SocketContextType {
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, data: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  // Mock socket functionality
  const connected = true;
  
  const connect = () => {
    console.log("Socket connected");
  };
  
  const disconnect = () => {
    console.log("Socket disconnected");
  };
  
  const emit = (event: string, data: any) => {
    console.log(`Emitting ${event} with data:`, data);
  };

  return (
    <SocketContext.Provider
      value={{
        connected,
        connect,
        disconnect,
        emit,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

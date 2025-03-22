
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface SocketContextType {
  isConnected: boolean;
  lastMessage: any | null;
  sendMessage: (message: any) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any | null>(null);

  // Mock socket connection
  useEffect(() => {
    console.log('Connecting to socket...');
    
    // Simulate connection after a delay
    const timer = setTimeout(() => {
      setIsConnected(true);
      console.log('Socket connected');
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      console.log('Socket disconnected');
    };
  }, []);

  const sendMessage = (message: any) => {
    if (!isConnected) {
      console.warn('Cannot send message, socket not connected');
      return;
    }
    
    console.log('Sending message:', message);
    // In a real implementation, you would send the message via the socket
    // For this mock, we just set it as the last message
    setLastMessage(message);
  };

  return (
    <SocketContext.Provider value={{ isConnected, lastMessage, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

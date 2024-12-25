import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_WS_URL || 'http://localhost:5000');
    setSocket(newSocket);

    // Fetch initial players data
    fetchPlayers();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('playerUpdated', (updatedPlayer) => {
      setPlayers(prev => 
        prev.map(player => 
          player._id === updatedPlayer._id ? updatedPlayer : player
        )
      );
    });
  }, [socket]);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/players`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, players }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export default WebSocketContext; 
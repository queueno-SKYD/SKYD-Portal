import React, { useState, useEffect } from 'react';
import "./style.css"

const NetworkStatusIndicator = () => {
  const [isConnected, setIsConnected] = useState(1);

  useEffect(() => {
    const handleConnectionChange = () => {
      const isOnline = navigator.onLine;
      setIsConnected(isOnline ? 3 : 2);
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (isConnected === 3) {
      timeout = setTimeout(() => {
        setIsConnected(1);
      }, 2000); // Change the time duration as needed
    }

    return () => clearTimeout(timeout);
  }, [isConnected]);

  return (
    <div className={`text-center normal-t ${isConnected === 3 ? "online-t" : isConnected === 2 ? "offline-t" : ""}`}>
      {isConnected === 3 ? "You are back online!" : isConnected === 2 && "You are currently offline"}
    </div>
  );
};

export default NetworkStatusIndicator;

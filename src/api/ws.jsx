// useWs.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAppContext } from "../context/app.context";

const useWs = (path) => {
  const { token } = useAppContext();
  const socketRef = useRef(null);

  useEffect(() => {
    const myPath = path ? `http://localhost:3001/${path}` : "http://localhost:3001";
    socketRef.current = io(myPath, {
      withCredentials: true,
      auth: {
        token: token
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [path, token]);

  return socketRef.current;
};

export default useWs;


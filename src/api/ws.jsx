import { io } from "socket.io-client";
import { useAppContext } from "../context/app.context";

const UseWs = (path) => {
  const { token } = useAppContext();
  const myPath = path ? `http://localhost:3001/${path}` : "http://localhost:3001"
  const socket = io(myPath, {
    withCredentials: true,
    auth: {
      token: token
    }
  });
  return (
    socket
  )
}

export default UseWs;

import { io } from "socket.io-client";
import { useLogin } from '../context/login.context';

const UseWs = (path) => {
  const { token } = useLogin();
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

import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: 2, // Set the maximum number of reconnection attempts to 2
    timeout: 10000,
    transport: ["websocket"],
  };

  return io(process.env.REACT_APP_BACKEND_URL, options);
};

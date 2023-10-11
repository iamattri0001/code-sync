import { io } from "socket.io-client";
import axios from "axios";
import toast from "react-hot-toast";
import toastSettings from "./constants/toastSettings";

export const initSocket = async () => {
  toast.promise(
    axios.get(process.env.REACT_APP_BACKEND_URL + "/api/active", {}),
    {
      loading: "Please wait, connecting to the server",
      error: "Couldn't establish connection with server",
      success: "Connected to server",
    },
    toastSettings
  );

  const options = {
    "force new connection": true,
    reconnectionAttempts: 2, // Set the maximum number of reconnection attempts to 2
    timeout: 10000,
    transport: ["websocket"],
  };

  return io(process.env.REACT_APP_BACKEND_URL, options);
};

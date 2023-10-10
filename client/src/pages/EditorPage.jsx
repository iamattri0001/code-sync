import React, { useEffect, useState, useRef } from "react";
import Aside from "../components/Aside";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { ACTION } from "../actions/socketEvents";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";

import toastSettings from "../constants/toastSettings";

const EditorPage = () => {
  const location = useLocation();
  if (!location.state) return <Navigate to={"/"} />;

  const socketRef = useRef(null);
  const reactNavigate = useNavigate();
  const { roomId } = useParams();

  const [activeUsers, setActiveUsers] = useState([
    // { socketId: 1, username: "Deepanshu Atri" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Deepanshu" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Deepanshu" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Attri" },
    // { socketId: 1, username: "Attri" },
  ]);

  useEffect(() => {
    async function init() {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleSocketError(err));
      socketRef.current.on("connect_failed", (err) => handleSocketError(err));

      socketRef.current.emit(ACTION.JOIN, {
        roomId,
        username: location.state?.username,
      });

      const handleSocketError = (err) => {
        console.error(err);
        toast.error("Socket connection failed, try again later", toastSettings);
        reactNavigate("/");
      };

      socketRef.current.on(ACTION.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username)
          toast.success(`${username} has joined`, toastSettings);
        setActiveUsers(clients);
      });

      socketRef.current.on(ACTION.DISCONNCTED, ({ socketId, username }) => {
        console.log(socketId, username); /// here...
      });
    }
    init();
  }, []);
  return (
    <div className="bg-primary-950 min-h-screen text-primary-50 flex">
      <Aside activeUsers={activeUsers} />
      <div className="bg-primary-600 flex-grow">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;

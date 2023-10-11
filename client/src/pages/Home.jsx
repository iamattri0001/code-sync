import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import toastSettings from "../constants/toastSettings";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setusername] = useState("");

  const usernameInputRef = useRef(null);
  const roomIdInputRef = useRef(null);

  const navigate = useNavigate();

  const createNewRoom = () => {
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created room ID", toastSettings);
  };

  const handleJoinClick = () => {
    if (roomId === "") {
      toast.error("Room ID is required", toastSettings);
      return;
    }
    if (username === "") {
      toast.error("Username is required", toastSettings);
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleArrowKey = (e) => {
    if (e.code === "ArrowUp") {
      e.preventDefault();
      if (roomIdInputRef.current) {
        roomIdInputRef.current.focus();
      }
    } else if (e.code === "ArrowDown") {
      e.preventDefault();
      if (usernameInputRef.current) {
        usernameInputRef.current.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-primary-50">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-dark-900 px-4 md:px-9 py-5 rounded-md">
        <h1 className="text-5xl text-primary-300 mb-3">Sync Script</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center justify-center flex-col gap-y-4"
        >
          <input
            ref={roomIdInputRef}
            onKeyDown={handleArrowKey}
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            autoCorrect="off"
            className="text-sm w-[226px] bg-transparent border-b outline-none focus:border-light-300 focus:placeholder:text-light-700 border-primary-100 px-2 py-1 transition-all"
          />
          <input
            ref={usernameInputRef}
            onKeyDown={handleArrowKey}
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Your username"
            className="text-sm w-[226px] bg-transparent border-b outline-none focus:border-light-300 focus:placeholder:text-light-700 border-primary-100 px-2 py-1 transition-all"
          />

          <button className="btn" onClick={handleJoinClick}>
            Join Now
          </button>
          <p className="text-primary-100">
            Don't have a Room ID?{" "}
            <span
              className="text-light-400 hover:text-light-300 cursor-pointer text-sm"
              onClick={createNewRoom}
            >
              Click here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;

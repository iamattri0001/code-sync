import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import toastSettings from "../constants/toastSettings";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setusername] = useState("");

  const navigate = useNavigate();

  const createNewRoom = (e) => {
    const id = uuidV4();
    setRoomId(id);
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

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center text-primary-50">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-primary-800 px-5 py-3  rounded">
        <h1 className="text-3xl">Code Sync</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center justify-center flex-col gap-y-4"
        >
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            autoCorrect="off"
            className="text-sm w-[226px] bg-transparent border outline-none focus:bg-primary-900 focus:border-primary-400105 border-primary-100 px-2 py-1 rounded-sm transition-all"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Your username"
            className="text-sm w-[226px] bg-transparent border outline-none focus:bg-primary-900 focus:border-primary-400105 border-primary-100 px-2 py-1 rounded-sm transition-all"
          />

          <button className="btn" onClick={handleJoinClick}>
            Join Now
          </button>
          <p>
            Want to create a new Room?{" "}
            <span
              className="text-primary-300 cursor-pointer text-sm"
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

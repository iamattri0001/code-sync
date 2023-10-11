import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActiveUsers from "./ActiveUsers";
import toast from "react-hot-toast";
import toastSettings from "../constants/toastSettings";

import Modal from "@mui/material/Modal";

const Aside = ({ activeUsers }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = async () => {
    try {
      await window.navigator.clipboard.writeText(roomId);
      toast.success("Copied to clipboard", toastSettings);
    } catch (err) {
      toast.error("Couldn't copy, try again", toastSettings);
      console.error(err);
    }
  };

  return (
    <div className="sm:w-[30vw] md:w-[25vw] lg:w-[15vw] bg-dark-800 flex flex-col">
      <div className="bg-dark-600 h-[10vh] px-2 text-primary-200 text-2xl flex items-center justify-center">
        <h1 className="text-lg md:text-xl lg:text-2xl text-center">
          Sync Script
        </h1>
      </div>
      <div className="flex-grow flex flex-col items-center py-4 justify-start gap-y-3">
        <span className="text-lg">Active Users</span>
        <ActiveUsers activeUsers={activeUsers} />
      </div>
      <div className="h-[15vh] flex flex-col md:flex-row justify-center items-center gap-y-3 md:gap-x-3">
        <button
          className="btn-secondary w-[70%] md:w-[40%]"
          onClick={handleOpen}
        >
          Leave
        </button>

        <button className="btn w-[70%] md:w-[40%]" onClick={handleCopy}>
          Copy ID
        </button>
      </div>
      <div className="absolute">
        <Modal open={open} onClose={handleClose}>
          <div className="bg-dark-900 text-primary-50 px-7 py-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-y-4">
            <p>Are you sure that you want to leave?</p>
            <div className="flex items-center justify-center gap-x-3">
              <button className="btn w-[54px]" onClick={() => navigate("/")}>
                Yes
              </button>
              <button className="btn-secondary w-[54px]" onClick={handleClose}>
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Aside;

import { useNavigate, useParams } from "react-router-dom";
import ActiveUsers from "./ActiveUsers";

const Aside = ({ activeUsers }) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  return (
    <div className="w-[13vw] bg-primary-900 flex flex-col">
      <div className="bg-primary-400 h-[15vh] text-primary-950 text-2xl flex items-center justify-center">
        Code-Sync
      </div>
      <div className="flex-grow flex flex-col items-center py-4 justify-start gap-y-3">
        <h4>Active Users</h4>
        <ActiveUsers activeUsers={activeUsers} />
      </div>
      <div className="h-[15vh] flex justify-center items-center gap-x-3">
        <button className="btn-secondary w-[40%]" onClick={() => navigate("/")}>
          Leave
        </button>
        <button
          className="btn w-[40%]"
          onClick={(e) => {
            window.navigator.clipboard.writeText(roomId);
            e.target.innerText = "Copied";
            e.target.classList.add("btn-disable");

            setTimeout(() => {
              e.target.innerText = "Copy ID";
              e.target.classList.remove("btn-disable");
            }, 1500);
          }}
        >
          Copy ID
        </button>
      </div>
    </div>
  );
};

export default Aside;

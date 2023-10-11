import Avatar from "react-avatar";
import { useLocation } from "react-router-dom";
const ActiveUsers = ({ activeUsers }) => {
  const location = useLocation();
  const { username } = location.state;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-x-3 gap-y-4 overflow-y-scroll overflow-x-hidden max-h-[60vh] px-4 py-4 bg-dark-900 rounded">
      {activeUsers.map((user, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-2"
          >
            <Avatar name={user.username} round size="42px" />
            <span
              className={`text-xs mt-1 text-center ${
                user.username === username ? `text-primary-300` : ``
              }`}
            >
              {user.username
                ? user.username.length > 5
                  ? user.username.substring(0, 5) + ".."
                  : user.username
                : "Unknown"}{" "}
              {user.username === username ? "(YOU)" : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveUsers;

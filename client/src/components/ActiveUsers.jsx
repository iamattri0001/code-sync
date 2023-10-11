import Avatar from "react-avatar";
const ActiveUsers = ({ activeUsers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 md:gap-x-7 gap-y-4 overflow-y-scroll overflow-x-hidden max-h-[60vh] px-4 py-4 bg-dark-900 rounded">
      {activeUsers.map((user, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-2"
          >
            <Avatar name={user.username} round size="42px" />
            <span className="text-xs">
              {user.username
                ? user.username.length > 8
                  ? user.username.substring(0, 8) + ".."
                  : user.username
                : "Unknown"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveUsers;

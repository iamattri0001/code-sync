import Avatar from "react-avatar";
const ActiveUsers = ({ activeUsers }) => {
  return (
    <div className="grid grid-cols-2 gap-x-7 gap-y-4 overflow-y-scroll overflow-x-auto max-h-[60vh] px-4 py-4 bg-primary-950 rounded">
      {activeUsers.map((user, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-2"
          >
            <Avatar name={user.username} round size="56px" />
            <span>
              {user.username
                ? user.username.length > 5
                  ? user.username.substring(0, 5) + ".."
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

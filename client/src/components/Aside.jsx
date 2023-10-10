import ActiveUsers from "./ActiveUsers";

const Aside = ({ activeUsers }) => {
  return (
    <div className="w-[13vw] bg-primary-900 flex flex-col">
      <div className="bg-primary-400 h-[15vh] text-primary-950 text-2xl flex items-center justify-center">
        Code-Sync
      </div>
      <div className="flex-grow flex flex-col items-center py-4 justify-start gap-y-3">
        <h4>Active Users</h4>
        <ActiveUsers activeUsers={activeUsers} />
      </div>
      <div className="h-[15vh] flex flex-col px-6 justify-center gap-y-3">
        <button className="btn">Copy Room ID</button>
        <button className="btn-secondary">Leave Room</button>
      </div>
    </div>
  );
};

export default Aside;

import Sidebar from "./components/Sidebar";

const AdminPanel = () => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <div className="h-18 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <h1 className="font-montserrat text-xl font-bold tracking-[2px] text-white">
              DASHBOARD
            </h1>
            <p className="font-montserrat text-[12px] tracking-wider text-white/25 mt-0.5">
              Overview of your content
            </p>
          </div>

          <button className="bg-floesky text-black font-montserrat font-bold text-xs px-4 py-2 tracking-wider rounded-sm">
            + ADD ITEM
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <p className="text-white/30 font-montserrat text-xs">
            Page content renders here.
          </p>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

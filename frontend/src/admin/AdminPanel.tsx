import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "../Components/Navbar/ThemeToggle";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "DASHBOARD",
    subtitle: "Overview of your content",
  },
  "/admin/products": {
    title: "PRODUCTS",
    subtitle: "Manage your product catalog",
  },
  "/admin/highlights": {
    title: "HIGHLIGHTS",
    subtitle: "Manage athlete highlight reels",
  },
  "/admin/reviews": {
    title: "REVIEWS",
    subtitle: "Manage customer reviews",
  },
  "/admin/order-steps": {
    title: "ORDER STEPS",
    subtitle: "Manage the how-to-order floe",
  },
};

const AdminPanel = () => {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] ?? pageMeta["/admin/dashboard"];

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="h-18 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="font-montserrat text-xl font-bold tracking-[2px] text-white">
              {meta.title}
            </h1>
            <p className="font-montserrat text-[12px] tracking-wider text-descText2 mt-0.5">
              {meta.subtitle}
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

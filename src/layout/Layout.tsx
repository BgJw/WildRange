import { Outlet } from "react-router-dom";
import mountainBg from "../assets/3.jpg";

const Layout = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="fixed inset-0 bg-cover z-0"
        style={{ backgroundImage: `url(${mountainBg})` }}
      />

      <div className="fixed inset-0 bg-black/30 z-10" />

      <main className="relative z-20 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

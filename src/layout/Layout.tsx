import { Outlet } from "react-router-dom";
import { useBackgroundTransition } from "../hooks/useBackgroundTransition";
import Header from "../components/header/Header";

const Layout = () => {
  const { currentBg, scale, blur, transitionDuration } = useBackgroundTransition();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div
        className="fixed inset-0 bg-cover bg-center z-0 transition-transform ease-out"
        style={{
          backgroundImage: `url(${currentBg})`,
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
          transitionDuration,
        }}
      />
      <Header />
      <main className="relative z-20 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
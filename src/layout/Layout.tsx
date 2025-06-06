import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import mountainBg from "../assets/3.jpg";
import aboutBg from "../assets/4.jpeg";
import bookBg from "../assets/2.jpg";

type Backgrounds = {
  [key: string]: string;
}
const backgrounds: Backgrounds = {
  "/": mountainBg,
  "/about": aboutBg,
  "/book": bookBg,
};


const Layout = () => {
  const location = useLocation();
  const [currentBg, setCurrentBg] = useState<string>(backgrounds[location.pathname] || mountainBg);
  const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
    const newBg = backgrounds[location.pathname] || mountainBg;

    if (newBg !== currentBg) {

      setIsTransitioning(true);

      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentBg(newBg);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [location.pathname]); 

 return (
    <div className="relative min-h-screen w-full overflow-hidden">

      <div
        className={`fixed inset-0 bg-cover bg-center z-0 transition-opacity duration-500 ease-in-out`}
        style={{
          backgroundImage: `url(${currentBg})`,
          filter: isTransitioning ? "blur(6px)" : "blur(0px)",
          opacity: isTransitioning ? 0.25 : 1,
        }}
      />

      <div className="fixed inset-0 bg-black/30 z-10" />

      <main className="relative z-20 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

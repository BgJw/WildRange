import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import aboutBg from "../assets/3.jpg";
import way2 from "../assets/way3.jpg";
import main from "../assets/main.png";

type Backgrounds = {
  [key: string]: string;
};

const backgrounds: Backgrounds = {
  "/": main,
  "/about": aboutBg,
  "/book": aboutBg,
  "/mountRoutes": way2,
};

const Layout = () => {
  const location = useLocation();
  const [currentBg, setCurrentBg] = useState<string>(backgrounds[location.pathname] || main);
  const [scale, setScale] = useState(1);
  const [blur, setBlur] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState("500ms");
  const prevPathRef = useRef(location.pathname);
  const scaleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (location.pathname === "/") {
      clearInterval(scaleIntervalRef.current!);
      setTransitionDuration("20000ms");
      setScale(1);

      let scaleVal = 1;
      scaleIntervalRef.current = setInterval(() => {
        scaleVal = Math.min(scaleVal + 0.01, 1.2);
        setScale(scaleVal);
      }, 200);

      setTimeout(() => {
        clearInterval(scaleIntervalRef.current!);
      }, 3000);
    }
  }, [location.pathname]);

  useEffect(() => {
    const newBg = backgrounds[location.pathname] || main;
    const prevPath = prevPathRef.current;
    const fromHome = prevPath === "/";
    const toHome = location.pathname === "/";

    if (fromHome && !toHome) {
      setScale(1.5);
      setBlur(8);
      setTransitionDuration("500ms");

      const timeout = setTimeout(() => {
        setCurrentBg(newBg);
        setScale(1);
        setBlur(0);
      }, 500);

      prevPathRef.current = location.pathname;
      return () => clearTimeout(timeout);
    }

    if (!fromHome && !toHome) {
      setBlur(8);
      setTransitionDuration("500ms");

      const timeout = setTimeout(() => {
        setCurrentBg(newBg);
        setBlur(0);
      }, 500);

      prevPathRef.current = location.pathname;
      return () => clearTimeout(timeout);
    }

if (toHome) {
  setTransitionDuration("20000ms");
  setBlur(8);

  const timeout = setTimeout(() => {
      setCurrentBg(newBg);
      setBlur(0);
    }, 500);

  prevPathRef.current = location.pathname;
  return () => clearTimeout(timeout);
}

  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center z-0 transition-transform ease-out"
        style={{
          backgroundImage: `url(${currentBg})`,
          filter: `blur(${blur}px)`,
          transform: `scale(${scale})`,
          transitionDuration,
        }}
      />

      <main className="relative z-20 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import aboutBg from "../assets/3.jpg";
import way2 from "../assets/way3.jpg";
import main from "../assets/main.png";

const FAST_TRANSITION = "500ms";
const SLOW_TRANSITION = "20000ms";
const MAX_BLUR = 8;
const HOME_SCALE = 1.2;
const BACKGROUND_TRANSITION_DELAY = 500;

const backgrounds: Record<string, string> = {
  "/": main,
  "/about": aboutBg,
  "/book": aboutBg,
  "/mountRoutes": way2,
};

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject();
  });

export const useBackgroundTransition = () => {
  const location = useLocation();
  const [currentBg, setCurrentBg] = useState(backgrounds[location.pathname] || main);
  const [scale, setScale] = useState(1);
  const [blur, setBlur] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(FAST_TRANSITION);
  const prevPathRef = useRef(location.pathname);
  const scaleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateHomeScale = () => {
    let scaleVal = 1;
    setTransitionDuration(SLOW_TRANSITION);
    setScale(scaleVal);

    const step = () => {
      scaleVal = Math.min(scaleVal + 0.002, HOME_SCALE);
      setScale(scaleVal);
      if (scaleVal < HOME_SCALE) {
        scaleTimeoutRef.current = setTimeout(step, 200);
      }
    };

    step();
  };

  const startTransition = (
    bg: string,
    {
      scaleStart = 1,
      duration = FAST_TRANSITION,
    }: { scaleStart?: number; duration?: string } = {}
  ) => {
    setTransitionDuration(duration);
    setBlur(MAX_BLUR);
    setScale(scaleStart);

    setTimeout(() => {
      setCurrentBg(bg);
      setBlur(0);
      setScale(1);
    }, BACKGROUND_TRANSITION_DELAY);
  };

  useEffect(() => {
    const newBg = backgrounds[location.pathname] || main;
    const prevPath = prevPathRef.current;
    const fromHome = prevPath === "/";
    const toHome = location.pathname === "/";

    preloadImage(newBg)
      .then(() => {
        if (toHome) {
          animateHomeScale(); 
        }

        if (fromHome && !toHome) {
          startTransition(newBg, { scaleStart: 1.5 });
        } else {
          startTransition(newBg);
        }
      })
      .catch(() => {
        setCurrentBg(newBg);
        setBlur(0);
        setScale(1);
      });

    prevPathRef.current = location.pathname;

    return () => {
      if (scaleTimeoutRef.current) clearTimeout(scaleTimeoutRef.current);
    };
  }, [location.pathname]);

  return { currentBg, scale, blur, transitionDuration };
};

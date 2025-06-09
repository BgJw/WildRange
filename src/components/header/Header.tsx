// src/components/Header.tsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-30 px-2 md:px-8 py-4 flex justify-between items-center bg-transparent text-white">
      <div className="text-2xl font-bold tracking-wide">MountainWay</div>

      <nav className="flex gap-6 text-md md:text-lg">
        <Link to="/" className="hover:text-gray-300 transition duration-200">Main</Link>
        <Link to="/mountRoutes" className="hover:text-gray-300 transition duration-200">Routes</Link>
        <Link to="/about" className="hover:text-gray-300 transition duration-200">About us</Link>
        <Link to="/gallery" className="hover:text-gray-300 transition duration-200">Gallery</Link>
      </nav>
    </header>
  );
};

export default Header;

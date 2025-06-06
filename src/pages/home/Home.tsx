import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="relative z-30 flex flex-col items-center justify-center text-center h-full px-6 text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Feel the Call of the Mountains</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          Expeditions, nature, inspiration. <br />Discover the best mountain routes.
        </p>
        <div className="flex gap-4">
          <Link to={'/mountRoutes'} className="text-lg px-6 py-3 text-white border-white bg-white/10 hover:bg-white/20 hover:text-black transition">
            View Routes
          </Link>
          <Link to={'/book'} className="text-lg px-6 py-3 text-white border-white bg-white/10 hover:bg-white/20 hover:text-black transition">
            Book a trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

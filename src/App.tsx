import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layout/Layout";

import "./App.css";

const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const MountRoutes = lazy(() => import("./pages/mountRoutes/MountRoutes"));
const Book = lazy(() => import("./pages/book/Book"));
const NotFound = lazy(() => import("./pages/notFound/NotFound"));

const App = () => {
  return (
    <Suspense fallback={    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-10 pointer-events-none">
      <div className="text-white text-xl animate-pulse">
        Загрузка...
      </div>
    </div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="mountRoutes" element={<MountRoutes />} />
          <Route path="book" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

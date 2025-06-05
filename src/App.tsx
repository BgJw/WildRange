import { Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import NotFound from './pages/notFound/NotFound';
import Home from './pages/home/Home';
import MounthRoutes from './pages/mountRoutes/MountRoutes';
import Book from './pages/book/Book';
import Layout from './layout/Layout';

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="mountRoutes" element={<MounthRoutes />} />
        <Route path="book" element={<Book />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

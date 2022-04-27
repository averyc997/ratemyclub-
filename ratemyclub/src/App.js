import './index.scss';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import CreateClub from './pages/createclub';
import Club from './pages/club';
import Categories from './pages/categories';
import Error from './pages/error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateClub />} />
        <Route path="/club/:id" element={<Club />} />\
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

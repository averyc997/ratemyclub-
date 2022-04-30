import './index.scss';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import CreateClub from './pages/createclub';
import Club from './pages/club';
import Search from './pages/search';
import Categories from './pages/categories';
import Error from './pages/error';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateClub />} />
        <Route path="/search/:id" element={<Search />} />
        <Route path="/club/:id" element={<Club />} />\
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  );
};

export default App;

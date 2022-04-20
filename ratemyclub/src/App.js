import './index.scss';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/index';
import CreateClub from './pages/createclub';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element= { <Home />} />
            <Route path="/create" element= { <CreateClub />} />
        </Routes>
        <Footer />
    </Router>
  );
};

export default App;

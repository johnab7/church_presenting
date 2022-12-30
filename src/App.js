import React from 'react';
import './App.css';
import Admin from "./components/admin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Live from "./components/live"
function App() {
  return (
    <div className="App">
           <Router>
                <Routes>
                <Route path='/' element={<Admin />} />
                <Route path='/live' element={<Live />} />
                </Routes>
            </Router>
    </div>
  );
}

export default App;

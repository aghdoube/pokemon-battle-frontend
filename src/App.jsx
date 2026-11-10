import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import Roster from "./pages/Roster";
import Battle from "./pages/Battle";
import Leaderboard from "./pages/Leaderboard";
import { Toaster } from "react-hot-toast"; 

const App = () => (
  <Router>
    <Navbar />
    <Toaster /> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
      <Route path="/roster" element={<Roster />} />
      <Route path="/battle" element={<Battle />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  </Router>
);

export default App;

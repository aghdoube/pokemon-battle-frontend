import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex justify-around">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        <li><Link to="/roster" className="hover:underline">My Roster</Link></li>
        <li><Link to="/battle" className="hover:underline">Battle</Link></li>
        <li><Link to="/leaderboard" className="hover:underline">Leaderboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

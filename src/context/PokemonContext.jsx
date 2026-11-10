import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [roster, setRoster] = useState(JSON.parse(localStorage.getItem("roster")) || []);
  const [battleResult, setBattleResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Temporär auskommentiert, damit wir das Design sehen können:
    // axios.get("http://localhost:5000/api/leaderboard")
    //   .then((res) => setLeaderboard(res.data))
    //   .catch((err) => console.error(err));

    // Feste Testdaten für die Bestenliste einfügen:
    setLeaderboard([
      { id: 1, name: "Hayat", score: 9999 },
      { id: 2, name: "Ash Ketchum", score: 8500 },
      { id: 3, name: "Gary Oak", score: 7200 }
    ]);
  }, []);


  const addToRoster = (pokemon) => {
    if (roster.length < 6) {
      const newRoster = [...roster, pokemon];
      setRoster(newRoster);
      localStorage.setItem("roster", JSON.stringify(newRoster));
      toast.success(`${pokemon.name} has been added to your roster!`);
    } else {
      toast.error("You can only have 6 Pokémon in your roster.");
    }
  };

  const removeFromRoster = (name) => {
    const newRoster = roster.filter((p) => p.name !== name);
    setRoster(newRoster);
    localStorage.setItem("roster", JSON.stringify(newRoster));
  };

  return (
    <PokemonContext.Provider value={{ roster, addToRoster, removeFromRoster, battleResult, setBattleResult, leaderboard }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);

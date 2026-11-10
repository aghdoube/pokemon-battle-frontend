import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonStats, setPokemonStats] = useState({});

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => {
        const pokemonData = res.data.results;
        setPokemonList(pokemonData);

        pokemonData.forEach((pokemon, index) => {
          axios.get(pokemon.url)
            .then((res) => {
              const attackStat = res.data.stats.find(
                (stat) => stat.stat.name === "attack"
              )?.base_stat || 0;
              setPokemonStats((prevStats) => ({
                ...prevStats,
                [index]: attackStat,
              }));
            })
            .catch((err) => console.error(`Error fetching stats for ${pokemon.name}`, err));
        });
      })
      .catch((err) => console.error("Error fetching Pokémon list", err));
  }, []);

  return (
   <div className="p-5">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">🛡️ Pokémon Battle Arena ⚔️</h1>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300">
          <p className="text-lg">
            Welcome to <strong>Pokémon Battle Arena</strong>, where your favorite Pokémon go head-to-head in intense battles!
          </p>
          <p className="mt-2">
            Build your ultimate team, analyze stats, and challenge opponents to become the ultimate Pokémon Master. 
            Every choice you make determines your path to victory. Will you rise to the challenge and prove your strength?
          </p>
          <p className="mt-2 font-semibold text-center">Choose wisely—every attack matters! Ready to battle?</p>
        </div>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <Link to={`/pokemon/${index + 1}`} key={index}>
            <Card 
              name={pokemon.name} 
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              attack={pokemonStats[index]}  
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { usePokemon } from "../context/PokemonContext";
import Button from "../components/Button";

const Roster = () => {
  const { roster, removeFromRoster } = usePokemon();

  // Helper function to capitalize the first letter of each word
  const capitalize = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Helper function to format stat names
  const formatStatName = (statName) => {
    const statMap = {
      "hp": "HP",
      "attack": "Attack",
      "defense": "Defense",
      "special-attack": "Sp. Atk",
      "special-defense": "Sp. Def",
      "speed": "Speed"
    };
    return statMap[statName] || statName;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-700 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Your Pokémon Roster</h1>
      <p className="mb-6 text-lg">Pokémon in roster: <span className="font-bold">{roster.length}/6</span></p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {roster.map((pokemon, index) => (
          <div 
            key={`${pokemon.name}-${pokemon.id || index}`}
            className="bg-gradient-to-b from-blue-600 to-blue-900 rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-2 text-center">{capitalize(pokemon.name)}</h2>
              
              <div className="flex justify-center">
                <img 
                  src={pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default} 
                  alt={pokemon.name}
                  className="w-40 h-40 object-contain mb-3"
                />
              </div>
              
              <div className="flex justify-center space-x-2 mb-3">
                {pokemon.types.map((type, idx) => (
                  <span 
                    key={idx} 
                    className={`px-3 py-1 rounded-full text-xs font-semibold bg-${type.type.name} text-white`}
                  >
                    {capitalize(type.type.name)}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                {pokemon.stats.map((stat, idx) => (
                  <div key={idx} className="bg-blue-800 p-2 rounded">
                    <span className="font-semibold">{formatStatName(stat.stat.name)}:</span> {stat.base_stat}
                  </div>
                ))}
                <div className="bg-blue-800 p-2 rounded">
                  <span className="font-semibold">Weight:</span> {pokemon.weight / 10} kg
                </div>
                <div className="bg-blue-800 p-2 rounded">
                  <span className="font-semibold">Height:</span> {pokemon.height / 10} m
                </div>
              </div>
              
              <div className="mt-auto text-center">
                <Button
                  text="Remove from Roster"
                  onClick={() => removeFromRoster(pokemon.name)}
                  className="bg-red-600 hover:bg-red-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {roster.length === 0 && (
        <div className="mt-8 bg-blue-800 p-6 rounded-lg text-center">
          <p className="text-xl">Your roster is empty. Add some Pokémon!</p>
        </div>
      )}
    </div>
  );
};

export default Roster;
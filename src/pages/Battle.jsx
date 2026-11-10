import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePokemon } from "../context/PokemonContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const Battle = () => {
  const { roster, setBattleResult } = usePokemon();
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleOutcome, setBattleOutcome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [battleCompleted, setBattleCompleted] = useState(false);
  const [attacksRevealed, setAttacksRevealed] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100); 
  const [enemyHealth, setEnemyHealth] = useState(100); 
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 151) + 1;
    console.log("Loading enemy pokemon with ID:", randomId);
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => {
        console.log("Enemy pokemon loaded:", res.data);
        setEnemyPokemon(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading enemy pokemon:", err);
        setError("Failed to load enemy Pokemon");
        setLoading(false);
      });
  }, []);

  const startBattle = () => {
    console.log("Battle started with roster:", roster);
    console.log("Enemy pokemon:", enemyPokemon);
    
    if (!roster.length) {
      setBattleOutcome("You need at least one Pokemon in your roster!");
      return;
    }
    
    if (!enemyPokemon) {
      setBattleOutcome("Enemy Pokemon not loaded yet!");
      return;
    }

    const player = roster[0];
    console.log("Player pokemon stats:", player.stats);
    console.log("Enemy pokemon stats:", enemyPokemon.stats);
    
    const playerAttack = player.stats?.find(s => s.stat.name === "attack")?.base_stat || 0;
    const enemyAttack = enemyPokemon.stats?.find(s => s.stat.name === "attack")?.base_stat || 0;
    
    console.log(`Battle: ${player.name}(${playerAttack}) vs ${enemyPokemon.name}(${enemyAttack})`);
    
    if (playerAttack > enemyAttack) {
      setBattleOutcome("You Won!");
      setBattleResult("win");
      setEnemyHealth(0); 
    } else {
      setBattleOutcome("You Lost!");
      setBattleResult("loss");
      setPlayerHealth(0); 
    }
    
    setBattleCompleted(true);
    setAttacksRevealed(true);
  };

  const goToLeaderboard = () => {
    console.log("Navigating to leaderboard...");
    navigate("/leaderboard");
  };

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

  if (loading) return <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <p className="ml-3 text-white">Loading enemy Pokemon...</p>
  </div>;
  
  if (error) return <div className="bg-red-100 text-red-800 p-4 rounded-lg">{error}</div>;

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-700 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 animate-pulse">⚔ Pokémon Battle Arena ⚔</h1>
      
      <div className="flex flex-col md:flex-row gap-8 mb-6 w-full justify-center">
        {roster.length > 0 ? (
          <div className="flex-1 max-w-md bg-gradient-to-b from-blue-600 to-blue-900 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-center">{capitalize(roster[0].name)}</h2>
            <div className="flex justify-center">
              <img 
                src={roster[0].sprites.other?.["official-artwork"]?.front_default || roster[0].sprites.front_default} 
                alt={roster[0].name}
                className="w-40 h-40 object-contain mb-2"
              />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-center space-x-2 mb-2">
                {roster[0].types.map((type, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-xs font-semibold bg-${type.type.name} text-white`}>
                    {capitalize(type.type.name)}
                  </span>
                ))}
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${playerHealth}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mb-2">{playerHealth}/100 HP</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              {roster[0].stats.map((stat, index) => (
                <div key={index} className="bg-blue-800 p-2 rounded">
                  <span className="font-semibold">{formatStatName(stat.stat.name)}:</span> {stat.base_stat}
                </div>
              ))}
              <div className="bg-blue-800 p-2 rounded">
                <span className="font-semibold">Weight:</span> {roster[0].weight / 10} kg
              </div>
              <div className="bg-blue-800 p-2 rounded">
                <span className="font-semibold">Height:</span> {roster[0].height / 10} m
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-800">You need to add Pokemon to your roster first!</p>
          </div>
        )}
        
        {enemyPokemon && (
          <div className="flex-1 max-w-md bg-gradient-to-b from-red-600 to-red-900 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-center">{capitalize(enemyPokemon.name)}</h2>
            <div className="flex justify-center">
              <img 
                src={enemyPokemon.sprites.other?.["official-artwork"]?.front_default || enemyPokemon.sprites.front_default} 
                alt={enemyPokemon.name}
                className="w-40 h-40 object-contain mb-2"
              />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-center space-x-2 mb-2">
                {enemyPokemon.types.map((type, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-xs font-semibold bg-${type.type.name} text-white`}>
                    {capitalize(type.type.name)}
                  </span>
                ))}
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
                <div
                  className="bg-red-500 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${enemyHealth}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mb-2">{enemyHealth}/100 HP</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              {enemyPokemon.stats.map((stat, index) => (
                <div key={index} className="bg-red-800 p-2 rounded">
                  <span className="font-semibold">{formatStatName(stat.stat.name)}:</span> {stat.base_stat}
                </div>
              ))}
              <div className="bg-red-800 p-2 rounded">
                <span className="font-semibold">Weight:</span> {enemyPokemon.weight / 10} kg
              </div>
              <div className="bg-red-800 p-2 rounded">
                <span className="font-semibold">Height:</span> {enemyPokemon.height / 10} m
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!battleCompleted ? (
        <div className="flex flex-col items-center">
          <p className="mb-4 text-center">Ready to battle? Click the button below to start!</p>
          <Button text="Start Battle" onClick={startBattle} />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <div className={`text-2xl font-bold mb-4 p-4 rounded-lg ${battleOutcome.includes("Won") ? "bg-green-800 text-white" : "bg-red-800 text-white"}`}>
            {battleOutcome}
          </div>
          
          <div className="bg-gray-800 text-white p-4 rounded-lg mb-4 text-center">
            <p className="text-lg font-bold mb-2">Battle Results:</p>
            <p>Your {capitalize(roster[0].name)}'s Attack: {roster[0].stats?.find(s => s.stat.name === "attack")?.base_stat || "N/A"}</p>
            <p>Enemy {capitalize(enemyPokemon.name)}'s Attack: {enemyPokemon.stats?.find(s => s.stat.name === "attack")?.base_stat || "N/A"}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              text="Save to Leaderboard" 
              onClick={goToLeaderboard} 
            />
            <Button 
              text="Battle Again" 
              onClick={() => window.location.reload()} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Battle;
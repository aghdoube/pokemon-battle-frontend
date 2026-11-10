import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePokemon } from "../context/PokemonContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { toast } from "react-hot-toast"; 

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToRoster } = usePokemon();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        console.log("Pokemon data loaded:", res.data);
        setPokemon(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading pokemon:", err);
        setError("Failed to load Pokemon data");
        setLoading(false);
      });
  }, [id]);

  const handleAddToRoster = () => {
    console.log("Adding to roster:", pokemon);
    if (pokemon) {
      addToRoster(pokemon);
      toast.success(`${pokemon.name} has been added to your roster!`); 
    }
  };

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const attackStat = pokemon?.stats?.find(s => s.stat.name === "attack")?.base_stat || "N/A";

  return (
    <div className="flex justify-center items-center h-screen">
      {pokemon && (
        <Card name={pokemon.name} image={pokemon.sprites.front_default}>
          <p>Type: {pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p>Abilities: {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
          <p>Attack: {attackStat}</p>
          <Button text="Add to Roster" onClick={handleAddToRoster} />
        </Card>
      )}
    </div>
  );
};

export default PokemonDetails;

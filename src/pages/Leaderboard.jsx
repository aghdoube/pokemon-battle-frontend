import React, { useEffect, useState } from "react";
import { usePokemon } from "../context/PokemonContext";
import axios from "axios";
import Button from "../components/Button";

const Leaderboard = () => {
  const { leaderboard, battleResult } = usePokemon();
  const [username, setUsername] = useState("");
  const [localLeaderboard, setLocalLeaderboard] = useState([]);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  const refreshLeaderboard = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/leaderboard")
      .then((res) => {
        console.log("Leaderboard data:", res.data);
        setLocalLeaderboard(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard data");
        setLoading(false);
      });
  };

  const saveScore = () => {
    if (!username.trim()) {
      alert("Please enter your name");
      return;
    }

    const score = battleResult === "win" ? 100 : 50;
    
    setLoading(true);
    axios.post("http://localhost:5000/api/leaderboard", { username, score })
      .then((res) => {
        console.log("Score saved:", res.data);
        setScoreSaved(true);
        refreshLeaderboard(); 
      })
      .catch((err) => {
        console.error("Error saving score:", err);
        alert("Failed to save score. Please try again.");
        setLoading(false);
      });
  };

  const sortedLeaderboard = [...localLeaderboard].sort((a, b) => b.score - a.score);

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-700 to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 animate-pulse">🏆 Pokémon Battle Leaderboard 🏆</h1>
      
      <div className="max-w-3xl w-full bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        {!scoreSaved ? (
          <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Save Your Score</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded p-2 flex-grow text-white"
              />
              <Button 
                text={loading && !localLeaderboard.length ? "Saving..." : "Save Score"} 
                onClick={saveScore}
                disabled={loading && !localLeaderboard.length || !username.trim()}
              />
            </div>
            {battleResult && (
              <p className="mt-2">
                Your battle result: 
                <span className={`font-bold ml-2 ${battleResult === "win" ? "text-green-300" : "text-red-300"}`}>
                  {battleResult === "win" ? "Victory! (100 points)" : "Defeat (50 points)"}
                </span>
              </p>
            )}
          </div>
        ) : (
          <div className="bg-green-900 bg-opacity-50 p-4 rounded-lg mb-6 text-center">
            <p className="text-green-300 font-semibold">Score saved successfully!</p>
            <Button 
              text="Submit Another Score" 
              onClick={() => {
                setScoreSaved(false);
                setUsername("");
              }}
              className="mt-2"
            />
          </div>
        )}

        <div className="bg-gray-700 bg-opacity-30 rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4 bg-blue-800 bg-opacity-70 flex items-center justify-between">
            <span>⚔ Top Trainers ⚔</span>
            {loading && !scoreSaved && (
              <span className="text-sm font-normal animate-pulse">Loading...</span>
            )}
          </h2>
          
          {loading && !scoreSaved && localLeaderboard.length === 0 ? (
            <div className="p-4 text-center">Loading leaderboard data...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-300">{error}</div>
          ) : sortedLeaderboard.length === 0 ? (
            <div className="p-4 text-center">No scores yet. Be the first to add your score!</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 bg-opacity-50">
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Trainer</th>
                  <th className="p-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((entry, index) => (
                  <tr 
                    key={entry._id || index} 
                    className={`border-t border-gray-700 ${
                      index === 0 
                      ? ' bg-opacity-30' 
                      : index === 1 
                        ? ' bg-opacity-30' 
                        : index === 2 
                          ? ' bg-opacity-30' 
                          : ''
                    } hover:bg-cyan-900 hover:bg-opacity-30 transition-colors`}
                    
                  >
                    <td className="p-3 font-medium">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td className="p-3">{entry.username}</td>
                    <td className="p-3 text-right font-bold">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          <div className="p-4 bg-gray-800 bg-opacity-50 flex justify-between items-center">
            <p className="text-sm text-gray-300">
              {sortedLeaderboard.length > 0 ? `${sortedLeaderboard.length} trainers ranked` : "No trainers ranked yet"}
            </p>
            <Button 
              text="Refresh Rankings" 
              onClick={refreshLeaderboard} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
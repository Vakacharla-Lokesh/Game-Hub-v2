import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import Sidebar from "../Sidebar";
import GameCard from "../GameCard";
import { useEffect, useState } from "react";
import { allGames } from "../../api/GameService";

export default function HomePage() {
  const [games, setGames] = useState([]);

  const handleLoadGames = async () => {
    try {
      const data = await allGames();
      setGames(data);
      console.log("game data:", data);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    }
  };
  useEffect(() => {
    handleLoadGames();
  }, []);

  return (
    <div className="flex bg-black text-yellow-400">
      <Header />
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <iframe
          className="w-full h-[300px] mb-6"
          src="https://www.youtube.com/embed/Xm5i5kbIXzc"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* <CategoryBlock games={games} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {games.map(game => <GameCard key={game.game_id} game={game} />)}
        </div> */}

        <Footer />
      </div>
    </div>
  );
}

// src/pages/Game.jsx
import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../layout/Footer';
import { allGames } from "../../api/GameService";
import { Link } from 'react-router-dom';


export default function Game() {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    try {
      const data = await allGames();
      setGames(data);
    } catch (error) {
      console.error('Failed to load games:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-yellow-400">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {/* Hero Section */}
        <section className="w-full mb-10">
          <h1 className="text-4xl font-bold mb-4 text-center">🔥 Latest Game Highlight</h1>
          <div className="aspect-video w-full max-w-4xl mx-auto">
            <iframe
              className="w-full h-full rounded-xl border border-yellow-500"
              src="https://www.youtube.com/embed/Xm5i5kbIXzc"
              title="Featured Game"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Genre Tags */}
        <section className="flex flex-wrap gap-4 justify-center mb-10">
          {["Shooting", "Multiplayer", "Racing", "Arcade", "Puzzle", "Simulation", "Adventure", "Sports", "Survival", "Action"].map((genre) => (
            <button
              key={genre}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
            >
              {genre}
            </button>
          ))}
        </section>

        {/* Load Games Button */}
        <div className="text-center mb-10">
          <button
            onClick={loadGames}
            className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            🎮 Load All Games
          </button>
        </div>

        {/* All Games Display */}
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.game_id}
              className="bg-[#1a1a1a] border border-yellow-700 p-4 rounded-lg shadow hover:shadow-xl transition hover:-translate-y-1"
            >
              <img
                src={game.image_url}
                alt={game.title}
                className="w-full h-48 object-cover rounded mb-4 border border-yellow-400"
              />
              <h2 className="text-xl font-bold mb-2">{game.title}</h2>
              <p className="text-sm text-gray-300 mb-2">🎯 {game.genre}</p>
              <p className="text-sm mb-4">⭐ {game.rating}</p>
              <p className="text-sm mb-4 line-clamp-3">{game.description}</p>
              <div className="text-center">
                        <Link
                to={`/games/${game.game_id}`}
                className="inline-block bg-yellow-600 text-black px-4 py-2 rounded hover:bg-yellow-700 transition"
                >
                ▶ Play Now
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Advertisement Section */}
        <section className="mt-16 text-center border-t border-yellow-700 pt-10">
          <h2 className="text-2xl font-bold mb-4">🌟 Sponsored</h2>
          <div className="bg-yellow-300 text-black p-4 rounded-lg max-w-3xl mx-auto shadow">
            <p className="font-semibold">Ad Space - Promote your game or brand here!</p>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

// src/pages/GameInfo.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gameById } from "../../api/GameService";
import Sidebar from '../Sidebar';
import Footer from '../layout/Footer';

export default function GameInfo() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  const loadGameDetails = async () => {
    try {
      const data = await gameById(id);
      setGame(data);
    } catch (error) {
      console.error('Error loading game details:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-yellow-400">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="text-center mb-10">
          <button
            onClick={loadGameDetails}
            className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            🔍 Load Game Details
          </button>
        </div>

        {game && (
          <section className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">{game.title}</h1>
            <div className="mb-6 text-center">
              <div
                className="w-full aspect-video border border-yellow-600 rounded overflow-hidden"
                dangerouslySetInnerHTML={{ __html: game.embed_code }}
              />
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <p className="mb-2 text-lg">🎮 <strong>Genre:</strong> {game.genre}</p>
              <p className="mb-2 text-lg">⭐ <strong>Rating:</strong> {game.rating}</p>
              <p className="mb-4"><strong>Description:</strong> {game.description}</p>
              <p className="mb-4"><strong>How to Play:</strong> {game.instructions}</p>
              <div className="text-center mt-6">
                <a
                  href={game.embed_code.match(/src=\"(.*?)\"/)?.[1] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-600 text-black px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
                >
                  ▶ Play in Fullscreen
                </a>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>
    </div>
  );
}

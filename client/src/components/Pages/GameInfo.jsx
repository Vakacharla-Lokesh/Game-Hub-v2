// src/pages/GameInfo.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gameById } from "../../api/GameService";
import Footer from "../layout/Footer";
import {
  ChevronLeft,
  Play,
  Star,
  Share2,
  Users,
  Trophy,
  Gamepad2,
} from "lucide-react";

export default function GameInfo() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const data = await gameById(id);
        setGame(data);
      } catch (err) {
        console.error("Failed to load game:", err);
        setError("Failed to load game. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadGameDetails();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: `Check out this amazing game: ${game.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center relative">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Loading Epic Game Info...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-red-900 text-red-400">
        <div className="text-center p-8 border border-red-500/30 bg-red-900/20 rounded-xl">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-900 to-yellow-800 text-yellow-400">
        <div className="text-center p-8 border border-yellow-500/30 bg-yellow-900/20 rounded-xl">
          <div className="text-5xl mb-4">🎮</div>
          <p className="text-xl font-semibold">Game not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated FX */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <main className="relative z-10 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/games"
            className="flex items-center text-purple-400 hover:text-purple-300 transition font-semibold bg-purple-900/20 px-4 py-2 rounded-full border border-purple-500/30"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center text-white hover:text-yellow-300 transition font-semibold bg-yellow-500/10 border border-yellow-400/40 px-4 py-2 rounded-full"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Game
          </button>
        </div>

        {/* Game Preview */}
        <div className="relative overflow-hidden rounded-3xl mb-10 border border-white/10 shadow-2xl">
          <img
            src={game.image_url}
            alt={game.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/60 shadow-lg">
            <Star
              className="w-6 h-6 text-yellow-400 animate-pulse"
              fill="currentColor"
            />
            <span className="text-white text-xl font-bold">{game.rating}</span>
            <span className="text-gray-300 text-sm">/5.0</span>
          </div>
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            {game.isHot && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-5 py-2 rounded-full font-bold animate-pulse border border-red-400/60 shadow-lg">
                🔥 TRENDING
              </span>
            )}
            {game.isNew && (
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-5 py-2 rounded-full font-bold border border-green-400/60 shadow-lg">
                ✨ NEW RELEASE
              </span>
            )}
          </div>
        </div>

        {/* Game Info Section */}
        <section className="max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
            {game.title}
          </h1>

          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            {game.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="flex items-center gap-4 p-5 bg-purple-900/10 border border-purple-500/30 rounded-xl">
              <Gamepad2 className="w-6 h-6 text-purple-300" />
              <div>
                <p className="text-xs text-purple-300">Category</p>
                <p className="font-bold text-lg text-white">
                  {game.category || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-blue-900/10 border border-blue-500/30 rounded-xl">
              <Trophy className="w-6 h-6 text-blue-300" />
              <div>
                <p className="text-xs text-blue-300">Genre</p>
                <p className="font-bold text-lg text-white">
                  {game.genre || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-orange-900/10 border border-orange-500/30 rounded-xl">
              <Users className="w-6 h-6 text-orange-300" />
              <div>
                <p className="text-xs text-orange-300">Players</p>
                <p className="font-bold text-lg text-white">
                  {game.players || "Single/Multiplayer"}
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
            Instructions
          </h1>
          <p className="text-gray-300 text-xl mb-10 leading-relaxed">
            {game.instructions}
          </p>

          <div className="flex flex-col items-center justify-center mb-6">
            <a
              href={game.iframe_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold px-12 py-5 rounded-2xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 border border-purple-400/50 text-2xl"
            >
              <Play className="mr-3" />
              Play Now
            </a>
          </div>
        </section>
      </main>

      <Footer className="mt-16" />
    </div>
  );
}

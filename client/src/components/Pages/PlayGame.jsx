import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gameById } from "../../api/GameService";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { addUserFavoriteGames } from "../../api/userService";
import { decodeToken, getUserId } from "../../api/tokenService";

import { ChevronLeft, Share2, Heart } from "lucide-react";

const PlayGame = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [embedCode, setEmbedCode] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const data = await gameById(id);
        setGame(data);
        console.log("play game data: ", data);
        setEmbedCode(data.embed_code);
      } catch (err) {
        console.error("Failed to load game:", err);
        setError("Failed to load game. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadGameDetails();
  }, []);

  const handleLiked = async () => {
    if (decodeToken()) {
      setIsLiked(!isLiked);
      const userId = getUserId();
      try {
        const response = await addUserFavoriteGames(userId, id, !isLiked);

        console.log(response);
      } catch (error) {
        console.log(`Error in liking game: ${error}`);
      }
    } else {
      navigate("/login");
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="text-center relative">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="w-16 h-16 border-4 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-4 -mt-12"></div>
          <p className="text-2xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Loading Epic Game Info...
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-red-900 text-red-400">
        <div className="text-center p-8 border border-red-500/30 bg-red-900/20 rounded-xl backdrop-blur-sm">
          <div className="text-6xl mb-6 animate-pulse">⚠️</div>
          <p className="text-2xl font-bold">{error}</p>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-yellow-900 to-yellow-800 text-yellow-400">
        <div className="text-center p-8 border border-yellow-500/30 bg-yellow-900/20 rounded-xl backdrop-blur-sm">
          <div className="text-6xl mb-6 animate-bounce">🎮</div>
          <p className="text-2xl font-bold">Game not found.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        ❌ {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-purple-900 text-white relative overflow-hidden">
        <div className="flex items-center justify-between mb-8 mt-4 ml-3 mr-3">
          <Link
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-300 hover:text-purple-200 transition-all duration-300 font-bold bg-gradient-to-r from-purple-900/30 to-violet-900/30 px-6 py-3 rounded-full border border-purple-400/40 backdrop-blur-sm hover:border-purple-300/60 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLiked}
              className={`flex items-center transition-all duration-300 font-semibold px-4 py-3 rounded-full border backdrop-blur-sm transform hover:scale-105 ${
                isLiked
                  ? "text-red-300 bg-red-900/20 border-red-400/40 hover:border-red-300/60"
                  : "text-gray-300 bg-gray-900/20 border-gray-400/40 hover:border-gray-300/60"
              }`}
            >
              <Heart
                className={`w-5 h-5 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              {isLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center text-yellow-300 hover:text-yellow-200 transition-all duration-300 font-semibold bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-400/40 px-6 py-3 rounded-full backdrop-blur-sm hover:border-yellow-300/60 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/30"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Game
            </button>
          </div>
        </div>
        {/* Enhanced Animated FX */}
        <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-pink-500 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>

        {/* Floating Gaming Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute top-40 right-32 w-4 h-4 bg-violet-400 rounded-full animate-bounce delay-500 opacity-30"></div>
          <div className="absolute bottom-40 left-32 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-1000 opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-1500 opacity-30"></div>
        </div>

        <main className="flex items-center justify-center mt-5">
          <div dangerouslySetInnerHTML={{ __html: embedCode }} />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default PlayGame;

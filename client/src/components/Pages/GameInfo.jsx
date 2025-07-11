// src/pages/GameInfo.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gameByGenres, gameById } from "../../api/GameService";
import Footer from "../layout/Footer";
import {
  ChevronLeft,
  Play,
  Star,
  Share2,
  Users,
  Trophy,
  Gamepad2,
  ChevronRight,
  Clock,
  Zap,
  Eye,
  Heart,
  Download,
  Shield,
  Sparkles,
} from "lucide-react";
import { decodeToken, getUserId } from "../../api/tokenService";
import { addUserFavoriteGames } from "../../api/userService";
import Header from "../layout/Header";

export default function GameInfo() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarGames, setSimilarGames] = useState([]);
  const [visibleGames, setVisibleGames] = useState(6);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const data = await gameById(id);
        setGame(data);

        // console.log("game data: ", data);

        const similar = await gameByGenres(data.genre);

        // console.log(similar);

        setSimilarGames(similar);
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

  const handleLoadMore = () => {
    setVisibleGames((prev) => prev + 6);
  };

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

  const handlePlay = (game_id) => {
    console.log("Playing game:", game_id);
    navigate(`/game/${game_id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

        <main className="relative z-10 px-6 py-8">
          {/* Enhanced Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/games"
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

          {/* Enhanced Game Preview */}
          <div className="relative overflow-hidden rounded-3xl mb-12 border border-white/10 shadow-2xl group">
            <img
              src={game.image_url}
              alt={game.title}
              className="w-full h-[28rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

            {/* Enhanced Rating Badge */}
            <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-black/90 backdrop-blur-md rounded-2xl px-8 py-4 border border-yellow-400/60 shadow-2xl">
              <Star
                className="w-7 h-7 text-yellow-400 animate-pulse"
                fill="currentColor"
              />
              <span className="text-white text-2xl font-black tracking-wide">
                {game.rating}
              </span>
              <span className="text-gray-300 text-base font-medium"></span>
            </div>

            {/* Enhanced Status Badges */}
            <div className="absolute top-8 right-8 flex flex-col gap-4">
              {game.isHot && (
                <span className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white text-sm font-black px-6 py-3 rounded-full animate-pulse border border-red-400/60 shadow-2xl backdrop-blur-sm">
                  🔥 TRENDING NOW
                </span>
              )}
              {game.isNew && (
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white text-sm font-black px-6 py-3 rounded-full border border-green-400/60 shadow-2xl backdrop-blur-sm">
                  ✨ NEW RELEASE
                </span>
              )}
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/10 backdrop-blur-md rounded-full p-6 border border-white/20">
                <Play
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Game Info Section */}
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                {game.title}
              </h1>

              <div className="flex justify-center items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Eye className="w-5 h-5" />
                  <span className="font-semibold">12.5K views</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Updated 2 days ago</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">High Performance</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-8 mb-12 border border-white/10 backdrop-blur-sm">
              <p className="text-gray-300 text-xl leading-relaxed text-center font-medium">
                {game.description}
              </p>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="group flex items-center gap-4 p-6 bg-gradient-to-r from-purple-900/20 to-violet-900/20 border border-purple-400/30 rounded-2xl backdrop-blur-sm hover:border-purple-300/50 transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Gamepad2 className="w-8 h-8 text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-purple-300 font-semibold uppercase tracking-wider">
                    Category
                  </p>
                  <p className="font-black text-xl text-white">
                    {game.category || "N/A"}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-400/30 rounded-2xl backdrop-blur-sm hover:border-blue-300/50 transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Trophy className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-blue-300 font-semibold uppercase tracking-wider">
                    Genre
                  </p>
                  <p className="font-black text-xl text-white">
                    {game.genre || "N/A"}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-400/30 rounded-2xl backdrop-blur-sm hover:border-orange-300/50 transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-orange-500/20 rounded-full">
                  <Users className="w-8 h-8 text-orange-300" />
                </div>
                <div>
                  <p className="text-sm text-orange-300 font-semibold uppercase tracking-wider">
                    Players
                  </p>
                  <p className="font-black text-xl text-white">
                    {game.players || "Single/Multiplayer"}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Instructions Section */}
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-8 mb-12 border border-white/10 backdrop-blur-sm">
              <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                Game Instructions
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                {game.instructions}
              </p>
            </div>

            {/* Enhanced Play Button */}
            <div className="flex flex-col items-center justify-center mb-16">
              <a
                href={`/playgames/${game.game_id}`}
                rel="noopener noreferrer"
                className="group relative inline-flex items-center bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 text-white font-black px-16 py-6 rounded-3xl hover:from-purple-500 hover:via-violet-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-purple-500/50 border border-purple-400/50 text-2xl tracking-wide"
              >
                <Play
                  className="mr-4 w-8 h-8"
                  fill="currentColor"
                />
                PLAY NOW
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>

              <div className="mt-6 flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Save for Later</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Safe & Secure</span>
                </button>
              </div>
            </div>

            {/* Similar Games Section */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Similar Games You'll Love
                </h3>
                <p className="text-gray-400 text-lg font-medium">
                  Discover more amazing games in the same category
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {similarGames.slice(0, visibleGames).map((similarGame) => (
                  <div
                    key={similarGame.id}
                    className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  >
                    <div className="relative">
                      <img
                        src={similarGame.image_url}
                        alt={similarGame.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Game Status */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {similarGame.isHot && (
                          <span className="bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                            🔥 HOT
                          </span>
                        )}
                        {similarGame.isNew && (
                          <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ✨ NEW
                          </span>
                        )}
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                          <Play
                            className="w-8 h-8 text-white"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        {similarGame.title}
                      </h4>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400 font-medium">
                          {similarGame.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                          />
                          <span className="text-white font-bold">
                            {similarGame.rating}
                          </span>
                        </div>
                      </div>

                      <button
                        className="w-full bg-gradient-to-r from-purple-600/80 to-violet-600/80 text-white font-bold py-3 rounded-xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105"
                        onClick={() => {
                          handlePlay(similarGame.game_id);
                        }}
                      >
                        Play Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleGames < similarGames.length && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold px-8 py-4 rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-gray-500/50 shadow-lg"
                  >
                    Load More Games
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              )}
            </section>
          </section>
        </main>

        <Footer className="mt-16" />
      </div>
    </>
  );
}

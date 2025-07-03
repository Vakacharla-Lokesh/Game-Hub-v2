import React, { useState, useEffect, useRef, useCallback } from "react";
import { allGames, getGenres, getGamePerGenres } from "../../api/GameService";
import Sidebar from "../Sidebar";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router-dom";

import {
  ChevronRight,
  Star,
  TrendingUp,
  Crown,
  Sparkles,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import GameCard from "../GameCard";

const genres = getGenres();

const categories = [
  "Trending Now",
  "New Releases",
  "Popular This Week",
  "Editor's Choice",
  "Multiplayer",
  "Single Player",
  "Free to Play",
  "Premium Games",
];

// Sample video trailers - replace with your actual video URLs
const featuredTrailers = [
  {
    id: 1,
    title: "Epic Adventure Quest",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://picsum.photos/1920/1080?random=1",
    description:
      "Embark on the ultimate adventure in this stunning open-world RPG",
  },
  {
    id: 2,
    title: "Cyberpunk Racing",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://picsum.photos/1920/1080?random=2",
    description: "High-speed racing in a neon-lit cyberpunk world",
  },
  {
    id: 3,
    title: "Space Warriors",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/1920/1080?random=3",
    description: "Epic space battles await in this action-packed shooter",
  },
];

export default function Game() {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredGame, setFeaturedGame] = useState(null);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  const trendingRef = useRef(null);
  const newReleasesRef = useRef(null);
  const popularRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    loadGames();
  }, []);

  // Auto-cycle through trailers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrailerIndex((prev) => (prev + 1) % featuredTrailers.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const loadGames = async () => {
    setLoading(true);
    try {
      const data = await allGames();
      console.log("Loaded games:", data);
      setGames(data);
      setFeaturedGame(data[0]);
    } catch (error) {
      console.error("Failed to load games:", error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300 // 300px from bottom
    ) {
      setVisibleCount((prev) => {
        // Only load more if there are more games to show
        if (prev < games.length) {
          return Math.min(prev + 12, games.length);
        }
        return prev;
      });
    }
  }, [games.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50 flex justify-center items-center">
        <div className="relative">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="relative text-white text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent font-bold">
              Loading Epic Games...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(games)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-violet-900 flex justify-center items-center">
        <div className="text-red-400 text-xl">❌ Invalid games data</div>
      </div>
    );
  }

  const handlePlay = (game) => {
    console.log("Playing game:", game);
    navigate(`/game/${game.game_id}`);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedGenre(null);

    if (category === "Trending Now" && trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (category === "New Releases" && newReleasesRef.current) {
      newReleasesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (category === "Popular This Week" && popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredGames = games.filter((game) =>
    selectedGenre ? game.genre === selectedGenre : true
  );

  const trendingGames = games.filter((g) => g.isHot).slice(0, 8);
  const newGames = games.filter((g) => g.isNew).slice(0, 6);
  // For "All Games" section, show only up to visibleCount games
  const popularGames = games.slice(0, visibleCount);

  const currentTrailer = featuredTrailers[currentTrailerIndex];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-6 text-white relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, purple 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          className="w-full h-full"
        ></div>
      </div>

      <Sidebar
        onGenreClick={handleGenreClick}
        onCategoryClick={handleCategoryClick}
        selectedGenre={selectedGenre}
        selectedCategory={selectedCategory}
      />

      <main className="flex-1 overflow-auto relative z-10">
        {/* Video Trailer Section */}

        <section className="relative h-[70vh] overflow-hidden mb-12">
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              key={currentTrailer.id}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            >
              <source
                src={currentTrailer.videoUrl}
                type="video/mp4"
              />
              <img
                src={currentTrailer.thumbnail}
                alt={currentTrailer.title}
                className="w-full h-full object-cover"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          {/* Video Controls */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 border border-purple-500/30"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Trailer Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {featuredTrailers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTrailerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTrailerIndex
                    ? "bg-purple-400 scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <div className="relative z-10 flex items-center h-full px-12">
            <div className="max-w-3xl">
              <div className="mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-violet-500 text-white text-sm px-4 py-2 rounded-full font-bold border border-purple-400/50">
                  🎮 Featured Trailer
                </span>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
                {currentTrailer.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                {currentTrailer.description}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handlePlay(currentTrailer)}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold px-8 py-4 rounded-full hover:from-purple-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 border border-purple-400/50"
                >
                  <Play
                    className="w-6 h-6 inline mr-2"
                    fill="currentColor"
                  />
                  Play Now
                </button>
                <button className="bg-black/30 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full hover:bg-black/50 transition-all duration-300 border border-purple-400/30">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="px-8 pb-8 relative">
          {(selectedGenre || selectedCategory) && (
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                {selectedGenre || selectedCategory}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"></div>
            </div>
          )}

          {!selectedGenre && !selectedCategory && trendingGames.length > 0 && (
            <section
              ref={trendingRef}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-red-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Trending Now
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-red-400 via-purple-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingGames.map((game) => (
                  <GameCard
                    key={`trending-${game.id}`}
                    game={game}
                    onPlay={handlePlay}
                  />
                ))}
              </div>
            </section>
          )}

          {!selectedGenre && !selectedCategory && newGames.length > 0 && (
            <section
              ref={newReleasesRef}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  New Releases
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-green-400 via-purple-400 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newGames.map((game) => (
                  <GameCard
                    key={`new-${game.id}`}
                    game={game}
                    onPlay={handlePlay}
                  />
                ))}
              </div>
            </section>
          )}

          <section ref={popularRef}>
            {!selectedGenre && !selectedCategory && (
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  All Games
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-400 to-yellow-600 to-transparent"></div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(selectedGenre || selectedCategory
                ? filteredGames
                : popularGames
              ).map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </section>
        </div>

        <Footer className="fixed bottom-0 left-0 w-full z-50" />
      </main>
    </div>
  );
}

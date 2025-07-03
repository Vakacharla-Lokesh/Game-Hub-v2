import { gameById, getGenres } from "../../api/GameService";
import Sidebar from "../Sidebar";
import Footer from "../layout/Footer";
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Play,
  Star,
  TrendingUp,
  Gamepad2,
  Zap,
  Crown,
  Target,
  Sword,
  Car,
  Puzzle,
  Music,
  Sparkles,
} from "lucide-react";
import GameCard from "../GameCard";

// const gameById = async (id) => {
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   return {
//     id,
//     title: `Epic Game ${id}`,
//     genre: ['Action', 'Adventure', 'RPG'][Math.floor(Math.random() * 3)],
//     rating: (4 + Math.random()).toFixed(1),
//     description: 'An incredible gaming experience that will keep you entertained for hours.',
//     instructions: 'Use WASD to move, Space to jump, Mouse to look around.',
//     embed_code: '<iframe src="https://example.com/game" width="800" height="600"></iframe>',
//     thumbnail: `https://picsum.photos/400/300?random=${id}`,
//     isHot: Math.random() > 0.7,
//     isNew: Math.random() > 0.8
//   };
// };
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
// src/pages/GameInfo.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gameById } from "../../api/GameService";
import Footer from "../layout/Footer";
import { ChevronLeft, Play, Star, ExternalLink, Share2, Heart, Eye, Clock, Users, Trophy, Gamepad2 } from "lucide-react";

export default function GameInfo() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredGame, setFeaturedGame] = useState(null);
  
  const trendingRef = useRef(null);
  const newReleasesRef = useRef(null);
  const popularRef = useRef(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    setLoading(true);
    try {
      // Load multiple games
      const gamePromises = Array.from({ length: 24 }, (_, i) => gameById(i + 1));
      const gameData = await Promise.all(gamePromises);
      setGames(gameData);
      setFeaturedGame(gameData[0]);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (game) => {
    // Navigate to game detail page or open game modal
    console.log('Playing game:', game);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedGenre(null);
    
    // Scroll to relevant section
    if (category === 'Trending Now' && trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'New Releases' && newReleasesRef.current) {
      newReleasesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Popular This Week' && popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredGames = games.filter(game => {
    if (selectedGenre) return game.genre === selectedGenre;
    return true;
  });

  const trendingGames = games.filter(game => game.isHot).slice(0, 8);
  const newGames = games.filter(game => game.isNew).slice(0, 6);
  const popularGames = games.slice(0, 12);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black">
        <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400 text-xl font-semibold">Loading Epic Games...</p>
          </div>
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

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400">
        Game not found.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar 
        onGenreClick={handleGenreClick}
        onCategoryClick={handleCategoryClick}
        selectedGenre={selectedGenre}
        selectedCategory={selectedCategory}
      />
      
      <main className="flex-1 overflow-auto">
        {/* Hero Section */}
        {featuredGame && !selectedGenre && !selectedCategory && (
          <section className="relative h-96 overflow-hidden mb-12">
            <div className="absolute inset-0">
              <img 
                src={featuredGame.thumbnail} 
                alt={featuredGame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>

            {/* Game Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-4 leading-tight">
                  {game.title}
                </h1>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{game.description}</p>
                
                {/* Enhanced Info Tags */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-purple-600/20 text-purple-200 px-4 py-3 rounded-xl border border-purple-500/50">
                    <Gamepad2 className="w-5 h-5" />
                    <span className="font-semibold">{game.category || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-600/20 text-blue-200 px-4 py-3 rounded-xl border border-blue-500/50">
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">{game.genre || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-600/20 text-orange-200 px-4 py-3 rounded-xl border border-orange-500/50 col-span-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Players: {game.players || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div className="mt-8 space-y-4">
                <a
                  href={game.iframe_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-10 py-5 rounded-full hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl border border-yellow-400/70 text-xl group"
                >
                  <Play className="w-6 h-6 inline mr-2" fill="currentColor" />
                  Play Now
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="px-8 pb-8">
          {/* Section Title */}
          {(selectedGenre || selectedCategory) && (
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                {selectedGenre || selectedCategory}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          )}

          {/* Trending Section */}
          {!selectedGenre && !selectedCategory && trendingGames.length > 0 && (
            <section ref={trendingRef} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold text-yellow-400">Trending Now</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingGames.map(game => (
                  <GameCard key={`trending-${game.id}`} game={game} onPlay={handlePlay} />
                ))}
              </div>
            </section>
          )}

          {/* New Releases Section */}
          {!selectedGenre && !selectedCategory && newGames.length > 0 && (
            <section ref={newReleasesRef} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-green-500" />
                <h2 className="text-3xl font-bold text-yellow-400">New Releases</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newGames.map(game => (
                  <GameCard key={`new-${game.id}`} game={game} onPlay={handlePlay} />
                ))}
              </div>
            </section>
          )}

          {/* Main Games Grid */}
          <section ref={popularRef}>
            {!selectedGenre && !selectedCategory && (
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-yellow-400">All Games</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(selectedGenre || selectedCategory ? filteredGames : popularGames).map(game => (
                <GameCard key={game.id} game={game} onPlay={handlePlay} />
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Similar Games Section with 3 rows */}
                <div className="mb-20">
                  <div className="text-center mb-16">
                    <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-6">
                      Similar Games You Might Love
                    </h2>
                    <p className="text-gray-400 text-xl">Discover more amazing games handpicked just for you</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {similarGames.map((similarGame, index) => (
                      <div key={similarGame.id} className="group relative">
                        {/* Floating background effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative bg-gradient-to-br from-gray-800/80 to-black/80 rounded-2xl overflow-hidden shadow-2xl border border-purple-700/40 backdrop-blur-md hover:scale-105 transition-all duration-500 group">
                          <div className="relative overflow-hidden">
                            <img
                              src={similarGame.image_url}
                              alt={similarGame.title}
                              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
                            
                            {/* Enhanced rating badge */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-3 py-2 border border-yellow-400/50">
                              <Star className="w-4 h-4 text-yellow-400 animate-pulse" fill="currentColor" />
                              <span className="text-white text-sm font-bold">{similarGame.rating}</span>
                            </div>
                            
                            {/* Enhanced status badges */}
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                              {similarGame.isHot && (
                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold border border-red-400/50 shadow-lg animate-pulse">
                                  🔥 HOT
                                </span>
                              )}
                              {similarGame.isNew && (
                                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold border border-green-400/50 shadow-lg">
                                  ✨ NEW
                                </span>
                              )}
                            </div>
        
                            {/* Play overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                                <Play className="w-8 h-8 text-white" fill="currentColor" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                              {similarGame.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600/50">
                                {similarGame.category}
                              </span>
                              <Link
                                to={`/game/${similarGame.id}`}
                                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold bg-purple-900/20 px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-900/40 group/link"
                              >
                                Play Now
                                <ExternalLink className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
        
                  {/* Call to action for more games */}
                  <div className="text-center mt-16">
                    <Link
                      to="/"
                      className="inline-flex items-center bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold px-10 py-5 rounded-2xl hover:from-purple-500 hover:to-violet-500 transition-all duration-300 transform hover:scale-105 shadow-xl border border-purple-500/50"
                    >
                      <Gamepad2 className="w-6 h-6 mr-3" />
                      Explore All Games
                      <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
                    </Link>
                  </div>
                </div>
        
                <Footer />
      </main>
    </div>
  );
}
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
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock similar games data - replace with actual API call
  const similarGames = [
    {
      id: 1,
      title: "Space Adventure",
      image_url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
      rating: 4.8,
      category: "Action",
      isHot: true
    },
    {
      id: 2,
      title: "Puzzle Master",
      image_url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
      rating: 4.6,
      category: "Puzzle",
      isNew: true
    },
    {
      id: 3,
      title: "Racing Thunder",
      image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      rating: 4.7,
      category: "Racing"
    },
    {
      id: 4,
      title: "Strategy Empire",
      image_url: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop",
      rating: 4.9,
      category: "Strategy"
    },
    {
      id: 5,
      title: "Cyber Warrior",
      image_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      rating: 4.5,
      category: "Action",
      isHot: true
    },
    {
      id: 6,
      title: "Magic Kingdom",
      image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.8,
      category: "RPG",
      isNew: true
    },
    {
      id: 7,
      title: "Ocean Explorer",
      image_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      rating: 4.6,
      category: "Adventure"
    },
    {
      id: 8,
      title: "Neon Runner",
      image_url: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop",
      rating: 4.7,
      category: "Arcade"
    },
    {
      id: 9,
      title: "Castle Defense",
      image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.4,
      category: "Strategy",
      isHot: true
    },
    {
      id: 10,
      title: "Quantum Leap",
      image_url: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop",
      rating: 4.9,
      category: "Sci-Fi"
    },
    {
      id: 11,
      title: "Mystic Forest",
      image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      rating: 4.3,
      category: "Fantasy",
      isNew: true
    },
    {
      id: 12,
      title: "Speed Demon",
      image_url: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop",
      rating: 4.6,
      category: "Racing"
    }
  ];

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
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Loading Game Info...</p>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-violet-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Enhanced geometric pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, purple 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          className="w-full h-full"
        ></div>
      </div>

      <main className="relative z-10 p-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-semibold group"
          >
            <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Games
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                isLiked 
                  ? 'bg-red-600/20 border-red-500/50 text-red-400' 
                  : 'bg-gray-800/50 border-gray-600/50 text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-600/50 text-gray-400 hover:text-purple-400 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-800/80 to-black/80 rounded-2xl p-8 shadow-2xl border border-purple-700/30 backdrop-blur-md mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Game Image */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-purple-600/50">
              <img
                src={game.image_url}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              
              {/* Rating Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/50">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <span className="text-white text-lg font-bold">{game.rating}</span>
              </div>
              
              {/* Status Badges */}
              <div className="absolute top-4 right-4 flex gap-2">
                {game.isHot && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-4 py-2 rounded-full font-bold animate-pulse border border-red-400/50">
                    🔥 HOT
                  </span>
                )}
                {game.isNew && (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-2 rounded-full font-bold border border-green-400/50">
                    ✨ NEW
                  </span>
                )}
              </div>

              {/* Quick Stats */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-white">1.2K views</span>
                </div>
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-white">Updated today</span>
                </div>
              </div>
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
                  <Play className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" />
                  Launch Game
                  <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-gray-400 text-sm">Free to play • No downloads required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Section */}
        <div className="bg-gradient-to-br from-gray-800/60 to-black/60 rounded-2xl p-8 shadow-2xl border border-purple-700/30 backdrop-blur-md mb-10">
          <div className="flex gap-4 mb-6 border-b border-gray-700/50 pb-4">
            {['overview', 'gameplay', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400 mb-3">About This Game</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {game.description} Experience cutting-edge gameplay with stunning visuals and immersive sound design. 
                    This game offers hours of entertainment with its unique mechanics and engaging storyline.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                    <h4 className="font-semibold text-purple-400 mb-2">Game Engine</h4>
                    <p className="text-gray-300">HTML5 Canvas</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                    <h4 className="font-semibold text-purple-400 mb-2">Platform</h4>
                    <p className="text-gray-300">Web Browser</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                    <h4 className="font-semibold text-purple-400 mb-2">Release Date</h4>
                    <p className="text-gray-300">2024</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'gameplay' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-3">How to Play</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-white">Getting Started</h4>
                        <p className="text-gray-400">Click the launch button to begin your adventure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-white">Controls</h4>
                        <p className="text-gray-400">Use keyboard and mouse for optimal experience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-white">Objective</h4>
                        <p className="text-gray-400">Complete challenges and unlock achievements</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                    <h4 className="font-semibold text-purple-400 mb-3">Key Features</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Stunning visual effects</li>
                      <li>• Responsive gameplay</li>
                      <li>• Multiple difficulty levels</li>
                      <li>• Achievement system</li>
                      <li>• Leaderboards</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-3">Player Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-400">5.0</span>
                    </div>
                    <p className="text-gray-300 mb-3">"Amazing game! The graphics are incredible and the gameplay is so smooth."</p>
                    <p className="text-gray-500 text-sm">- GameMaster2024</p>
                  </div>
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="w-4 h-4 text-gray-400" />
                      </div>
                      <span className="text-gray-400">4.0</span>
                    </div>
                    <p className="text-gray-300 mb-3">"Great game overall. Could use more levels but very entertaining!"</p>
                    <p className="text-gray-500 text-sm">- ProGamer</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Embed */}
        {game.iframe_url && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-8 text-center">
              Play {game.title} Now!
            </h2>
            <div className="w-full h-[600px] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-700/50 relative">
              <iframe
                src={game.iframe_url}
                title={game.title}
                className="w-full h-full border-0"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }}></div>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm mb-2">
                If the game doesn't load, try opening it in a new tab or enable third-party content in your browser.
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-full text-gray-400 hover:text-white transition-all">
                  Fullscreen
                </button>
                <button className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-full text-gray-400 hover:text-white transition-all">
                  Refresh Game
                </button>
              </div>
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
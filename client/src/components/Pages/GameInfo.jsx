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

export default function GameInfo() {
  const [games, setGames] = useState([]);
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
      const gamePromises = Array.from({ length: 24 }, (_, i) =>
        gameById(i + 1)
      );
      const gameData = await Promise.all(gamePromises);
      setGames(gameData);
      setFeaturedGame(gameData[0]);
    } catch (error) {
      console.error("Error loading games:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = (game) => {
    // Navigate to game detail page or open game modal
    console.log("Playing game:", game);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedGenre(null);

    // Scroll to relevant section
    if (category === "Trending Now" && trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (category === "New Releases" && newReleasesRef.current) {
      newReleasesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (category === "Popular This Week" && popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredGames = games.filter((game) => {
    if (selectedGenre) return game.genre === selectedGenre;
    return true;
  });

  const trendingGames = games.filter((game) => game.isHot).slice(0, 8);
  const newGames = games.filter((game) => game.isNew).slice(0, 6);
  const popularGames = games.slice(0, 12);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black">
        <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-yellow-400 text-xl font-semibold">
              Loading Epic Games...
            </p>
          </div>
        </div>
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
            <div className="relative z-10 flex items-center h-full px-12">
              <div className="max-w-2xl">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 leading-tight">
                  {featuredGame.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  {featuredGame.description}
                </p>
                <button
                  onClick={() => handlePlay(featuredGame)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
                >
                  <Play
                    className="w-6 h-6 inline mr-2"
                    fill="currentColor"
                  />
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
            <section
              ref={trendingRef}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold text-yellow-400">
                  Trending Now
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-red-500 to-transparent"></div>
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

          {/* New Releases Section */}
          {!selectedGenre && !selectedCategory && newGames.length > 0 && (
            <section
              ref={newReleasesRef}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-green-500" />
                <h2 className="text-3xl font-bold text-yellow-400">
                  New Releases
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
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

          {/* Main Games Grid */}
          <section ref={popularRef}>
            {!selectedGenre && !selectedCategory && (
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-yellow-400">
                  All Games
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
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

        <Footer />
      </main>
    </div>
  );
}

//   return (
//     <div className="flex min-h-screen bg-black text-yellow-400">
//       <Sidebar />
//       <main className="flex-1 p-6 overflow-auto">
//         <div className="text-center mb-10">
//           <button
//             onClick={loadGameDetails}
//             className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
//           >
//             🔍 Load Game Details
//           </button>
//         </div>

//         {game && (
//           <section className="max-w-4xl mx-auto">
//             <h1 className="text-4xl font-bold mb-4 text-center">{game.title}</h1>
//             <div className="mb-6 text-center">
//               <div
//                 className="w-full aspect-video border border-yellow-600 rounded overflow-hidden"
//                 dangerouslySetInnerHTML={{ __html: game.embed_code }}
//               />
//             </div>
//             <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
//               <p className="mb-2 text-lg">🎮 <strong>Genre:</strong> {game.genre}</p>
//               <p className="mb-2 text-lg">⭐ <strong>Rating:</strong> {game.rating}</p>
//               <p className="mb-4"><strong>Description:</strong> {game.description}</p>
//               <p className="mb-4"><strong>How to Play:</strong> {game.instructions}</p>
//               <div className="text-center mt-6">
//                 <a
//                   href={game.embed_code.match(/src=\"(.*?)\"/)?.[1] || '#'}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-yellow-600 text-black px-6 py-3 rounded-lg hover:bg-yellow-700 transition"
//                 >
//                   ▶ Play in Fullscreen
//                 </a>
//               </div>
//             </div>
//           </section>
//         )}

//         <Footer />
//       </main>
//     </div>
//   );
// }

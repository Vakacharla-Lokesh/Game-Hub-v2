import React, { useState, useEffect, useRef } from 'react';
import { allGames } from "../../api/GameService";
import Sidebar from '../Sidebar';
import Footer from '../layout/Footer';
import { ChevronRight, Star, TrendingUp, Gamepad2, Zap, 
  Crown, Target, Sword, Car, Puzzle, Music, Sparkles } from 'lucide-react';

//   const gameById = async (id) => {
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

const genres = [
  { name: 'Action', icon: Zap, count: 156 },
  { name: 'Adventure', icon: Crown, count: 89 },
  { name: 'Puzzle', icon: Puzzle, count: 134 },
  { name: 'Racing', icon: Car, count: 67 },
  { name: 'Shooting', icon: Target, count: 98 },
  { name: 'RPG', icon: Sword, count: 45 },
  { name: 'Music', icon: Music, count: 23 },
  { name: 'Sports', icon: Gamepad2, count: 78 }
];

const categories = [
  'Trending Now',
  'New Releases',
  'Popular This Week',
  'Editor\'s Choice',
  'Multiplayer',
  'Single Player',
  'Free to Play',
  'Premium Games'
];

export default function Game() {
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

  // const loadGames = async () => {
  //   setLoading(true);
  //   try {
  //     const promises = Array.from({ length: 24 }, (_, i) => gameById(i + 1));
  //     const data = (await Promise.all(promises)).filter(Boolean);
  //     setGames(data);
  //     setFeaturedGame(data[0]);
  //   } catch (error) {
  //     console.error("Failed to load games:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const loadGames = async () => {
  setLoading(true);
  try {
    const data = await allGames();    
    console.log("Loaded games:", data)    // ✅ Fetch all games at once
    setGames(data);                       // ✅ Save to state
    setFeaturedGame(data[0]);     // ✅ Set featured (fallback if empty)
  } catch (error) {
    console.error("Failed to load games:", error);
  } finally {
    setLoading(false);
  }
};
if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading games...
      </div>
    );
  }

  if (!Array.isArray(games)) {
    return <div className="text-red-500">❌ Invalid games data</div>;
  }



  const handlePlay = (game) => {
    console.log('Playing game:', game);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedGenre(null);

    if (category === 'Trending Now' && trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'New Releases' && newReleasesRef.current) {
      newReleasesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Popular This Week' && popularRef.current) {
      popularRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredGames = games.filter(game =>
    selectedGenre ? game.genre === selectedGenre : true
  );

  const trendingGames = games.filter(g => g.isHot).slice(0, 8);
  const newGames = games.filter(g => g.isNew).slice(0, 6);
  const popularGames = games.slice(0, 12);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-black text-yellow-400">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold">Loading Epic Games...</p>
          </div>
        </main>
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
                <p className="text-xl text-gray-300 mb-6">{featuredGame.description}</p>
                <button
                  onClick={() => handlePlay(featuredGame)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
                >
                  <Play className="w-6 h-6 inline mr-2" fill="currentColor" />
                  Play Now
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="px-8 pb-8">
          {(selectedGenre || selectedCategory) && (
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-2">
                {selectedGenre || selectedCategory}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            </div>
          )}

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
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}

function GameCard({ game, onPlay }) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50">
      <div className="relative overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={() => onPlay(game)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm"
        >
          <div className="bg-yellow-500 text-black rounded-full p-4 hover:bg-yellow-400 hover:scale-110 transition-all duration-200 shadow-lg">
            <Play className="w-8 h-8" fill="currentColor" />
          </div>
        </button>

        <div className="absolute top-3 left-3 flex gap-2">
          {game.isHot && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              🔥 HOT
            </span>
          )}
          {game.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              ✨ NEW
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-white text-xs font-bold">{game.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors truncate">
          {game.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
        <div className="flex items-center justify-between">
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/30">
            {game.genre}
          </span>
          <button
            onClick={() => onPlay(game)}
            className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm hover:underline transition-colors"
          >
            Play Now →
          </button>
        </div>
      </div>
    </div>
  );
}



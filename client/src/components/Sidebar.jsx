import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { getGamePerGenres, getGenres } from "../api/GameService";
import { ChevronRight, Gamepad2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

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

function Sidebar({
  onGenreClick,
  onCategoryClick,
  selectedGenre,
  selectedCategory,
}) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const genreData = await getGenres(); // from DB: [{ name: "Action", icon: "Zap" }, ...]
      const countData = await getGamePerGenres(); // from DB: [{ _id: "Action", count: 5 }, ...]

      // Create a map for faster lookup
      const countMap = {};
      countData.forEach((item) => {
        countMap[item._id] = item.count;
      });

      // Merge count into genreData
      const mergedGenres = genreData.map((genre) => ({
        ...genre,
        count: countMap[genre.genre_name] || 0, // Default to 0 if not found
      }));

      setGenres(mergedGenres);
      console.log("Merged Genres:", mergedGenres);
    };

    fetchData();
  }, []);

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
          GameHub
        </h1>
        <p className="text-gray-400 text-sm">Discover Amazing Games</p>
      </div>

      <div className="mb-8">
  <button
    onClick={() => window.location.reload()}
    className="flex items-center text-purple-300 hover:text-purple-200 transition-all duration-300 font-bold bg-gradient-to-r from-purple-900/30 to-violet-900/30 px-6 py-3 rounded-full border border-purple-400/40 backdrop-blur-sm hover:border-purple-300/60 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
  >
    <LucideIcons.ChevronLeft className="w-5 h-5 mr-2" />
    Back to Games
  </button>
</div>
      

      {/* Genres */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5" />
          Genres
        </h2>
        <div className="space-y-2">
          {genres.map((genre) => {
            const Icon = LucideIcons[genre.icon] || LucideIcons["Gamepad2"]; // fallback

            return (
              <button
                key={genre.genre_name}
                onClick={() => onGenreClick(genre.genre_name)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                  selectedGenre === genre.name
                    ? "bg-yellow-500 text-black font-semibold"
                    : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{genre.genre_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-75">{genre.count}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Categories
        </h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                selectedCategory === category
                  ? "bg-yellow-500 text-black font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{category}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

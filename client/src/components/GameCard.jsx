import { Play } from "lucide-react";
import React from "react";
import {
  Star,
  Play as PlayIcon,
} from "lucide-react";

function GameCard({ game, onPlay }) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-800 hover:border-yellow-500/50">
      <div className="relative overflow-hidden">
        <img
          src={game.image_url}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button Overlay */}
        <button
          onClick={() => onPlay(game)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm"
        >
          <div className="bg-yellow-500 text-black rounded-full p-4 hover:bg-yellow-400 hover:scale-110 transition-all duration-200 shadow-lg">
            <Play
              className="w-8 h-8"
              fill="currentColor"
            />
          </div>
        </button>

        {/* Badges */}
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

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star
            className="w-3 h-3 text-yellow-400"
            fill="currentColor"
          />
          <span className="text-white text-xs font-bold">{game.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors truncate">
          {game.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>
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

export default GameCard;
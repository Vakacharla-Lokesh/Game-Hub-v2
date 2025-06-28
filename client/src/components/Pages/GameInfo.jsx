import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import axios from '../../api/axiosInstance';
import { gameById } from "../../api/GameService";

export default function GameInfo() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  const handleLoadGame = async () => {
    try {
      console.log("parrams: ", id);
      const data = await gameById(id);
      setGame(data);
      console.log("unique game data: ", data);
    } catch (err) {
      console.error("Error loading game:", err);
    }
  };

  useEffect(() => {
    handleLoadGame();
  }, []);

  if (!game) return <div className="text-yellow-400">Loading...</div>;

  return (
    <div className="p-6 bg-black text-yellow-400 min-h-screen">
      <h1 className="text-4xl font-bold mb-2">{game.title}</h1>
      <p className="text-lg mb-4">{game.description}</p>
      <div dangerouslySetInnerHTML={{ __html: game.embed_code }} />
      <div className="mt-6">
        <p>
          <strong>Genre:</strong> {game.genre}
        </p>
        <p>
          <strong>Rating:</strong> {game.rating}
        </p>
        <p className="mt-4">
          <strong>Instructions:</strong> {game.instructions}
        </p>
      </div>
    </div>
  );
}

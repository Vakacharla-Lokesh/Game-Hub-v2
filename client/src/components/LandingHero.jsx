import { useNavigate } from 'react-router-dom';

export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-500 to-black text-center p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to GameVerse</h1>
      <p className="text-xl mb-6 max-w-xl">
        Dive into the most thrilling collection of online games. Ready to play?
      </p>
      <button
        onClick={() => navigate('/games')}
        className="bg-black hover:bg-yellow-600 text-yellow-400 font-bold py-3 px-6 rounded-full border border-yellow-400 transition duration-300"
      >
        Play Now
      </button>
    </section>
  );
}

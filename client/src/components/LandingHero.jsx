import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
export default function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="py-24 flex flex-col justify-start bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-center p-6 relative overflow-hidden text-white">
      {/* Transparent Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 absolute top-0 left-0 z-20 backdrop-blur-sm bg-black/20 text-white">
        <div className="text-4xl font-extrabold tracking-wider">
          🎮 GameVerse
        </div>
        <nav className="flex gap-6 text-2xl font-semibold font-[Poppins]">
          {["Profile", "Contact Us", "Login"].map((item, index) => (
            <a
              key={index}
              href={`${item.toLowerCase().replace(/ /g, "")}`}
              className="relative inline-block transition-all duration-300 ease-in-out hover:text-yellow-400 hover:scale-110 hover:tracking-wider"
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          ))}
        </nav>
      </header>

      {/* Animated Background Icons */}
      <ul className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <li
            key={i}
            className="absolute text-white text-2xl opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🎮
          </li>
        ))}
      </ul>

      <div className="z-10 max-w-5xl mt-32 mx-auto text-center">
        <h1 className="text-7xl md:text-8xl font-extrabold mb-8 tracking-wide text-white drop-shadow-2xl animate-fade-in">
          👾 Welcome to <span className="text-yellow-400">GameVerse</span>
        </h1>
        <p className="text-3xl md:text-4xl text-white mb-10 leading-relaxed font-medium">
          Dive into the most{" "}
          <span className="text-yellow-300 font-bold">thrilling</span>{" "}
          collection of online games. <br />
          Ready to{" "}
          <span className="underline decoration-yellow-400 decoration-4">
            play and conquer?
          </span>
        </p>
        <button
          onClick={() => navigate("/games")}
          className="relative group overflow-hidden bg-gradient-to-br from-yellow-400 to-lime-400 text-black font-extrabold py-6 px-14 text-3xl rounded-full border-4 border-yellow-300 shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_10px_rgba(234,179,8,0.5)]"
        >
          <span className="absolute inset-0 bg-yellow-300 opacity-10 rounded-full blur-xl group-hover:opacity-20 transition duration-500"></span>
          <span className="absolute -inset-px z-0 rounded-full border-2 border-yellow-300 animate-spin-slow"></span>
          <span className="relative z-10 flex items-center gap-2">
            ▶ Start Playing
          </span>
        </button>
      </div>

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); opacity: 0.2; }
            50% { transform: translateY(-20px); opacity: 0.4; }
            100% { transform: translateY(0); opacity: 0.2; }
          }
          .animate-float {
            animation: float infinite ease-in-out;
          }

        `}
      </style>
    </section>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/logins/LoginPage.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import GameInfo from "./components/Pages/GameInfo.jsx";
import LandingPage from "./components/Pages/LandingPage.jsx";
import Game from "./components/Pages/Game.jsx";
import FAQ from "./components/Support Pages/FAQ.jsx";
import ContactPage from "./components/Support Pages/ContactPage.jsx";
import HelpForm from "./components/Pages/help.jsx";
import SignUpPage from "./components/logins/SignUpPage.jsx";
import PlayGame from "./components/Pages/PlayGame.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN ROUTES */}
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/sign-up"
          element={<SignUpPage />}
        />

        {/* PLAY GAME ROUTES */}
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/game/:id"
          element={<GameInfo />}
        />
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/games"
          element={<Game />}
        />

        <Route
          path="/playgames/:id"
          element={<PlayGame />}
        />

        {/* SUPPORT PAGE ROUTES */}
        <Route
          path="/faqs"
          element={<FAQ />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route 
          path="/help" 
          element={<HelpForm />} 
          />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

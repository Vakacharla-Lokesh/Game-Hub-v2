import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Testing from "./components/Testing";
import LoginPage from "./components/logins/LoginPage.jsx";
import HomePage from "./components/Pages/HomePage.jsx";
import GameInfo from "./components/Pages/GameInfo.jsx";
import LandingPage from "./components/Pages/LandingPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/testing"
          element={<Testing />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

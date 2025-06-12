import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Testing from "./components/Testing";
import DotGrid from "./components/styling/DotGrid";
import LoginPage from "./components/logins/LoginPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/testing" element={<Testing />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

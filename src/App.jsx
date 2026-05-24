import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Guides from "./pages/Guides";
import GuidePost from "./pages/GuidePost";
import Stats from "./pages/Stats";
import Leaderboards from "./pages/Leaderboards";
import ClickingGame from "./pages/ClickingGame";
import ClickingGameWidget from "./components/ClickingGameWidget";
import { audioManager } from "./utils/audioManager";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    audioManager.tryAutoplay();
  }, []);

  return (
    <Router>
      <div className="app-shell">
        <ScrollToTop />
        <NavBar />
        <ClickingGameWidget />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuidePost />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/clicking-game" element={<ClickingGame />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

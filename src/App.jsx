import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ClickingGameWidget from "./components/ClickingGameWidget";
import { isSoundcloudPage } from "./utils/soundcloudPlayer";

const Events = lazy(() => import("./pages/Events"));
const Guides = lazy(() => import("./pages/Guides"));
const GuidePost = lazy(() => import("./pages/GuidePost"));
const Stats = lazy(() => import("./pages/Stats"));
const Leaderboards = lazy(() => import("./pages/Leaderboards"));
const ClickingGame = lazy(() => import("./pages/ClickingGame"));
const PohPlanner = lazy(() => import("./pages/PohPlanner"));
const Bingo = lazy(() => import("./pages/Bingo"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = hash.startsWith("#") ? hash.slice(1) : "";
    const isElementId = /^[A-Za-z][\w:-]*$/.test(id);
    if (isElementId) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function PageFallback() {
  return (
    <div className="page-fallback" role="status">
      Loading page…
    </div>
  );
}

function AppFrame() {
  const location = useLocation();
  const playerDocked = isSoundcloudPage(location.pathname);

  return (
    <div className={playerDocked ? "app-shell app-shell--player-docked" : "app-shell"}>
      <ScrollToTop />
      <NavBar />
      <ClickingGameWidget />
      <main>
          <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuidePost />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/clicking-game" element={<ClickingGame />} />
            <Route path="/poh-planner" element={<PohPlanner />} />
            <Route path="/bingo" element={<Bingo />} />
          </Routes>
          </Suspense>
        </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppFrame />
    </Router>
  );
}

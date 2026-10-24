import { lazy, Suspense, useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./provider/ThemeContext";
import { Header, LoadingScreen, ThemeButton } from "./components/layout";
import { ProjectList } from "./components/projects";

const IntroExperience = lazy(() => import("./pages/IntroExperience"));
const HomeSplash = lazy(() => import("./pages/Home"));
const ContactPage = lazy(() => import("./pages/Contact"));

// Coarse pointer = touchscreen — no wheel event, no WebGL-heavy intro
const isMobile = window.matchMedia("(pointer: coarse)").matches;

function App() {
  const [assetsReady, setAssetsReady] = useState(isMobile);
  const [introComplete, setIntroComplete] = useState(isMobile);
  const [introDone, setIntroDone] = useState(isMobile);
  const [progress, setProgress] = useState(0);

  const handleReady = useCallback(() => setAssetsReady(true), []);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <ThemeProvider>
      <LoadingScreen ready={assetsReady} progress={progress} />

      {!introDone && (
        <div
          className="fixed inset-0 z-10 transition-opacity duration-700"
          style={{
            opacity: introComplete ? 0 : 1,
            pointerEvents: introComplete ? "none" : "auto",
          }}
          onTransitionEnd={() => {
            if (introComplete) setIntroDone(true);
          }}
        >
          <Suspense fallback={null}>
            <IntroExperience
              onReady={handleReady}
              onProgress={setProgress}
              onIntroComplete={handleIntroComplete}
            />
          </Suspense>
        </div>
      )}

      {introDone && (
        <div className="animate-fade-in">
          <Header />
          <ThemeButton />
          <Suspense fallback={<div className="fixed inset-0 bg-bg-primary" />}>
            <Routes>
              <Route path="/" element={<HomeSplash />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;

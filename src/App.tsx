import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './provider/ThemeContext';
import { Header, LoadingScreen, ThemeButton } from './components/layout';
import { HomeSplash, ContactPage } from './pages';
import IntroExperience from './pages/IntroExperience';
import { ProjectList } from './components/projects';

// Coarse pointer = touchscreen — no wheel event, no WebGL-heavy intro
const isMobile = window.matchMedia('(pointer: coarse)').matches;

function App() {
  const [assetsReady,   setAssetsReady]   = useState(isMobile);
  const [introComplete, setIntroComplete] = useState(isMobile);
  const [introDone,     setIntroDone]     = useState(isMobile);

  const handleReady         = useCallback(() => setAssetsReady(true),   []);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <ThemeProvider>
      <LoadingScreen ready={assetsReady} />

      {!introDone && (
        <div
          className="fixed inset-0 z-10 transition-opacity duration-700"
          style={{ opacity: introComplete ? 0 : 1, pointerEvents: introComplete ? 'none' : 'auto' }}
          onTransitionEnd={() => { if (introComplete) setIntroDone(true); }}
        >
          <IntroExperience
            onReady={handleReady}
            onIntroComplete={handleIntroComplete}
          />
        </div>
      )}

      {/* Mounted only after the intro is fully unmounted — prevents dual WebGL contexts.
          animate-fade-in provides the entrance transition previously handled by opacity state. */}
      {introDone && (
        <div className="animate-fade-in">
          <Header />
          <ThemeButton />
          <Routes>
            <Route path="/" element={<HomeSplash />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;

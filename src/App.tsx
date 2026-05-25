import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './provider/ThemeContext';
import { Header, LoadingScreen, ThemeButton } from './components/layout';
import { HomeSplash, ContactPage } from './pages';
import IntroExperience from './pages/IntroExperience';
import { ProjectList } from './components/projects';

function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [introDone, setIntroDone] = useState(false);

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
            onReady={() => setAssetsReady(true)}
            onIntroComplete={() => setIntroComplete(true)}
          />
        </div>
      )}

      <div
        className="transition-opacity duration-700"
        style={{ opacity: introComplete ? 1 : 0, pointerEvents: introComplete ? 'auto' : 'none' }}
      >
        <Header />
        <ThemeButton />
        <Routes>
          <Route path="/" element={<HomeSplash />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { Header, LoadingScreen, ThemeButton } from './components/layout';
import { HomeSplash, ContactPage } from './pages';
import { ProjectList } from './components/projects';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './provider/ThemeContext';

function App() {
  return (
    <>
      <ThemeProvider>
        <LoadingScreen />
        <Header />
        <ThemeButton />
        <Routes>
          <Route path="/" element={<HomeSplash />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

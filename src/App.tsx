
import HomeSplash from './pages/Home.tsx';
import ContactPage from './pages/Contact.tsx';
import ProjectList from './components/projects/ProjectList.tsx';

import { Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/layout/ThemeButton.tsx';
import { ThemeProvider } from './provider/ThemeContext.tsx';

function App() {
  return (
    <>
      <ThemeProvider>
        
        <ThemeToggle>
          <Routes>
            <Route path="/" element={<HomeSplash />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </ThemeToggle>
      </ThemeProvider>
    </>
  );
}

export default App;

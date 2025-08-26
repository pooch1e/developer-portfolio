import Header from './Header.tsx';
import WorkPage from './projectComps/WorkPage.tsx';
import HomeSplash from './HomeSplash.tsx';
import ContactPage from './ContactPage.tsx';
import { Routes, Route } from 'react-router-dom';
import ThemeToggle from './ThemeButton.tsx';
import { ThemeProvider } from './providor/ThemeContext.tsx';

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <ThemeToggle>
          <Routes>
            <Route path="/" element={<HomeSplash />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </ThemeToggle>
      </ThemeProvider>
    </>
  );
}

export default App;

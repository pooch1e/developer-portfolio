import Header from './Header';
import WorkPage from './projectComps/WorkPage';
import HomeSplash from './HomeSplash';
import ContactPage from './ContactPage';
import { Routes, Route } from 'react-router';
import ThemeToggle from './ThemeButton';
import { ThemeProvider } from './providor/ThemeContext';

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomeSplash />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

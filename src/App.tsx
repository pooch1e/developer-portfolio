import Header from './Header';
import WorkPage from './projectComps/WorkPage';
import HomeSplash from './HomeSplash';
import ContactPage from './ContactPage';
import { Routes, Route } from 'react-router';
import ThemeToggle from './ThemeButton';

function App() {
  return (
    <>
      <Header />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomeSplash />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;

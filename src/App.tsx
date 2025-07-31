import Header from './Header';
import WorkPage from './projectComps/WorkPage';
import HomeSplash from './HomeSplash';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeSplash />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </>
  );
}

export default App;

import { ImgContainer } from './ImgContainer';
import image from '../assets/ncnews.png';
export default function ProjectContainer() {
  return (
    <div className="border-2 h-80 grid grid-cols-3 gap-4 m-2 p-4 overflow-hidden">
      <ImgContainer imageUrl={image} />

      <div className="text-sm text-justify">
        <p>
          A modern React-based news aggregation application built with React
          Router, Bootstrap, and custom hooks for state management.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Article Browsing: View by topic, sort & filter</li>
          <li>Interactive Comments: Read, post, vote</li>
          <li>Responsive Design: Bootstrap mobile-first</li>
          <li>Topic Navigation, Vote System, Dynamic Routing</li>
          <li>Real-time Updates with Context API</li>
        </ul>
      </div>

      <div className="text-sm">
        <p className="mb-2">
          <strong>Tech Stack:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>Frontend: React 18, React Router DOM</li>
          <li>Styling: Bootstrap 5, Custom CSS</li>
          <li>State: Context API, Custom Hooks</li>
          <li>Build: Vite</li>
        </ul>

        <a
          href="https://github.com/pooch1e/nc-news-fe"
          target="_blank"
          className="block mt-4 text-blue-600 underline">
          Link to GitHub →
        </a>
      </div>
    </div>
  );
}

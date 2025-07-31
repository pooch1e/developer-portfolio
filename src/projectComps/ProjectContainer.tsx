import { ImgContainer } from './ImgContainer';
import image from '../assets/ncnews.png';

export default function ProjectContainer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-8">
      {/* Image */}
      <div>
        <ImgContainer imageUrl={image} />
      </div>

      {/* Content */}
      <div className="lg:col-span-2 space-y-8 mt-2">
        <h4 className="text mb-2 w-[800px] text-black text-[11pt] font-['Neue'] tracking-[-0.3px]">
          NC News
        </h4>
        <p className="text-black text-[11pt] font-['Neue'] leading-relaxed">
          A modern React-based news aggregation application built with React
          Router, Bootstrap, and custom hooks for state management.
        </p>

        <div className="flex justify-between items-end">
          <div className="flex justify-between items-end">
            <div className="text-sm text-gray-400 space-y-1">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Code2 size={16} />
                  <span>React 18</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Route size={16} />
                  <span>React Router</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Palette size={16} />
                  <span>Bootstrap 5</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Layers size={16} />
                  <span>Context API</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap size={16} />
                  <span>Vite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <a
            href="https://github.com/pooch1e/nc-news-fe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black hover:text-gray-600 transition-colors border-b border-black hover:border-gray-600">
            GitHub →
          </a>
          <a
            href="https://nc-news-jkram.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black hover:text-gray-600 transition-colors border-b border-black hover:border-gray-600">
            Deployed →
          </a>
        </div>
      </div>
    </div>
  );
}

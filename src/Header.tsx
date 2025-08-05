import { Link } from 'react-router';
import { useLocation } from 'react-router';
export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerClasses = isHomePage
    ? 'p-4 bg-gradient-to-b from-white via-white/50 to-transparent dark:from-zinc-700 dark:via-zinc-700/50 dark:to-transparent z-40 dark w-full relative'
    : 'p-4 bg-white dark:bg-zinc-700 z-40 dark w-full relative';

  return (
    <div className={headerClasses}>
      <div className="text mb-2 text-black text-[11pt] dark:text-white dark font-sixtyfour tracking-[-0.3px]">
        <h1 className="underline text-[14pt]">
          <Link to="/">Joel Kram</Link>
        </h1>

        <h2>Junior Fullstack Software Developer</h2>
      </div>
      <nav className="nav text-[11pt] dark:text-white font-sixtyfour flex flex-col mt-4 gap-4">
        <p className="underline">
          <Link to="/work">Work</Link>
        </p>

        <p className="underline">
          <Link to="/contact">Contact</Link>
        </p>

        <a
          href="https://github.com/pooch1e"
          target="_blank"
          className="underline">
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/joel-kram/"
          target="_blank"
          className="underline">
          LinkedIn
        </a>
      </nav>
    </div>
  );
}

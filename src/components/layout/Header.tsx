import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const headerClasses = isHomePage
    ? 'p-8 bg-transparent z-40 w-full relative transition-colors duration-300 ease-linear'
    : 'p-8 bg-white dark:bg-zinc-700 z-40 w-full relative transition-colors duration-300 ease-linear';

  return (
    <header className={headerClasses} role="banner">
      <div className="text mb-2 text-black text-1xl dark:text-white font-sixtyfour tracking-[-0.3px]">
        <h1 className="underline text-2xl">
          <Link to="/" aria-label="Joel Kram - Home page">
            Joel Kram
          </Link>
        </h1>
        <p className="text-base" role="doc-subtitle">
          Junior Fullstack Software Developer
        </p>
      </div>
      <nav
        className="nav text-[11pt] dark:text-white font-sixtyfour flex flex-col mt-4 gap-4 items-start"
        role="navigation"
        aria-label="Main navigation">
        <Link
          to="/projects"
          aria-label="View my projects and work portfolio"
          className="underline">
          Projects
        </Link>
        <Link
          to="/contact"
          aria-label="Get in touch with me"
          className="underline">
          Contact
        </Link>
        <div
          role="group"
          aria-label="External profiles"
          className="flex gap-4 flex-col">
          <a
            href="https://github.com/pooch1e"
            target="_blank"
            className="underline w-1">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/joel-kram/"
            target="_blank"
            className="underline w-1">
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}

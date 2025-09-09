import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const headerClasses = isHomePage
    ? 'p-12 bg-transparent z-40 w-full relative transition-colors duration-300 ease-linear'
    : 'p-12 bg-white dark:bg-zinc-700 z-40 w-full relative transition-colors duration-300 ease-linear';

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
        className="nav text-4xl dark:text-white font-sixtyfour mt-4"
        role="navigation"
        aria-label="Main navigation">
        <div className="flex justify-start even:justify-end mb-96">
          <Link
            to="/projects"
            aria-label="View my projects and work portfolio"
            className="underline underline-offset-8">
            Projects
          </Link>
        </div>
        <div className="flex justify-start even:justify-end  mb-96">
          <Link
            to="/contact"
            aria-label="Get in touch with me"
            className="underline underline-offset-8">
            Contact
          </Link>
        </div>
        <div className="flex justify-start even:justify-end  mb-96">
          <a
            href="https://github.com/pooch1e"
            target="_blank"
            className="underline underline-offset-8">
            Github
          </a>
        </div>
        <div className="flex justify-start even:justify-end">
          <a
            href="https://www.linkedin.com/in/joel-kram/"
            target="_blank"
            className="underline underline-offset-8">
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}

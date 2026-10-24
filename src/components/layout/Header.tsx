/**
 * Header — site title, role subtitle, and primary navigation (internal routes
 * plus external profile links). Transparent over the home scene, solid elsewhere.
 */
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const headerClasses = isHomePage
    ? "p-12 bg-transparent z-40 w-full relative transition-colors duration-300 ease-linear"
    : "p-12 bg-bg-primary z-40 w-full relative transition-colors duration-300 ease-linear";

  return (
    <header className={headerClasses} role="banner">
      <div className="text mb-2 text-text-primary text-1xl font-departure tracking-[-0.3px]">
        <h1 className="text-8xl hover:bg-highlight-hover inline-block">
          <Link to="/" aria-label="Joel Kram - Home page">
            Joel Kram
          </Link>
        </h1>
        <p className="text-base" role="doc-subtitle">
          Frontend Software Developer
        </p>
      </div>
      <nav
        className="nav text-xl text-text-primary font-departure flex flex-col mt-4 gap-4 items-start"
        role="navigation"
        aria-label="Main navigation"
      >
        <span className="hover:bg-highlight-hover">
          {" "}
          <Link
            to="/projects"
            aria-label="View my projects and work portfolio"
            className="underline"
          >
            Projects
          </Link>
        </span>
        <span className="hover:bg-highlight-hover">
          {" "}
          <Link
            to="/contact"
            aria-label="Get in touch with me"
            className="underline"
          >
            Contact
          </Link>
        </span>
        <div
          role="group"
          aria-label="External profiles"
          className="flex gap-4 flex-col"
        >
          <span className="hover:bg-highlight-hover">
            <a
              href="https://github.com/pooch1e"
              target="_blank"
              className="underline w-1"
            >
              Github
            </a>
          </span>
          <span className="hover:bg-highlight-hover">
            {" "}
            <a
              href="https://www.linkedin.com/in/joel-kram/"
              target="_blank"
              className="underline w-1"
            >
              LinkedIn
            </a>
          </span>
        </div>
      </nav>
    </header>
  );
}

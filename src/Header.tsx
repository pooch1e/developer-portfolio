import { Link } from 'react-router';
export default function Header() {
  return (
    <div className="container p-2">
      <div className="text mb-2 w-[800px] text-black text-[11pt] font-sixtyfour tracking-[-0.3px]">
        <Link to="/">
          <h1 className="underline text-[14pt]">Joel Kram</h1>
        </Link>
        <h2>Junior Fullstack Software Developer</h2>
      </div>
      <nav className="nav text-[11pt] font-['Neue'] flex gap-4">
        <Link to="/work">
          <p className="underline">Work</p>
        </Link>
        <Link to="/contact">
          <p className="underline">Contact</p>
        </Link>
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

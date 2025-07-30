import { Link } from 'react-router';
export default function Header() {
  return (
    <div className="container p-2">
      <div className="text mb-2 w-[800px] text-black text-[11pt] font-['Neue'] tracking-[-0.3px]">
        <Link to="/">
          <h1 className='underline text-[14pt]'>Joel Kram</h1>
        </Link>
        <h2>Software Developer</h2>
      </div>
      <nav className="nav text-[11pt] font-['Neue']">
        <Link to="/work">
          <p className="underline">Work</p>
        </Link>
        <Link to="/contact">
          <p className="underline">Contact</p>
        </Link>
      </nav>
    </div>
  );
}

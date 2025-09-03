// components/ThemeToggle.jsx
import { useTheme } from '../../provider/ThemeContext.tsx';
import type { ReactNode } from 'react';
interface ThemeToggleProps {
  children?: ReactNode;
}

export default function ThemeToggle({ children }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <button
        onClick={toggleTheme}
        className="rotate-90 text-sm fixed top-10 right-0 z-50 backdrop-blur-md dark:text-white transition-all duration-200"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {isDark ? <p>Light</p> : <p>Dark</p>}
      </button>
      <div className="rotate-90 fixed top-20 right-0 z-50 h-[12px] w-[12px] border-2 mr-2.5 dark:border-white transition-all duration-200"></div>

      <div>{children}</div>
    </>
  );
}

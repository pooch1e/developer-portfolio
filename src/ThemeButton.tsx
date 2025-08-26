// components/ThemeToggle.jsx
import { useTheme } from '../src/providor/ThemeContext.tsx';
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
        className="fixed top-8 right-8 z-50 p-2 rounded-full bg-white/20 dark:bg-zinc-700/20 backdrop-blur-md border border-gray-200/20 dark:border-gray-700/20 hover:bg-white/30 dark:hover:bg-zinc-700/30 dark:text-white transition-all duration-200"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {isDark ? (
          // Sun icon for light mode
          <p>Light</p>
        ) : (
          // Moon icon for dark mode
          <p>Dark</p>
        )}
      </button>
      <div>{children}</div>
    </>
  );
}

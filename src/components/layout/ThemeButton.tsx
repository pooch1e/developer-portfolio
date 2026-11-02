/**
 * ThemeButton — vertical light/dark toggle pinned to the right edge. Uses
 * vertical writing mode rather than rotation so the label's length ("Light" vs
 * "Dark") doesn't shift it horizontally.
 */
import { useTheme } from '../../provider/ThemeContext.tsx';

export default function ThemeButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed top-10 right-1.5 z-50 flex flex-col items-center gap-3">
      <button
        onClick={toggleTheme}
        className="[writing-mode:vertical-rl] text-sm backdrop-blur-md text-text-primary hover:text-text-secondary transition-colors duration-200"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
        {isDark ? 'Light' : 'Dark'}
      </button>
      <div aria-hidden="true" className="h-3 w-3 border-2 border-text-primary" />
    </div>
  );
}

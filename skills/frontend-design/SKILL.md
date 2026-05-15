# Frontend Design System

This project uses a semantic design system built with Tailwind CSS v4 and CSS variables. This ensures a consistent look and feel across the application and makes theming (like dark mode) trivial.

## CSS Variables
The design system relies on semantic CSS variables defined in `src/index.css`. These variables are mapped to Tailwind utilities using the `@theme` directive.

### Colors
We use semantic naming for colors instead of direct color values (e.g., `bg-surface` instead of `bg-zinc-800`).

*   **Backgrounds**:
    *   `bg-primary`: Main background color of the app.
    *   `bg-secondary`: Secondary background for slight contrast.
    *   `surface`: Background for cards, dialogs, and elevated elements.
    *   `surface-hover`: Hover state for surface elements.
*   **Text**:
    *   `text-primary`: Default text color for main content.
    *   `text-secondary`: Slightly muted text for descriptions.
    *   `text-muted`: Highly muted text for secondary labels or placeholders.
*   **Borders**:
    *   `border-primary`: Default border color.
    *   `border-hover`: Border color on hover state.
*   **Accents**:
    *   `accent`: Primary brand/accent color.
    *   `accent-hover`: Hover state for accent elements.

### Layout & Typography
*   `radius-card`: Standard border-radius for cards (`12px`).
*   `font-sixtyfour`: Custom font family mapped to Tailwind.

## Using Tailwind Utilities
Instead of writing conditional dark mode classes (e.g., `text-black dark:text-white`), use the semantic utility classes directly. The CSS variables automatically handle the color shift.

### Example
**Don't:**
```tsx
<div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 p-4 rounded-lg">
  <h3 className="text-black dark:text-white">Title</h3>
  <p className="text-zinc-600 dark:text-zinc-400">Description...</p>
</div>
```

**Do:**
```tsx
<div className="bg-surface text-text-primary border border-border-primary p-4 rounded-[var(--radius-card)]">
  <h3 className="text-text-primary">Title</h3>
  <p className="text-text-secondary">Description...</p>
</div>
```

## Creating New Components
When building new components, always reference these semantic variables. If a new shade or semantic meaning is needed, add it to `src/index.css` first, both in the `:root` and `.dark` blocks, and map it in the `@theme` directive.

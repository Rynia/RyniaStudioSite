export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'rynia_theme_preference';

export function getPreferredTheme(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  // Default to light mode (porcelain white) as per brand identity
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
  updateToggleIcons(theme);

  // Dispatch custom event for 3D or other listeners if needed
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

function updateToggleIcons(theme: Theme): void {
  const sunIcon = document.querySelector<SVGElement>('#themeToggle .icon-sun');
  const moonIcon = document.querySelector<SVGElement>('#themeToggle .icon-moon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

export function initTheme(): void {
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  // Listen for system theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

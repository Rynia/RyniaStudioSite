export type Theme = 'dark';

export function getPreferredTheme(): Theme {
  return 'dark';
}

export function setTheme(_theme: Theme): void {
  document.documentElement.setAttribute('data-theme', 'dark');
}

export function initTheme(): void {
  setTheme('dark');
}

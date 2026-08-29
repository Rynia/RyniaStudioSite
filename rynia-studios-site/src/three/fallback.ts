export function shouldUseFallback(): boolean {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  if (typeof navigator !== 'undefined') {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
      return true;
    }

    if ('deviceMemory' in navigator) {
      // @ts-ignore
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        return true;
      }
    }
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      return true;
    }
  } catch (e) {
    return true;
  }

  return false;
}

export function showFallbackImage(container: HTMLElement): void {
  const img = document.createElement('img');
  img.src = './assets/hero-fallback.webp';
  img.alt = 'Rynia Studios Hero';
  img.className = 'hero-fallback';
  
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.display = 'block';
  
  container.appendChild(img);
}

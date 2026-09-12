export function initNav(): void {
  const header = document.getElementById('siteHeader');
  const indexTrigger = document.getElementById('indexTrigger');
  const indexDrawer = document.getElementById('indexDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const actThumb = document.getElementById('actThumb');
  const actSteps = document.querySelectorAll<HTMLElement>('.act-step');
  const navLinks = document.querySelectorAll<HTMLElement>('.nav-act-link');

  // 1. Drawer open/close
  if (indexTrigger && indexDrawer) {
    indexTrigger.addEventListener('click', () => {
      indexDrawer.classList.add('is-open');
      indexDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeDrawer = () => {
    if (indexDrawer) {
      indexDrawer.classList.remove('is-open');
      indexDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Close when clicking any drawer link
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // 2. Scroll-based header collapse & Act indicator tracking
  const acts = [
    document.getElementById('act-artefact'),
    document.getElementById('act-systems'),
    document.getElementById('act-thesis'),
    document.getElementById('act-forge'),
    document.getElementById('act-dossier')
  ].filter(Boolean) as HTMLElement[];

  const trackIndicatorHeight = 140; // Total track height in px
  const stepCount = acts.length;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Header collapses to minimal INDEX trigger
        const isScrolled = scrollY > 80;
        document.body.classList.toggle('is-scrolled', isScrolled);
        if (header) {
          header.classList.toggle('is-scrolled', isScrolled);
        }

        // Determine active act
        const viewportMiddle = scrollY + window.innerHeight * 0.45;
        let activeIndex = 0;

        acts.forEach((act, idx) => {
          const top = act.offsetTop;
          const bottom = top + act.offsetHeight;
          if (viewportMiddle >= top && viewportMiddle < bottom) {
            activeIndex = idx;
          }
        });

        // Update thumb position smoothly (0 to 140px)
        if (actThumb && stepCount > 1) {
          const stepHeight = trackIndicatorHeight / (stepCount - 1);
          actThumb.style.transform = `translateY(${activeIndex * stepHeight}px)`;
        }

        // Update active step labels
        actSteps.forEach((step, idx) => {
          step.classList.toggle('is-active', idx === activeIndex);
        });

        // Update header links active state
        navLinks.forEach((link, idx) => {
          link.classList.toggle('is-active', idx === activeIndex);
        });

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial state
}

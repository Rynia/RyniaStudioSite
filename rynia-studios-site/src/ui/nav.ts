export function initNav(): void {
  const header = document.getElementById('siteHeader');
  const indexTrigger = document.getElementById('indexTrigger') as HTMLButtonElement | null;
  const indexDrawer = document.getElementById('indexDrawer');
  const drawerClose = document.getElementById('drawerClose') as HTMLButtonElement | null;
  const actThumb = document.getElementById('actThumb');
  const actSteps = document.querySelectorAll<HTMLElement>('.act-step');
  const navLinks = document.querySelectorAll<HTMLElement>('.nav-act-link');

  // 1. Drawer open/close with focus trap & accessibility
  if (indexTrigger && indexDrawer) {
    indexTrigger.addEventListener('click', () => {
      indexDrawer.classList.add('is-open');
      indexDrawer.setAttribute('aria-hidden', 'false');
      indexTrigger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';

      // Focus first focusable item in drawer
      const firstFocusable = indexDrawer.querySelector<HTMLElement>('button, a');
      firstFocusable?.focus();
    });
  }

  const closeDrawer = () => {
    if (indexDrawer) {
      indexDrawer.classList.remove('is-open');
      indexDrawer.setAttribute('aria-hidden', 'true');
      if (indexTrigger) indexTrigger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      indexTrigger?.focus();
    }
  };

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  // Close when clicking any drawer link
  document.querySelectorAll('.drawer-link').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key & Focus Trap
  window.addEventListener('keydown', (e) => {
    if (indexDrawer?.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        closeDrawer();
      } else if (e.key === 'Tab') {
        const focusables = indexDrawer.querySelectorAll<HTMLElement>('a, button');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // 2. Progressive Disclosure Accordion Handling
  document.querySelectorAll<HTMLButtonElement>('.disclosure-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');

      if (isExpanded) {
        target.hidden = true;
        const icon = btn.querySelector('.toggle-icon');
        if (icon) icon.textContent = '+';
      } else {
        target.hidden = false;
        const icon = btn.querySelector('.toggle-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  // 3. Scroll-based header collapse & Act indicator tracking
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

        // Ensure Act V is selected when user reaches the footer
        if (window.innerHeight + scrollY >= document.body.scrollHeight - 80) {
          activeIndex = acts.length - 1;
        }

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
  onScroll();
}

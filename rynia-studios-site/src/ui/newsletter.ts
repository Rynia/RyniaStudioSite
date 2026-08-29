export function initNewsletter(): void {
  const form = document.querySelector('.newsletter-form') as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const emailInput = form.querySelector('.newsletter-input') as HTMLInputElement;
    if (!emailInput || !emailInput.value.trim()) {
      e.preventDefault();
      emailInput?.focus();
      return;
    }
    // Let Formspree handle the actual submission
  });
}

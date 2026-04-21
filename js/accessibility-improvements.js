// Accessibility improvements for the portfolio site
class AccessibilityManager {
  constructor() {
    this.initKeyboardNavigation();
    this.initScreenReaderSupport();
    this.initFocusManagement();
    this.initColorContrast();
    this.handleMissingResources();
  }

  initKeyboardNavigation() {
    const buttonLikeElements = document.querySelectorAll('button, [role="button"]');
    buttonLikeElements.forEach((element) => {
      element.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault();
          element.click();
        }
      });
    });

    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  initScreenReaderSupport() {
    const canvas = document.querySelector('#hero-canvas');
    if (canvas) {
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Animated 3D scene featuring floating PCB elements and circuit traces');
    }

    this.announceToScreenReader = (message) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    };
  }

  initFocusManagement() {
    const modals = document.querySelectorAll('[role="dialog"]');

    modals.forEach((modal) => {
      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          modal.setAttribute('aria-hidden', 'true');
        }
      });

      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!firstFocusable || !lastFocusable) {
        return;
      }

      modal.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              event.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              event.preventDefault();
            }
          }
        }
      });
    });
  }

  initColorContrast() {
    const highContrastToggle = document.createElement('button');
    highContrastToggle.textContent = 'Contrast';
    highContrastToggle.type = 'button';
    highContrastToggle.className = 'high-contrast-toggle';
    highContrastToggle.setAttribute('aria-pressed', 'false');

    highContrastToggle.addEventListener('click', () => {
      const enabled = document.body.classList.toggle('high-contrast');
      highContrastToggle.setAttribute('aria-pressed', String(enabled));
      this.announceToScreenReader(`High contrast mode ${enabled ? 'enabled' : 'disabled'}`);
    });

    document.body.appendChild(highContrastToggle);
  }

  handleMissingResources() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        img.alt = img.alt || 'Image unavailable';
        img.classList.add('image-fallback');
      });
    });
  }
}

// Initialize accessibility improvements
window.accessibilityManager = new AccessibilityManager();

// Accessibility improvements for the portfolio site
class AccessibilityManager {
  constructor() {
    this.initKeyboardNavigation();
    this.initScreenReaderSupport();
    this.initFocusManagement();
    this.initColorContrast();
  }

  initKeyboardNavigation() {
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
    
    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
      
      // Add keyboard event listeners
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (element.tagName === 'BUTTON' || element.role === 'button') {
            e.preventDefault();
            element.click();
          }
        }
      });
    });

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }
  }

  initScreenReaderSupport() {
    // Add ARIA labels to dynamic content
    const canvas = document.querySelector('#hero-canvas');
    if (canvas) {
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Animated 3D scene featuring floating PCB elements and circuit traces');
    }

    // Announce dynamic content changes
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
    // Manage focus for modal dialogs
    const modals = document.querySelectorAll('[role="dialog"]');
    
    modals.forEach(modal => {
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          modal.setAttribute('aria-hidden', 'true');
          // Return focus to trigger element
        }
      });

      // Trap focus within modal
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus();
              e.preventDefault();
            }
          }
        }
      });
    });
  }

  initColorContrast() {
    // Check and adjust color contrast
    const checkContrast = (element) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simple contrast ratio calculation
      const getLuminance = (rgb) => {
        const values = rgb.match(/\d+/g);
        if (!values) return 0;
        const [r, g, b] = values.map(val => {
          const normalized = val / 255;
          return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const colorLum = getLuminance(color);
      const bgLum = getLuminance(backgroundColor);
      const contrast = (Math.max(colorLum, bgLum) + 0.05) / (Math.min(colorLum, bgLum) + 0.05);
      
      return contrast;
    };

    // Add high contrast mode toggle
    const highContrastToggle = document.createElement('button');
    highContrastToggle.textContent = 'Toggle High Contrast';
    highContrastToggle.className = 'high-contrast-toggle';
    highContrastToggle.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; background: #000; color: #fff; border: 2px solid #fff; padding: 10px; cursor: pointer;';
    
    highContrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      this.announceToScreenReader('High contrast mode ' + (document.body.classList.contains('high-contrast') ? 'enabled' : 'disabled'));
    });
    
    document.body.appendChild(highContrastToggle);
  }

  // Add error handling for missing resources
  handleMissingResources() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', () => {
        img.alt = img.alt || 'Image failed to load';
        img.style.backgroundColor = '#f0f0f0';
        img.style.border = '2px dashed #ccc';
        img.style.padding = '20px';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.color = '#666';
        img.style.fontSize = '14px';
        img.textContent = 'Image not available';
      });
    });
  }
}

// Initialize accessibility improvements
window.accessibilityManager = new AccessibilityManager();

// Error handling and validation improvements
class ErrorHandler {
  constructor() {
    this.initGlobalErrorHandling();
    this.initFormValidation();
    this.initResourceValidation();
  }

  initGlobalErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.logError({
        type: 'javascript',
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.logError({
        type: 'promise',
        message: event.reason,
        timestamp: new Date().toISOString()
      });
    });
  }

  initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
          this.showFormError(form, 'Please fill in all required fields correctly.');
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Min/max length validation
    if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
      isValid = false;
      errorMessage = `Minimum ${field.getAttribute('minlength')} characters required`;
    }

    if (field.hasAttribute('maxlength') && value.length > parseInt(field.getAttribute('maxlength'))) {
      isValid = false;
      errorMessage = `Maximum ${field.getAttribute('maxlength')} characters allowed`;
    }

    this.showFieldError(field, isValid ? '' : errorMessage);
    return isValid;
  }

  showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }

    if (message) {
      const errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      errorElement.textContent = message;
      errorElement.style.cssText = 'color: #ff6b6b; font-size: 0.875rem; margin-top: 0.25rem;';
      field.parentNode.appendChild(errorElement);
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', errorElement.id || `error-${field.name}`);
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }

  clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.removeAttribute('aria-invalid');
  }

  showFormError(form, message) {
    // Remove existing form error
    const existingError = form.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.cssText = 'background: #ff6b6b; color: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;';
    form.insertBefore(errorElement, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.remove();
      }
    }, 5000);
  }

  initResourceValidation() {
    // Check for missing resources
    const criticalResources = [
      { selector: 'link[href*="main.css"]', name: 'Main CSS' },
      { selector: 'script[src*="main.js"]', name: 'Main JavaScript' },
      { selector: 'link[href*="fonts.googleapis.com"]', name: 'Google Fonts' }
    ];

    criticalResources.forEach(resource => {
      const element = document.querySelector(resource.selector);
      if (!element) {
        this.logError({
          type: 'missing_resource',
          message: `Missing critical resource: ${resource.name}`,
          selector: resource.selector,
          timestamp: new Date().toISOString()
        });
      }
    });
  }

  logError(errorData) {
    // Store errors in localStorage for debugging
    const errors = JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
    errors.push(errorData);
    
    // Keep only last 50 errors
    if (errors.length > 50) {
      errors.splice(0, errors.length - 50);
    }
    
    localStorage.setItem('portfolio_errors', JSON.stringify(errors));
    
    // In development, show errors in console
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.group('Portfolio Error Logged');
      console.table(errorData);
      console.groupEnd();
    }
  }

  // Public method to get error logs
  getErrorLogs() {
    return JSON.parse(localStorage.getItem('portfolio_errors') || '[]');
  }

  // Clear error logs
  clearErrorLogs() {
    localStorage.removeItem('portfolio_errors');
  }
}

// Initialize error handler
window.errorHandler = new ErrorHandler();

// Security improvements for contact forms and data handling
class SecurityManager {
  constructor() {
    this.csrfToken = this.generateCSRFToken();
  }

  generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  encryptData(data) {
    // Basic obfuscation for client-side storage
    return btoa(JSON.stringify(data));
  }

  decryptData(encryptedData) {
    try {
      return JSON.parse(atob(encryptedData));
    } catch {
      return null;
    }
  }

  addCSRFProtection(form) {
    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'csrf_token';
    tokenInput.value = this.csrfToken;
    form.appendChild(tokenInput);
  }
}

// Initialize security manager
window.securityManager = new SecurityManager();

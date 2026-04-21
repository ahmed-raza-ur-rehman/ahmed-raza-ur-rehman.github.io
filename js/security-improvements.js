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

  encodeData(data) {
    // Base64 encoding only, not cryptographic encryption.
    return btoa(JSON.stringify(data));
  }

  decodeData(encodedData) {
    try {
      return JSON.parse(atob(encodedData));
    } catch {
      return null;
    }
  }

  // Backward-compatible wrappers.
  encryptData(data) {
    return this.encodeData(data);
  }

  decryptData(encryptedData) {
    return this.decodeData(encryptedData);
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

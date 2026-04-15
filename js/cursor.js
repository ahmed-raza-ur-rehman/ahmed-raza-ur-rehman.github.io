class CustomCursor {
  constructor() {
    this.dot = document.querySelector('.cursor-dot');
    this.ring = document.querySelector('.cursor-ring');
    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: this.pos.x, y: this.pos.y };
    this.speed = 0.15; // Lag factor for the outer ring
    this.enabled = false;
    
    this.init();
  }

  init() {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsFinePointer || !supportsHover || prefersReducedMotion) {
      if (this.dot) this.dot.style.display = 'none';
      if (this.ring) this.ring.style.display = 'none';
      document.body.classList.remove('cursor-hidden');
      return;
    }

    this.enabled = true;
    document.body.classList.add('cursor-hidden');

    // Update mouse position
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // The inner dot follows instantly
      if (this.dot) {
        this.dot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0) translate(-50%, -50%)`;
      }
    });

    // Handle click down/up states
    window.addEventListener('mousedown', (e) => {
      if (this.ring) this.ring.classList.add('is-pressed');
      this.createRipple(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      if (this.ring) this.ring.classList.remove('is-pressed');
    });

    this.bindHoverStates();

    // Start render loop
    this.render();
  }

  bindHoverStates() {
    const hoverTargets = 'a, button, .hover-target, input, textarea, select, summary';

    document.addEventListener('pointerover', (event) => {
      if (event.target.closest(hoverTargets)) {
        if (this.dot) this.dot.classList.add('is-hover');
        if (this.ring) this.ring.classList.add('is-hover');
      }
    });

    document.addEventListener('pointerout', (event) => {
      if (event.target.closest(hoverTargets) && !event.relatedTarget?.closest(hoverTargets)) {
        if (this.dot) this.dot.classList.remove('is-hover');
        if (this.ring) this.ring.classList.remove('is-hover');
      }
    });
  }

  createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    
    // Remove the element after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  render() {
    if (!this.enabled) {
      return;
    }

    // Lerp the outer ring to mouse position
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

    if (this.ring) {
      if (Math.abs(this.mouse.x - this.pos.x) > 0.1 || Math.abs(this.mouse.y - this.pos.y) > 0.1) {
        this.ring.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%)`;
      } else {
        this.ring.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0) translate(-50%, -50%)`;
      }
    }

    requestAnimationFrame(() => this.render());
  }
}

// Initialize Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  window.customCursor = new CustomCursor();
});

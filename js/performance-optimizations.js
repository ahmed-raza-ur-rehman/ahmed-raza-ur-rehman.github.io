// Performance optimizations for the portfolio site
class PerformanceOptimizer {
  constructor() {
    this.initLazyLoading();
    this.initResourceHints();
    this.initServiceWorker();
  }

  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  initResourceHints() {
    // Preload critical resources
    const criticalResources = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js'
    ];

    criticalResources.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = url.includes('css') ? 'style' : 'script';
      link.href = url;
      document.head.appendChild(link);
    });
  }

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed'));
    }
  }

  optimizeAnimations() {
    // Reduce animations on low-end devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;

    if (prefersReducedMotion || isLowEndDevice) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize performance optimizations
window.performanceOptimizer = new PerformanceOptimizer();

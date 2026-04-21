// Performance optimizations for the portfolio site
class PerformanceOptimizer {
  constructor() {
    this.initLazyLoading();
    this.optimizeAnimations();
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

  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(() => {});
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

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });
}

const normalizePath = (path) => {
  if (!path || path === '/') {
    return 'index.html';
  }

  const clean = path.split('/').pop();
  return clean || 'index.html';
};

const currentPage = normalizePath(window.location.pathname);

navAnchors.forEach((anchor) => {
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('mailto:')) {
    return;
  }

  const targetPage = normalizePath(href);
  if (targetPage === currentPage) {
    anchor.classList.add('active');
    anchor.setAttribute('aria-current', 'page');
  }
});

const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

(() => {
  const data = window.PORTFOLIO_DATA;
  const utils = window.PORTFOLIO_UTILS;
  const storageKey = 'portfolio_blog_posts';

  function getPosts() {
    const stored = utils.loadJSON(storageKey, null);
    if (Array.isArray(stored) && stored.length) {
      return stored;
    }
    return data.blogPosts;
  }

  function renderArchive() {
    const list = document.getElementById('blog-list');
    const search = document.getElementById('blog-search');
    const tags = document.getElementById('blog-tags');
    if (!list || !search || !tags) {
      return;
    }

    const posts = getPosts();
    const categories = ['All', ...new Set(posts.map((post) => post.category))];
    let activeCategory = 'All';

    const render = () => {
      const query = search.value.trim().toLowerCase();
      const filtered = posts.filter((post) => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const haystack = `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        return matchesCategory && matchesQuery;
      });

      list.innerHTML = filtered.map((post) => `
        <article class="blog-card glass-card">
          <div class="glass-card-content">
            <p class="project-card__eyebrow">${post.category} · ${utils.formatDate(post.date)} · ${utils.readTimeFromMarkdown(post.content)} min read</p>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="project-tags">${post.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
            <a class="btn btn-outline hover-target" href="post.html?slug=${post.slug}">Read post</a>
          </div>
        </article>
      `).join('');
    };

    tags.innerHTML = categories.map((category) => `<button class="filter-chip ${category === 'All' ? 'is-active' : ''}" data-category="${category}">${category}</button>`).join('');
    tags.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        activeCategory = button.dataset.category;
        tags.querySelectorAll('button').forEach((item) => item.classList.toggle('is-active', item === button));
        render();
      });
    });
    search.addEventListener('input', render);
    render();
  }

  function renderPost() {
    const header = document.getElementById('post-header');
    const content = document.getElementById('post-content');
    const progress = document.getElementById('reading-progress');
    if (!header || !content) {
      return;
    }

    const slug = new URLSearchParams(window.location.search).get('slug') || data.blogPosts[0]?.slug;
    const post = getPosts().find((item) => item.slug === slug) || getPosts()[0];
    if (!post) {
      header.innerHTML = '<h1>Post not found</h1>';
      content.innerHTML = '<p>Return to the <a href="index.html">archive</a>.</p>';
      return;
    }

    header.innerHTML = `
      <p class="project-card__eyebrow">${post.category} · ${utils.formatDate(post.date)} · ${utils.readTimeFromMarkdown(post.content)} min read</p>
      <h1 class="section-title">${post.title}</h1>
      <div class="project-tags">${post.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    `;

    if (window.marked) {
      content.innerHTML = window.marked.parse(post.content);
    } else {
      content.innerHTML = post.content.replace(/\n/g, '<br>');
    }

    if (window.hljs) {
      content.querySelectorAll('pre code').forEach((block) => window.hljs.highlightElement(block));
    }

    if (progress) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percent = scrollable > 0 ? Math.min((scrollTop / scrollable) * 100, 100) : 0;
        progress.style.width = `${percent}%`;
      }, { passive: true });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderArchive();
    renderPost();
  });
})();

(() => {
  const data = window.PORTFOLIO_DATA;
  const utils = window.PORTFOLIO_UTILS;
  const storageKeys = {
    blog: 'portfolio_blog_posts',
    projects: 'portfolio_projects',
    messages: 'portfolio_messages',
    chats: 'portfolio_chat_messages',
    subscribers: 'portfolio_subscribers',
    unlocked: 'portfolio_admin_unlocked'
  };

  function getBlogPosts() {
    return utils.loadJSON(storageKeys.blog, data.blogPosts);
  }

  function getProjects() {
    return utils.loadJSON(storageKeys.projects, data.projects);
  }

  function getMessages() {
    return utils.loadJSON(storageKeys.messages, []);
  }

  function getChats() {
    return utils.loadJSON(storageKeys.chats, []);
  }

  function getSubscribers() {
    return utils.loadJSON(storageKeys.subscribers, []);
  }

  function isUnlocked() {
    return utils.loadJSON(storageKeys.unlocked, false) === true;
  }

  function unlock(password) {
    if (password.trim() === 'KICSIT-2026') {
      utils.saveJSON(storageKeys.unlocked, true);
      return true;
    }
    return false;
  }

  function renderLogin(root) {
    root.innerHTML = `
      <article class="glass-card admin-login">
        <div class="glass-card-content">
          <p class="admin-badge">Protected</p>
          <h2>Admin unlock</h2>
          <p>Use the local passphrase to open the control surface.</p>
          <form id="admin-login-form">
            <input type="password" name="password" placeholder="Passphrase">
            <button class="btn btn-primary hover-target" type="submit">Unlock</button>
            <p id="admin-login-status" class="form-note"></p>
          </form>
        </div>
      </article>
    `;

    root.querySelector('#admin-login-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const password = new FormData(event.currentTarget).get('password') || '';
      const status = root.querySelector('#admin-login-status');
      if (unlock(String(password))) {
        renderDashboard(root);
      } else {
        status.textContent = 'Incorrect passphrase.';
      }
    });
  }

  function renderDashboard(root) {
    const posts = getBlogPosts();
    const projects = getProjects();
    const messages = getMessages();
    const chats = getChats();
    const subscribers = getSubscribers();

    root.innerHTML = `
      <section class="admin-stat-grid">
        <div class="admin-stat"><strong>${posts.length}</strong><span>Posts</span></div>
        <div class="admin-stat"><strong>${projects.length}</strong><span>Projects</span></div>
        <div class="admin-stat"><strong>${messages.length + chats.length}</strong><span>Messages</span></div>
        <div class="admin-stat"><strong>${subscribers.length}</strong><span>Subscribers</span></div>
      </section>
      <div class="admin-tabs">
        <button class="admin-tab is-active" data-tab="posts">Posts</button>
        <button class="admin-tab" data-tab="projects">Projects</button>
        <button class="admin-tab" data-tab="messages">Inbox</button>
        <button class="admin-tab" data-tab="subscribers">Subscribers</button>
      </div>
      <div class="admin-grid">
        <article class="glass-card admin-panel">
          <div class="glass-card-content">
            <div id="admin-panel-content"></div>
          </div>
        </article>
        <article class="glass-card admin-panel">
          <div class="glass-card-content">
            <p class="admin-badge">Quick add</p>
            <form id="admin-form" class="admin-form"></form>
          </div>
        </article>
      </div>
    `;

    const content = root.querySelector('#admin-panel-content');
    const form = root.querySelector('#admin-form');
    const tabs = root.querySelectorAll('.admin-tab');

    const renderTab = (tab) => {
      tabs.forEach((item) => item.classList.toggle('is-active', item.dataset.tab === tab));
      if (tab === 'posts') {
        content.innerHTML = `<div class="admin-list">${posts.map((post) => `<div class="admin-item"><strong>${post.title}</strong><p>${post.category} · ${utils.formatDate(post.date)}</p></div>`).join('')}</div>`;
        form.innerHTML = `
          <input name="title" placeholder="Post title" required>
          <input name="slug" placeholder="Slug" required>
          <input name="date" type="date" required>
          <input name="category" placeholder="Category" required>
          <textarea name="excerpt" placeholder="Excerpt" required></textarea>
          <textarea name="content" placeholder="Markdown content" required></textarea>
          <button class="btn btn-primary hover-target" type="submit">Save post</button>
        `;
      } else if (tab === 'projects') {
        content.innerHTML = `<div class="admin-list">${projects.map((project) => `<div class="admin-item"><strong>${project.title}</strong><p>${project.status} · ${project.progress}%</p></div>`).join('')}</div>`;
        form.innerHTML = `
          <input name="title" placeholder="Project title" required>
          <input name="slug" placeholder="Slug" required>
          <input name="subtitle" placeholder="Subtitle" required>
          <textarea name="summary" placeholder="Summary" required></textarea>
          <textarea name="details" placeholder="Details" required></textarea>
          <input name="progress" type="number" min="0" max="100" placeholder="Progress" required>
          <button class="btn btn-primary hover-target" type="submit">Save project</button>
        `;
      } else if (tab === 'messages') {
        const inbox = [...messages, ...chats];
        content.innerHTML = `<div class="admin-list">${inbox.slice().reverse().map((entry) => `<div class="admin-item"><strong>${entry.name || entry.role || 'Visitor'}</strong><p>${entry.message}</p></div>`).join('')}</div>`;
        form.innerHTML = `<p class="form-note">Inbox is read-only in this static build.</p>`;
      } else {
        content.innerHTML = `<div class="admin-list">${subscribers.map((entry) => `<div class="admin-item"><strong>${entry.email}</strong><p>${entry.name || 'Subscriber'} · ${utils.formatDate(entry.when || new Date().toISOString())}</p></div>`).join('')}</div>`;
        form.innerHTML = `<p class="form-note">Subscribers are stored locally until Firebase is connected.</p>`;
      }
    };

    tabs.forEach((tab) => tab.addEventListener('click', () => renderTab(tab.dataset.tab)));
    renderTab('posts');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const currentTab = root.querySelector('.admin-tab.is-active')?.dataset.tab;
      const formData = new FormData(form);

      if (currentTab === 'posts') {
        const next = getBlogPosts();
        next.unshift({
          slug: String(formData.get('slug') || ''),
          title: String(formData.get('title') || ''),
          date: String(formData.get('date') || new Date().toISOString().slice(0, 10)),
          category: String(formData.get('category') || 'General'),
          tags: [],
          excerpt: String(formData.get('excerpt') || ''),
          content: String(formData.get('content') || '')
        });
        utils.saveJSON(storageKeys.blog, next);
      }

      if (currentTab === 'projects') {
        const next = getProjects();
        next.unshift({
          slug: String(formData.get('slug') || ''),
          title: String(formData.get('title') || ''),
          subtitle: String(formData.get('subtitle') || ''),
          summary: String(formData.get('summary') || ''),
          details: String(formData.get('details') || ''),
          progress: Number(formData.get('progress') || 0),
          accent: 'industrial-blue',
          tags: [],
          status: 'Draft',
          tools: []
        });
        utils.saveJSON(storageKeys.projects, next);
      }

      renderDashboard(root);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('admin-root');
    if (!root) {
      return;
    }
    if (isUnlocked()) {
      renderDashboard(root);
    } else {
      renderLogin(root);
    }
  });
})();

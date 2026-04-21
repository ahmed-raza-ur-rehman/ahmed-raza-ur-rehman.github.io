(() => {
  const data = window.PORTFOLIO_DATA;
  const utils = window.PORTFOLIO_UTILS;
  const storageKeys = {
    subscribers: 'portfolio_subscribers',
    messages: 'portfolio_messages',
    chats: 'portfolio_chat_messages',
    scores: 'portfolio_game_scores',
    blog: 'portfolio_blog_posts',
    projects: 'portfolio_projects',
    settings: 'portfolio_settings',
    adminUnlocked: 'portfolio_admin_unlocked'
  };

  function getStoredBlogPosts() {
    return utils.loadJSON(storageKeys.blog, data.blogPosts);
  }

  function getStoredProjects() {
    return utils.loadJSON(storageKeys.projects, data.projects);
  }

  class AppShell {
    constructor() {
      this.html = document.documentElement;
      this.body = document.body;
      this.nav = document.querySelector('.site-nav');
      this.toggle = document.querySelector('.site-nav__toggle');
      this.panel = document.querySelector('.site-nav__panel');
      this.wrapper = document.getElementById('smooth-wrapper');
      this.content = document.getElementById('smooth-content');
      this.contentHeight = 0;
      this.currentY = 0;
      this.targetY = 0;
      this.ease = 0.08;
      this.smoothEnabled = false;
      this.ticking = false;
    }

    init() {
      this.initSmoothScroll();
      this.initNav();
      this.initReveals();
      this.initScrollSpy();
      this.initMobileNav();
      this.syncYear();
      this.bindHashNavigation();
    }

    initSmoothScroll() {
      if (!this.wrapper || !this.content) {
        return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
      const supportsHover = window.matchMedia('(hover: hover)').matches;

      this.smoothEnabled = supportsFinePointer && supportsHover && !prefersReducedMotion;
      if (!this.smoothEnabled) {
        return;
      }

      this.html.classList.add('has-smooth-scroll');
      this.measure();

      const resizeObserver = new ResizeObserver(() => this.measure());
      resizeObserver.observe(this.content);

      window.addEventListener('resize', () => this.measure(), { passive: true });
      window.addEventListener('scroll', () => {
        this.targetY = window.scrollY;
        this.requestTick();
      }, { passive: true });

      this.requestTick();
    }

    measure() {
      this.contentHeight = this.content.getBoundingClientRect().height;
      this.body.style.height = `${this.contentHeight}px`;
    }

    requestTick() {
      if (this.ticking) {
        return;
      }

      this.ticking = true;
      requestAnimationFrame(() => this.render());
    }

    render() {
      this.currentY += (this.targetY - this.currentY) * this.ease;
      if (Math.abs(this.targetY - this.currentY) < 0.05) {
        this.currentY = this.targetY;
      }

      this.content.style.transform = `translate3d(0, -${this.currentY}px, 0)`;
      this.ticking = false;

      if (Math.abs(this.targetY - this.currentY) > 0.05) {
        this.requestTick();
      }
    }

    initNav() {
      if (!this.nav) {
        return;
      }

      const updateNavState = () => {
        this.nav.classList.toggle('scrolled', window.scrollY > 24);
      };

      window.addEventListener('scroll', updateNavState, { passive: true });
      updateNavState();
    }

    initMobileNav() {
      if (!this.toggle || !this.panel) {
        return;
      }

      const closePanel = () => {
        this.panel.classList.remove('is-open');
        this.toggle.setAttribute('aria-expanded', 'false');
      };

      this.toggle.addEventListener('click', () => {
        const isOpen = this.panel.classList.toggle('is-open');
        this.toggle.setAttribute('aria-expanded', String(isOpen));
      });

      this.panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closePanel));

      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
          closePanel();
        }
      }, { passive: true });

      document.addEventListener('click', (event) => {
        if (!this.panel.contains(event.target) && !this.toggle.contains(event.target)) {
          closePanel();
        }
      });
    }

    initReveals() {
      const reveals = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) {
        reveals.forEach((element) => element.classList.add('active'));
        return;
      }

      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            instance.unobserve(entry.target);
          }
        });
      }, { root: null, threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

      reveals.forEach((element) => observer.observe(element));
    }

    initScrollSpy() {
      const links = Array.from(document.querySelectorAll('.nav-links a'));
      const targets = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
      if (!targets.length) {
        return;
      }

      const setActive = (id) => {
        links.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
          if (isActive) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      };

      if ('IntersectionObserver' in window) {
        const spy = new IntersectionObserver((entries) => {
          const visibleEntry = entries.find((entry) => entry.isIntersecting);
          if (visibleEntry) {
            setActive(visibleEntry.target.id);
          }
        }, { root: null, threshold: 0.45, rootMargin: '-20% 0px -45% 0px' });

        targets.forEach((target) => spy.observe(target));
      }
    }

    bindHashNavigation() {
      const scrollToHash = () => {
        if (!window.location.hash) {
          return;
        }

        const target = document.querySelector(window.location.hash);
        if (!target) {
          return;
        }

        if (this.smoothEnabled) {
          this.targetY = target.getBoundingClientRect().top + window.scrollY;
          this.requestTick();
          return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      window.addEventListener('hashchange', scrollToHash);
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
          const hash = link.getAttribute('href');
          const target = hash ? document.querySelector(hash) : null;
          if (!target) {
            return;
          }

          event.preventDefault();
          history.pushState(null, '', hash);
          scrollToHash();
        });
      });

      scrollToHash();
    }

    syncYear() {
      const yearNode = document.querySelector('[data-year]');
      if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
      }
    }
  }

  async function initHero() {
    const canvas = document.querySelector('[data-hero-canvas]');
    const fallback = document.querySelector('.hero-canvas-fallback');
    if (!canvas) {
      if (fallback) {
        fallback.classList.add('is-visible');
      }
      return;
    }

    let THREE = window.THREE;
    if (!THREE || !THREE.Scene) {
      try {
        THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
      } catch {
        if (fallback) {
          fallback.classList.add('is-visible');
        }
        return;
      }
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = (navigator.deviceMemory && navigator.deviceMemory <= 4) || window.innerWidth < 768;
    if (reducedMotion || lowPower) {
      if (fallback) {
        fallback.classList.add('is-visible');
      }
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1.8, 8.4);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const group = new THREE.Group();
    scene.add(group);

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 0.12, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x11304d, metalness: 0.45, roughness: 0.35 })
    );
    group.add(board);

    const edgeGlow = new THREE.Mesh(
      new THREE.BoxGeometry(5.72, 0.14, 3.32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.08 })
    );
    group.add(edgeGlow);

    const traces = new THREE.Group();
    const traceMaterial = new THREE.LineBasicMaterial({ color: 0x2e6da4, transparent: true, opacity: 0.85 });
    const tracePoints = [
      [-2.2, 0.08, -1.1], [-1.1, 0.08, -1.1], [-1.1, 0.08, 0.6], [0.4, 0.08, 0.6],
      [1.2, 0.08, -0.7], [2.1, 0.08, -0.7], [2.1, 0.08, 1.0], [-2.0, 0.08, 1.0]
    ];
    for (let index = 0; index < tracePoints.length - 1; index++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...tracePoints[index]),
        new THREE.Vector3(...tracePoints[index + 1])
      ]);
      traces.add(new THREE.Line(geometry, traceMaterial));
    }
    group.add(traces);

    const sparkGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const sparkMaterial = new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 1.4 });
    const sparkPositions = [
      [-2.2, 0.12, -1.1], [-1.1, 0.12, 0.6], [0.4, 0.12, 0.6], [1.2, 0.12, -0.7], [2.1, 0.12, 1.0]
    ];
    const sparks = sparkPositions.map((position) => {
      const mesh = new THREE.Mesh(sparkGeometry, sparkMaterial.clone());
      mesh.position.set(position[0], position[1], position[2]);
      group.add(mesh);
      return mesh;
    });

    const particleCount = 90;
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index++) {
      positions[index * 3] = (Math.random() - 0.5) * 14;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointMaterial = new THREE.PointsMaterial({ color: 0x9beeff, size: 0.045, transparent: true, opacity: 0.9 });
    const points = new THREE.Points(pointsGeometry, pointMaterial);
    scene.add(points);

    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    const key = new THREE.DirectionalLight(0x9beeff, 2.1);
    key.position.set(4, 5, 6);
    const fill = new THREE.PointLight(0x2e6da4, 4.5, 30);
    fill.position.set(-3, 2, 5);
    scene.add(ambient, key, fill);

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('pointermove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    const clock = new THREE.Clock();
    function animate() {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * 0.18;
      group.rotation.x = Math.sin(elapsed * 0.4) * 0.08;
      camera.position.x += (mouseX * 0.9 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.5 + 1.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      sparks.forEach((spark, index) => {
        spark.position.y = 0.12 + Math.sin(elapsed * 2 + index) * 0.03;
      });
      points.rotation.y = elapsed * 0.04;
      points.rotation.x = elapsed * 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }, { passive: true });
  }

  function countUpCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) {
      return;
    }
    const animateCounter = (node) => {
      const target = Number(node.getAttribute('data-count'));
      if (Number.isNaN(target)) {
        return;
      }
      const duration = 1100;
      const start = performance.now();
      const startValue = 0;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = startValue + (target - startValue) * progress;
        node.textContent = target % 1 === 0 ? String(Math.round(value)) : value.toFixed(2);
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            instance.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach((counter) => observer.observe(counter));
      return;
    }
    counters.forEach(animateCounter);
  }

  function renderSkillGalaxy() {
    const stage = document.getElementById('skill-galaxy');
    const detail = document.getElementById('skill-detail');
    const filterRow = document.getElementById('skill-filters');
    if (!stage || !detail || !filterRow || !data) {
      return;
    }

    const domainMap = [
      ['hardware', data.skills.hardware],
      ['embedded', data.skills.embedded],
      ['electronics', data.skills.electronics],
      ['software', data.skills.software],
      ['creative', data.skills.creative]
    ];

    const nodes = [];
    stage.innerHTML = '';
    const clusterWrap = document.createElement('div');
    clusterWrap.className = 'skill-galaxy__clusters';

    domainMap.forEach(([domain, skills], index) => {
      const cluster = document.createElement('button');
      cluster.type = 'button';
      cluster.className = 'skill-cluster';
      cluster.dataset.domain = domain;
      cluster.style.setProperty('--cluster-x', `${14 + index * 16}%`);
      cluster.style.setProperty('--cluster-y', `${18 + (index % 2) * 28}%`);
      cluster.innerHTML = `<strong>${domain}</strong><span>${skills.length} skills</span>`;
      clusterWrap.appendChild(cluster);

      skills.forEach((skill, skillIndex) => {
        const node = document.createElement('button');
        node.type = 'button';
        node.className = 'skill-node';
        node.dataset.domain = domain;
        node.dataset.name = skill.name;
        node.dataset.level = skill.level;
        node.dataset.description = skill.description;
        node.style.left = `${12 + index * 16 + (skillIndex % 4) * 10}%`;
        node.style.top = `${18 + ((skillIndex * 17 + index * 13) % 60)}%`;
        node.textContent = skill.name;
        nodes.push(node);
        stage.appendChild(node);
      });
    });

    stage.appendChild(clusterWrap);

    const setDetail = (skill) => {
      detail.innerHTML = `
        <p class="skill-detail__label">${skill.level}</p>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
      `;
    };

    const setFilter = (filter) => {
      stage.dataset.filter = filter;
      filterRow.querySelectorAll('.filter-chip').forEach((chip) => {
        chip.classList.toggle('is-active', chip.dataset.filter === filter);
      });
      nodes.forEach((node) => {
        const visible = filter === 'all' || node.dataset.domain === filter;
        node.classList.toggle('is-hidden', !visible);
      });
      clusterWrap.querySelectorAll('.skill-cluster').forEach((cluster) => {
        cluster.classList.toggle('is-dimmed', filter !== 'all' && cluster.dataset.domain !== filter);
      });
    };

    nodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        setDetail({ name: node.dataset.name, level: node.dataset.level, description: node.dataset.description });
      });
      node.addEventListener('click', () => {
        setFilter(node.dataset.domain);
      });
    });

    clusterWrap.querySelectorAll('.skill-cluster').forEach((cluster) => {
      cluster.addEventListener('click', () => setFilter(cluster.dataset.domain));
    });

    filterRow.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => setFilter(chip.dataset.filter));
    });

    stage.addEventListener('click', (event) => {
      if (event.target === stage) {
        setFilter('all');
      }
    });

    setFilter('all');
    if (data.skills.hardware[0]) {
      setDetail(data.skills.hardware[0]);
    }
  }

  function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !data) {
      return;
    }

    grid.innerHTML = getStoredProjects().map((project) => `
      <article class="project-card glass-card project-card--${project.accent}">
        <div class="glass-card-content">
          <p class="project-card__eyebrow">${project.subtitle}</p>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <p class="project-card__details">${project.details}</p>
          <div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          <div class="project-progress"><span style="width:${project.progress}%"></span></div>
          <div class="project-meta">
            <strong>${project.status}</strong>
            <span>${project.progress}%</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  function renderInterests() {
    const target = document.getElementById('interest-bento');
    if (!target || !data) {
      return;
    }
    target.innerHTML = data.interests.map((item, index) => `
      <article class="interest-card interest-card--${item.tone} ${index === 0 ? 'interest-card--tall' : ''} ${index === 3 ? 'interest-card--tall-right' : ''}">
        <div class="glass-card-content">
          <p class="project-card__eyebrow">${item.title}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `).join('');
  }

  function renderBlogPreview() {
    const target = document.getElementById('blog-preview');
    if (!target || !data) {
      return;
    }

    const latest = [...getStoredBlogPosts()].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    target.innerHTML = latest.map((post) => `
      <article class="blog-card glass-card">
        <div class="glass-card-content">
          <p class="project-card__eyebrow">${post.category} · ${utils.formatDate(post.date)} · ${utils.readTimeFromMarkdown(post.content)} min read</p>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="project-tags">${post.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          <a class="btn btn-outline hover-target" href="blog/post.html?slug=${post.slug}">Read post</a>
        </div>
      </article>
    `).join('');
  }

  function renderLeaderboard() {
    const list = document.getElementById('leaderboard');
    if (!list || !data) {
      return;
    }
    const scores = utils.loadJSON(storageKeys.scores, data.leaderboardSeed);
    const sorted = [...scores].sort((a, b) => Number(b.score) - Number(a.score)).slice(0, 5);
    list.innerHTML = sorted.map((entry, index) => `<li><span>${index + 1}. ${entry.name}</span><strong>${entry.score}</strong></li>`).join('');
  }

  function updateLeaderboard(name, score) {
    const scores = utils.loadJSON(storageKeys.scores, data.leaderboardSeed);
    scores.push({ name, score, when: new Date().toISOString() });
    utils.saveJSON(storageKeys.scores, scores);
    renderLeaderboard();
  }

  function renderGames() {
    const target = document.getElementById('game-center');
    if (!target || !data) {
      return;
    }

    const reactionState = { armed: false, waiting: false, startAt: 0, result: '' };
    const logicQuestions = [
      { q: 'All boards are circuits. All circuits need traces. Therefore:', options: ['All boards need traces', 'Some boards need traces', 'No boards need traces'], answer: 0 },
      { q: 'What comes next: 2, 4, 8, 16, ?', options: ['18', '24', '32'], answer: 2 },
      { q: 'Book is to reading as fork is to:', options: ['metal', 'eating', 'kitchen'], answer: 1 }
    ];
    const memoryGrid = [0, 1, 2, 3];

    const html = `
      <article class="glass-card game-card" data-game="reaction">
        <div class="glass-card-content">
          <p class="lab-chip">Reaction Race</p>
          <p>Wait for the signal, then click as quickly as possible.</p>
          <button class="btn btn-primary hover-target" data-action="reaction-start">Start</button>
          <div class="game-stage" data-stage="reaction"><span>Ready</span></div>
          <p class="game-result" data-result="reaction"></p>
        </div>
      </article>
      <article class="glass-card game-card" data-game="logic">
        <div class="glass-card-content">
          <p class="lab-chip">Logic Lift</p>
          <p>Short reasoning quiz inspired by the AIDE logic module.</p>
          <div class="game-stage game-stage--stack" data-stage="logic"></div>
          <button class="btn btn-outline hover-target" data-action="logic-next">Next question</button>
          <p class="game-result" data-result="logic"></p>
        </div>
      </article>
      <article class="glass-card game-card" data-game="memory">
        <div class="glass-card-content">
          <p class="lab-chip">Memory Matrix</p>
          <p>Remember the highlighted cells and repeat them.</p>
          <button class="btn btn-primary hover-target" data-action="memory-start">Start round</button>
          <div class="memory-grid" data-stage="memory"></div>
          <p class="game-result" data-result="memory"></p>
        </div>
      </article>
    `;
    target.innerHTML = html;

    const reactionStage = target.querySelector('[data-stage="reaction"]');
    const reactionResult = target.querySelector('[data-result="reaction"]');
    const reactionStart = target.querySelector('[data-action="reaction-start"]');
    const logicStage = target.querySelector('[data-stage="logic"]');
    const logicResult = target.querySelector('[data-result="logic"]');
    const logicNext = target.querySelector('[data-action="logic-next"]');
    const memoryStage = target.querySelector('[data-stage="memory"]');
    const memoryResult = target.querySelector('[data-result="memory"]');
    const memoryStart = target.querySelector('[data-action="memory-start"]');

    let reactionTimeout = null;
    let reactionActive = false;
    let startTime = 0;

    reactionStart.addEventListener('click', () => {
      reactionResult.textContent = 'Wait for green...';
      reactionStage.innerHTML = '<span>...</span>';
      reactionActive = false;
      clearTimeout(reactionTimeout);
      reactionTimeout = setTimeout(() => {
        reactionActive = true;
        reactionStage.innerHTML = '<button class="reaction-signal">CLICK</button>';
        reactionStage.querySelector('button').addEventListener('click', () => {
          if (!reactionActive) {
            return;
          }
          reactionActive = false;
          const time = Math.round(performance.now() - startTime);
          reactionResult.textContent = `Reaction time ${time} ms.`;
          updateLeaderboard('Ahmed', Math.max(1000 - time, 0));
        }, { once: true });
        startTime = performance.now();
      }, 900 + Math.random() * 2000);
    });

    let logicIndex = 0;
    const renderLogic = () => {
      const question = logicQuestions[logicIndex % logicQuestions.length];
      logicStage.innerHTML = `
        <p>${question.q}</p>
        <div class="logic-options">${question.options.map((option, index) => `<button class="logic-option" data-index="${index}">${option}</button>`).join('')}</div>
      `;
      logicStage.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
          const chosen = Number(button.dataset.index);
          if (chosen === question.answer) {
            logicResult.textContent = 'Correct. Clean reasoning.';
            updateLeaderboard('Ahmed', 1000 + logicIndex * 80);
          } else {
            logicResult.textContent = `Wrong. The answer is ${question.options[question.answer]}.`;
          }
        });
      });
    };
    logicNext.addEventListener('click', () => {
      logicIndex++;
      renderLogic();
    });
    renderLogic();

    let memoryPattern = [];
    let memorySelection = [];
    const renderMemory = () => {
      memoryStage.innerHTML = '';
      for (let index = 0; index < 9; index++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'memory-cell';
        cell.dataset.index = String(index);
        cell.addEventListener('click', () => {
          if (!memoryPattern.length) {
            return;
          }
          cell.classList.toggle('is-selected');
          const selected = Number(cell.dataset.index);
          if (memorySelection.includes(selected)) {
            memorySelection = memorySelection.filter((item) => item !== selected);
          } else {
            memorySelection.push(selected);
          }
          if (memorySelection.length === memoryPattern.length) {
            const correct = memoryPattern.every((item) => memorySelection.includes(item));
            memoryResult.textContent = correct ? 'Pattern matched.' : 'One or more cells were off.';
            if (correct) {
              updateLeaderboard('Ahmed', 900 + memoryPattern.length * 110);
            }
          }
        });
        memoryStage.appendChild(cell);
      }
    };
    memoryStart.addEventListener('click', () => {
      memorySelection = [];
      memoryPattern = [...memoryGrid, Math.floor(Math.random() * 9)].slice(0, 4);
      renderMemory();
      memoryStage.querySelectorAll('button').forEach((button) => button.classList.remove('is-pattern', 'is-selected'));
      memoryPattern.forEach((index) => {
        const cell = memoryStage.querySelector(`[data-index="${index}"]`);
        if (cell) {
          cell.classList.add('is-pattern');
        }
      });
      memoryResult.textContent = 'Memorize the pattern.';
      setTimeout(() => {
        memoryStage.querySelectorAll('button').forEach((button) => button.classList.remove('is-pattern'));
        memoryResult.textContent = 'Repeat the cells.';
      }, 1400);
    });
    renderMemory();
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');
    if (!form || !status) {
      return;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();
      if (!name || !email || !message) {
        status.textContent = 'Fill the required fields.';
        return;
      }
      const messages = utils.loadJSON(storageKeys.messages, []);
      const today = new Date().toISOString().slice(0, 10);
      const submissionsToday = messages.filter((entry) => entry.day === today).length;
      if (submissionsToday >= 3) {
        status.textContent = 'Rate limit reached for today.';
        return;
      }
      messages.push({ name, email, subject: String(formData.get('subject') || 'General'), message, day: today, when: new Date().toISOString() });
      utils.saveJSON(storageKeys.messages, messages);
      form.reset();
      status.textContent = 'Message sent. I will reply within 24 hours.';
    });
  }

  function initChat() {
    const open = document.getElementById('chat-open');
    const closeButtons = Array.from(document.querySelectorAll('#chat-close, #chat_close, #chat-panel .chat-close'));
    const panel = document.getElementById('chat-panel');
    const thread = document.getElementById('chat-thread');
    const form = document.getElementById('chat-form');
    if (!open || !panel || !thread || !form) {
      return;
    }

    const renderThread = () => {
      const threadData = utils.loadJSON(storageKeys.chats, []);
      thread.innerHTML = threadData.slice(-8).map((entry) => `<div class="chat-message ${entry.role}"><strong>${entry.role === 'admin' ? 'Ahmed' : (entry.name || 'Visitor')}</strong><p>${entry.message}</p></div>`).join('');
      thread.scrollTop = thread.scrollHeight;
    };

    const closeChat = () => {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
    };

    open.addEventListener('click', () => {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      renderThread();
    });
    closeButtons.forEach((button) => button.addEventListener('click', closeChat));

    // Defensive delegated fallback in case close button gets re-rendered.
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (target && target.closest('#chat-close, #chat_close, #chat-panel .chat-close')) {
        closeChat();
      }
    });

    // Also handle escape key to close chat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        closeChat();
        open.focus();
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const message = String(formData.get('message') || '').trim();
      if (!message) {
        return;
      }
      const messages = utils.loadJSON(storageKeys.chats, []);
      messages.push({ role: 'visitor', name: String(formData.get('name') || '').trim(), email: String(formData.get('email') || '').trim(), message, when: new Date().toISOString() });
      messages.push({ role: 'admin', message: 'Thanks. I have this and will get back to you within 24 hours.', when: new Date().toISOString() });
      utils.saveJSON(storageKeys.chats, messages);
      form.reset();
      renderThread();
    });

    renderThread();
  }

  function initNewsletter() {
    const banner = document.getElementById('newsletter-banner');
    const form = document.getElementById('newsletter-form');
    if (!banner || !form) {
      return;
    }

    const subscribers = utils.loadJSON(storageKeys.subscribers, []);
    if (subscribers.length === 0) {
      setTimeout(() => {
        banner.hidden = false;
      }, 30000);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const email = String(formData.get('email') || '').trim();
      if (!email) {
        return;
      }
      const current = utils.loadJSON(storageKeys.subscribers, []);
      current.push({ name: String(formData.get('name') || '').trim(), email, when: new Date().toISOString() });
      utils.saveJSON(storageKeys.subscribers, current);
      banner.hidden = true;
      form.reset();
    });
  }

  function initKeyboardEasterEggs() {
    const overlay = document.getElementById('terminal-overlay');
    const output = document.getElementById('terminal-output');
    const closeButtons = Array.from(document.querySelectorAll('#terminal-close, #terminal_close, .terminal-header .chat-close'));
    if (!overlay || !output) {
      return;
    }

    const commands = {
      HELP: 'Commands: HELP, FPGA, MATRIX, KONAMI. Use voice commands with space bar hold.',
      FPGA: 'Circuit takeover for 3 seconds.',
      MATRIX: 'Matrix rain engaged.',
      KONAMI: 'Secret projects unlocked.'
    };

    let buffer = '';
    const closeOverlay = () => {
      overlay.hidden = true;
    };

    const trigger = (key) => {
      if (key === 'HELP') {
        output.textContent = commands.HELP;
        overlay.hidden = false;
      }
      if (key === 'FPGA') {
        document.body.classList.add('flash-circuit');
        setTimeout(() => document.body.classList.remove('flash-circuit'), 3000);
      }
      if (key === 'MATRIX') {
        document.body.classList.add('flash-matrix');
        setTimeout(() => document.body.classList.remove('flash-matrix'), 3000);
      }
      if (key === 'KONAMI') {
        document.body.classList.add('flash-celebration');
        setTimeout(() => document.body.classList.remove('flash-celebration'), 3000);
      }
    };

    closeButtons.forEach((button) => button.addEventListener('click', closeOverlay));

    // Defensive delegated fallback in case close button gets re-rendered.
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (target && target.closest('#terminal-close, #terminal_close, .terminal-header .chat-close')) {
        closeOverlay();
      }
    });

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
      if (/^[a-z]$/i.test(event.key)) {
        buffer = `${buffer}${event.key.toUpperCase()}`.slice(-32);
        Object.keys(commands).forEach((command) => {
          if (buffer.endsWith(command)) {
            trigger(command);
          }
        });
      }
    });

    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const keyBuffer = [];
    document.addEventListener('keydown', (event) => {
      keyBuffer.push(event.key.length === 1 ? event.key.toLowerCase() : event.key);
      if (keyBuffer.length > konami.length) {
        keyBuffer.shift();
      }
      const simplified = keyBuffer.map((item) => item.toLowerCase());
      if (simplified.join(',') === konami.join(',')) {
        trigger('KONAMI');
      }
    });
  }

  function initVoiceControl() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    let recognition = null;
    let active = false;
    const start = () => {
      if (active) {
        return;
      }
      active = true;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const phrase = String(event.results[0][0].transcript || '').toLowerCase();
        const targetMap = {
          projects: '#projects',
          about: '#about',
          contact: '#contact',
          skills: '#skills',
          blog: '#blog'
        };
        const match = Object.keys(targetMap).find((key) => phrase.includes(key));
        if (match) {
          document.querySelector(targetMap[match])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      recognition.onend = () => {
        active = false;
      };
      recognition.start();
    };

    document.addEventListener('keydown', (event) => {
      const tag = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target?.isContentEditable) {
        return;
      }
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault();
        start();
      }
    });
  }

  function initCameraLab() {
    const enable = document.getElementById('camera-enable');
    const selfie = document.getElementById('camera-selfie');
    const video = document.getElementById('camera-video');
    const overlay = document.getElementById('camera-overlay');
    const status = document.getElementById('camera-status');
    if (!enable || !selfie || !video || !overlay || !status) {
      return;
    }

    const context = overlay.getContext('2d');
    let stream = null;

    const resizeOverlay = () => {
      const rect = video.getBoundingClientRect();
      overlay.width = rect.width * window.devicePixelRatio;
      overlay.height = rect.height * window.devicePixelRatio;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    enable.addEventListener('click', async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        video.srcObject = stream;
        status.textContent = 'Camera active. No data leaves your device.';
        resizeOverlay();
        window.addEventListener('resize', resizeOverlay, { passive: true });
      } catch {
        status.textContent = 'Camera permission denied or unavailable.';
      }
    });

    selfie.addEventListener('click', () => {
      if (!stream) {
        status.textContent = 'Enable the camera first.';
        return;
      }
      const snapshot = document.createElement('canvas');
      snapshot.width = video.videoWidth || 1280;
      snapshot.height = video.videoHeight || 720;
      const snapshotContext = snapshot.getContext('2d');
      snapshotContext.drawImage(video, 0, 0, snapshot.width, snapshot.height);
      snapshotContext.fillStyle = 'rgba(0, 212, 255, 0.22)';
      snapshotContext.fillRect(0, 0, snapshot.width, snapshot.height);
      const link = document.createElement('a');
      link.href = snapshot.toDataURL('image/png');
      link.download = 'ahmed-raza-ur-rehman-selfie.png';
      link.click();
      status.textContent = 'Selfie downloaded.';
    });
  }

  function initAboutStats() {
    countUpCounters();
  }

  function initContactMap() {
    const card = document.querySelector('.contact-card');
    if (!card) {
      return;
    }
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--pointer-x', `${x}%`);
      card.style.setProperty('--pointer-y', `${y}%`);
    });
  }

  function initEverything() {
    initHero();
    initAboutStats();
    renderSkillGalaxy();
    renderProjects();
    renderInterests();
    renderBlogPreview();
    renderLeaderboard();
    renderGames();
    initContactForm();
    initContactMap();
    initChat();
    initNewsletter();
    initKeyboardEasterEggs();
    initVoiceControl();
    initCameraLab();
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.appShell = new AppShell();
    window.appShell.init();
    initEverything();
  });
})();

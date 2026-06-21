/* ═══════════════════════════════════════════════════════
   BHASKAR MISHRA — Portfolio JavaScript
   Animations, Navigation, Interactivity
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Particle Background ──
  initParticles();

  // ── Navbar Scroll Effect ──
  initNavbar();

  // ── Mobile Menu ──
  initMobileMenu();

  // ── Scroll Reveal Animations ──
  initScrollReveal();

  // ── Skill Bar Animations ──
  initSkillBars();

  // ── Stat Counter Animation ──
  initCounters();

  // ── Active Nav Link Tracking ──
  initActiveNavTracking();

  // ── Back to Top ──
  initBackToTop();

  // ── Contact Form ──
  initContactForm();
});


/* ═══════════════════════════════════════
   PARTICLE BACKGROUND
   ═══════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}


/* ═══════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });
}


/* ═══════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════ */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}


/* ═══════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations within the same observation batch
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════
   SKILL BARS
   ═══════════════════════════════════════ */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width');
        entry.target.style.width = targetWidth + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
}


/* ═══════════════════════════════════════
   COUNTER ANIMATION
   ═══════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const suffix = element.getAttribute('data-suffix') || '';
  const prefix = element.getAttribute('data-prefix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  function update() {
    current += step;
    if (current >= target) {
      element.textContent = prefix + target + suffix;
      return;
    }
    element.textContent = prefix + Math.floor(current) + suffix;
    requestAnimationFrame(update);
  }
  update();
}


/* ═══════════════════════════════════════
   ACTIVE NAV TRACKING
   ═══════════════════════════════════════ */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}


/* ═══════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ═══════════════════════════════════════
   CONTACT FORM (Basic Validation)
   ═══════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#form-name').value.trim();
    const email = form.querySelector('#form-email').value.trim();
    const subject = form.querySelector('#form-subject').value.trim();
    const message = form.querySelector('#form-message').value.trim();

    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Build mailto link as a simple solution
    const mailtoLink = `mailto:erbhaskarm@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;

    showFormMessage('Opening your email client...', 'success');
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(text, type) {
  // Remove existing message
  const existing = document.querySelector('.form-message');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className = `form-message form-message-${type}`;
  msg.textContent = text;
  msg.style.cssText = `
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 500;
    margin-top: 12px;
    background: ${type === 'success' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
    color: ${type === 'success' ? '#22d3ee' : '#f87171'};
    border: 1px solid ${type === 'success' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  `;

  const form = document.getElementById('contact-form');
  form.appendChild(msg);

  setTimeout(() => msg.remove(), 5000);
}

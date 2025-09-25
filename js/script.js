// Greeting, scroll progress, reveal on scroll, active nav, modals, fake form submit
document.addEventListener('DOMContentLoaded', () => {
  // ---- Greeting + year ----
  const hour = new Date().getHours();
  const greeting = document.getElementById('greeting');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (greeting) {
    let msg = 'Hello!';
    if (hour < 12) msg = 'Good morning!';
    else if (hour < 18) msg = 'Good afternoon!';
    else msg = 'Good evening!';
    greeting.textContent = msg;
  }

  // ---- Scroll progress bar ----
  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // ---- Reveal on scroll (motion-safe) ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('[data-animate]');

  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // ---- Active nav highlight ----
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = navLinks.find(a => a.getAttribute('href') === `#${id}`);
        if (link) {
          if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        }
      });
    }, { rootMargin: '-50% 0px -40% 0px', threshold: 0.01 });
    sections.forEach(sec => navIO.observe(sec));
  }

  // ---- Modals (native <dialog>) ----
  const openers = document.querySelectorAll('[data-open]');
  openers.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open');
      const dlg = document.getElementById(id);
      if (!dlg) return;
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', ''); // very old fallback
    });
  });

  document.querySelectorAll('dialog.modal').forEach(dlg => {
    // Close when clicking the X
    dlg.querySelector('.modal__close')?.addEventListener('click', () => dlg.close());

    // Close when clicking the backdrop
    dlg.addEventListener('click', (e) => {
      const win = dlg.querySelector('.modal__window');
      const r = win.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) dlg.close();
    });
  });

  // ---- Fake contact submit (no backend) ----
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (status) status.textContent = 'Thanks! Your message has been “sent” (demo only).';
    form.reset();
  });
});

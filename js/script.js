// Greeting by time of day + current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const hour = new Date().getHours();
  const greeting = document.getElementById('greeting');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  let msg = 'Hello!';
  if (hour < 12) msg = 'Good morning!';
  else if (hour < 18) msg = 'Good afternoon!';
  else msg = 'Good evening!';
  greeting.textContent = msg;

  // Theme toggle with persistence
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  const setPressed = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  };
  setPressed();

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setPressed();
  });

  // Fake contact form submit (no backend)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Thanks! Your message has been “sent” (demo only).';
    form.reset();
  });
});


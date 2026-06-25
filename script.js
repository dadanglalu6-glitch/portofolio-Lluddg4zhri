const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  }
});
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 20);
});
const allSections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  allSections.forEach(sec => {
    if (scrollY + 80 >= sec.offsetTop && scrollY + 80 < sec.offsetTop + sec.offsetHeight) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`nav a[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
  });
});
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('show', scrollY > 400));
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const msg = document.getElementById('message');
  const nameErr = document.getElementById('nameErr');
  const emailErr = document.getElementById('emailErr');
  const msgErr = document.getElementById('msgErr');
  const success = document.getElementById('successMsg');
  let valid = true;
  [name, email, msg].forEach(el => el.classList.remove('err-input'));
  [nameErr, emailErr, msgErr].forEach(el => el.textContent = '');
  success.classList.remove('show');

  if (!name.value.trim()) {
    nameErr.textContent = '⚠ Nama tidak boleh kosong.';
    name.classList.add('err-input'); valid = false;
  }
  if (!email.value.trim()) {
    emailErr.textContent = '⚠ Email tidak boleh kosong.';
    email.classList.add('err-input'); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailErr.textContent = '⚠ Format email tidak valid.';
    email.classList.add('err-input'); valid = false;
  }
  if (msg.value.trim().length < 10) {
    msgErr.textContent = '⚠ Pesan minimal 10 karakter.';
    msg.classList.add('err-input'); valid = false;
  }

  if (valid) {
    success.classList.add('show');
    e.target.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }
});
const bars = document.querySelectorAll('.bar-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('go'); barObs.unobserve(en.target); } });
}, { threshold: 0.3 });
bars.forEach(b => barObs.observe(b));
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => { m.classList.remove('open'); document.body.style.overflow = ''; });
});
const fadeItems = document.querySelectorAll('.project-card, .card, .cert-card, .soft-item, .tl-item');
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => { en.target.style.opacity = '1'; en.target.style.transform = 'translateY(0)'; }, i * 60);
      fadeObs.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });
fadeItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObs.observe(el);
});

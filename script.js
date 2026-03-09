/* ============================================
   BRO CARS - Main JavaScript
   ============================================ */

// ─── Mobile Menu ───────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ─── Hero Slideshow ─────────────────────────
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let slideTimer;

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');
}

function nextSlide() { goToSlide(current + 1); }

if (slides.length > 0) {
  slideTimer = setInterval(nextSlide, 4000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(i);
      slideTimer = setInterval(nextSlide, 4000);
    });
  });
}

// ─── FAQ Accordion ──────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.style.maxHeight = null;
    });
    // Open clicked (if wasn't open)
    if (!isOpen) {
      btn.classList.add('open');
      btn.nextElementSibling.style.maxHeight =
        btn.nextElementSibling.scrollHeight + 'px';
    }
  });
});

// ─── Active Nav Link ────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ─── Ads Page Filter ────────────────────────
const fuelFilter = document.getElementById('fuelFilter');
const transFilter = document.getElementById('transFilter');

function filterCards() {
  const fuel = fuelFilter?.value.toLowerCase() || '';
  const trans = transFilter?.value.toLowerCase() || '';

  document.querySelectorAll('.car-card[data-fuel]').forEach(card => {
    const cardFuel = card.dataset.fuel.toLowerCase();
    const cardTrans = card.dataset.trans.toLowerCase();
    const matchFuel = !fuel || cardFuel === fuel;
    const matchTrans = !trans || cardTrans === trans;
    card.style.display = matchFuel && matchTrans ? '' : 'none';
  });
}

if (fuelFilter) fuelFilter.addEventListener('change', filterCards);
if (transFilter) transFilter.addEventListener('change', filterCards);

// ─── Sell Form Submit ───────────────────────
const sellForm = document.getElementById('sellForm');
if (sellForm) {
  sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Your listing has been submitted! We\'ll review it shortly.');
    sellForm.reset();
  });
}

// ─── Contact Form Submit ────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Message sent! We\'ll get back to you soon.');
    contactForm.reset();
  });
}

// ─── Auth Forms ──────────────────────────────
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Signed in successfully!');
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('regPw').value;
    const pw2 = document.getElementById('regPw2').value;
    if (pw !== pw2) {
      alert('❌ Passwords do not match.');
      return;
    }
    alert('✅ Account created! You can now sign in.');
  });
}





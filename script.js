// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar?.classList.add('scrolled');
    backToTop?.classList.add('show');
  } else {
    navbar?.classList.remove('scrolled');
    backToTop?.classList.remove('show');
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.id;
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== TYPING ANIMATION =====
const typedEl = document.getElementById('typed-text');
const phrases = ['Build Websites', 'Create QR Codes', 'Boost Businesses Online', 'Design Landing Pages', 'Develop Web Apps', 'Grow Your Brand'];
let phraseIdx = 0, charIdx = 0, deleting = false;

function typeEffect() {
  if (!typedEl) return;
  const currentPhrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = currentPhrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentPhrase.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dots span');
let currentSlide = 0;
let sliderTimer;

function goToSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

function startSlider() {
  sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(sliderTimer);
    goToSlide(i);
    startSlider();
  });
});

if (slides.length > 0) {
  goToSlide(0);
  startSlider();
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '+');
  }, 16);
}

// ===== SCROLL ANIMATIONS (AOS-like) =====
const aosElements = document.querySelectorAll('[data-aos]');
const counterEls = document.querySelectorAll('.counter-number');
const countersAnimated = new Set();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

aosElements.forEach((el, i) => {
  if (!el.style.transitionDelay) {
    const delay = el.dataset.aosDelay || 0;
    el.style.transitionDelay = `${delay}ms`;
  }
  observer.observe(el);
});

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
      countersAnimated.add(entry.target);
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ===== TESTIMONIALS SLIDER =====
const tTrack = document.querySelector('.testimonials-track');
const tDots = document.querySelectorAll('.t-dots span');
const tSlides = document.querySelectorAll('.testimonial-slide');
let tCurrent = 0;
let tTimer;

function goToTestimonial(n) {
  tCurrent = (n + tSlides.length) % tSlides.length;
  if (tTrack) tTrack.style.transform = `translateX(-${tCurrent * 100}%)`;
  tDots.forEach(d => d.classList.remove('active'));
  tDots[tCurrent]?.classList.add('active');
}

document.querySelector('.t-prev')?.addEventListener('click', () => {
  clearInterval(tTimer);
  goToTestimonial(tCurrent - 1);
  startTSlider();
});
document.querySelector('.t-next')?.addEventListener('click', () => {
  clearInterval(tTimer);
  goToTestimonial(tCurrent + 1);
  startTSlider();
});
tDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(tTimer);
    goToTestimonial(i);
    startTSlider();
  });
});

function startTSlider() {
  tTimer = setInterval(() => goToTestimonial(tCurrent + 1), 5000);
}

if (tSlides.length > 0) {
  goToTestimonial(0);
  startTSlider();
}

// ===== LIGHTBOX =====
const lightbox = document.querySelector('.lightbox-overlay');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxIcon = document.querySelector('.lightbox-icon');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDesc = document.querySelector('.lightbox-desc');

function openLightbox(icon, title, desc) {
  if (!lightbox) return;
  lightboxIcon.textContent = icon;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent = desc;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

document.querySelectorAll('[data-lightbox]').forEach(card => {
  card.addEventListener('click', () => {
    openLightbox(
      card.dataset.icon || '🖼️',
      card.dataset.title || 'Project',
      card.dataset.desc || ''
    );
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const success = document.querySelector('.form-success');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Integrate with Formspree: change action URL to your Formspree endpoint
  // const formData = new FormData(contactForm);
  // await fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: formData });

  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    contactForm.reset();
    if (success) { success.style.display = 'block'; setTimeout(() => success.style.display = 'none', 4000); }
  }, 1200);
});

// ===== BACK TO TOP =====
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SMOOTH SCROLL (all anchor links) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 56;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

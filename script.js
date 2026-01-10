// single-page interactions: theme, mobile nav, navbar scroll, reveal & timeline, contact handler
(function () {

  /* =====================
     THEME TOGGLE
  ===================== */
  const root = document.documentElement;
  const saved = localStorage.getItem('theme-mode');
  if (saved === 'light') root.classList.add('light');

  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = root.classList.contains('light') ? '🌙' : '☀️';
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem(
        'theme-mode',
        root.classList.contains('light') ? 'light' : 'dark'
      );
      themeBtn.textContent = root.classList.contains('light') ? '🌙' : '☀️';
    });
  }

  /* =====================
     MOBILE NAV + FIXED SCROLL
  ===================== */
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;

        const navHeight = navbar.offsetHeight;
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navHeight;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });

        // close mobile menu
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =====================
     NAVBAR SCROLL EFFECT
  ===================== */
  function onScrollNav() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScrollNav);
  onScrollNav();

  /* =====================
     REVEAL ANIMATIONS
  ===================== */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.18 });

  document
    .querySelectorAll(
      '.timeline-item, .skill-card, .project-card, .about-card, .hero-left, .hero-right'
    )
    .forEach(el => io.observe(el));

  /* =====================
     ACTIVE NAV LINK
  ===================== */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const pos = window.scrollY + window.innerHeight * 0.25;
    sections.forEach(sec => {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(
          `.nav-links a[href="#${sec.id}"]`
        );
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* =====================
     CONTACT HANDLER
  ===================== */
  window.handleContact = function (e) {
    e.preventDefault();
    alert('This contact feature is still in development. Please check back later.');
    e.target.reset();
    return false;
  };

  function openCert(){
  const modal = document.getElementById("certModal");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}

function closeCert(){
  const modal = document.getElementById("certModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

})();

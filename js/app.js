/**
 * ATEF ELASKLANY PORTFOLIO — CORE APPLICATION SCRIPT
 * Handles:
 * 1. Dynamic Project Rendering & Filtering (Homepage + Projects Page)
 * 2. IntersectionObserver for Scroll-Reveal Animations
 * 3. Active Nav Link Tracking on Scroll
 * 4. Mobile Navigation Drawer Toggle
 * 5. Case Study Interactive Tabs Simulation
 * 6. Smooth Anchor Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------------------------------------
     1. Dynamic Project Rendering & Filtering
  ----------------------------------------------------------- */
  const featuredGrid = document.getElementById('featured-projects-grid');
  const allGrid = document.getElementById('all-projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentProjects = typeof getProjects === 'function' ? getProjects() : [];
  currentProjects.sort((a, b) => a.order - b.order);

  // Render Homepage Featured Projects
  if (featuredGrid) {
    const featuredProjects = currentProjects.filter(p => p.featured);
    featuredGrid.innerHTML = featuredProjects.map(p => typeof renderProjectCard === 'function' ? renderProjectCard(p, "") : "").join("");
  }

  // Render Projects Page Catalog
  if (allGrid) {
    allGrid.innerHTML = currentProjects.map(p => typeof renderProjectCard === 'function' ? renderProjectCard(p, "") : "").join("");
  }

  // Setup Filtering (on Projects page)
  if (filterBtns.length > 0 && allGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const cards = allGrid.querySelectorAll('.project-card');
        
        cards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* -----------------------------------------------------------
     2. Scroll-Reveal Animations (Intersection Observer)
  ----------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .timeline-milestone');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* -----------------------------------------------------------
     3. Active Nav Link Tracking on Scroll
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.pageYOffset + 140;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}` || href === `index.html#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* -----------------------------------------------------------
     4. Mobile Navigation Drawer Toggle
  ----------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    // Close mobile menu when a nav link is clicked
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  /* -----------------------------------------------------------
     5. Case Study Dashboard Tabs Simulation
  ----------------------------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        
        const targetId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /* -----------------------------------------------------------
     6. Smooth Scrolling for Internal Anchor Links
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* -----------------------------------------------------------
     7. Business Discovery Form Handling
  ----------------------------------------------------------- */
  const discoveryForm = document.getElementById('business-discovery-form');
  const businessTypeSelect = document.getElementById('business-type');
  const otherTypeGroup = document.getElementById('other-business-type-group');
  const otherTypeInput = document.getElementById('other-business-type');
  const confirmationBlock = document.getElementById('form-confirmation');

  // Toggle 'Other' business type field
  if (businessTypeSelect && otherTypeGroup) {
    businessTypeSelect.addEventListener('change', (e) => {
      if (e.target.value === 'Other') {
        otherTypeGroup.style.display = 'flex';
        if (otherTypeInput) otherTypeInput.required = true;
      } else {
        otherTypeGroup.style.display = 'none';
        if (otherTypeInput) otherTypeInput.required = false;
      }
    });
  }

  // Handle Form Submission
  if (discoveryForm) {
    discoveryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check that at least one need is selected
      const checkedNeeds = discoveryForm.querySelectorAll('input[name="needs[]"]:checked');
      if (checkedNeeds.length === 0) {
        alert('Please select at least one area where you need assistance (or choose "Not Sure Yet").');
        return;
      }

      const submitBtn = document.getElementById('submit-discovery-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Processing Request...</span>`;
      }

      // Simulate clean asynchronous submission
      setTimeout(() => {
        discoveryForm.style.display = 'none';
        if (confirmationBlock) {
          confirmationBlock.style.display = 'block';
          confirmationBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);
    });
  }

  /* -----------------------------------------------------------
     8. Bilingual Language Switcher (EN / AR)
  ----------------------------------------------------------- */
  function applyLanguage(lang) {
    const translations = (typeof window.TRANSLATIONS !== 'undefined' ? window.TRANSLATIONS : (typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS : null));
    if (!translations || !translations[lang]) return;
    const dict = translations[lang];

    // Set direction & lang attributes on document
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('rtl-mode', lang === 'ar');

    // Update text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Update active state on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    localStorage.setItem('preferred_language', lang);
  }

  // Setup language switcher click events
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
      const lang = btn.getAttribute('data-lang');
      if (lang) {
        applyLanguage(lang);
      }
    }
  });

  // Initialize Language (Default EN, or from saved preference)
  const savedLang = localStorage.getItem('preferred_language') || 'en';
  applyLanguage(savedLang);

  /* -----------------------------------------------------------
     9. Brand Symbol Scroll Visibility
  ----------------------------------------------------------- */
  const brandSymbolSections = document.querySelectorAll('.brand-symbol-section');
  if ('IntersectionObserver' in window && brandSymbolSections.length > 0) {
    const symbolObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-symbol-visible');
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    brandSymbolSections.forEach(section => symbolObserver.observe(section));
  } else {
    // Fallback: make all brand symbols visible immediately
    brandSymbolSections.forEach(s => s.classList.add('is-symbol-visible'));
  }

  /* -----------------------------------------------------------
     10. SOLVEXA Opening Brand Intro Sequence
  ----------------------------------------------------------- */
  const introOverlay = document.getElementById('solvexa-intro-overlay');
  const skipBtn = document.getElementById('solvexa-skip-btn');

  function dismissIntro() {
    if (!introOverlay) return;
    introOverlay.classList.add('fade-out');
    sessionStorage.setItem('solvexa_intro_seen', 'true');
    setTimeout(() => {
      introOverlay.style.display = 'none';
    }, 800);
  }

  if (introOverlay) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('solvexa_intro_seen');

    if (hasSeenIntro === 'true' || prefersReducedMotion) {
      introOverlay.style.display = 'none';
    } else {
      // Auto-transition after sequence finishes (~2.4s)
      const introTimer = setTimeout(() => {
        dismissIntro();
      }, 2400);

      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          clearTimeout(introTimer);
          dismissIntro();
        });
      }
    }
  }

  /* -----------------------------------------------------------
     11. Contact Navigation & Social Channel Interactions (Req #12-18)
  ----------------------------------------------------------- */
  // WhatsApp channel click handler (for pending activation)
  document.addEventListener('click', (e) => {
    const waBtn = e.target.closest('[data-channel="whatsapp"]');
    if (waBtn) {
      e.preventDefault();
      const currentLang = localStorage.getItem('preferred_language') || 'en';
      const msg = currentLang === 'ar' 
        ? 'قناة واتساب قيد التفعيل قريبًا — يُرجى مراسلتنا عبر البريد الإلكتروني أو نموذج الأعمال أدناه.'
        : 'WhatsApp channel connecting soon — please reach out via email or the business form below.';
      
      let toast = document.getElementById('solvexa-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'solvexa-toast';
        toast.setAttribute('role', 'alert');
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:#0E1420;color:#F8FAFC;border:1px solid #2563EB;padding:0.75rem 1.4rem;border-radius:9999px;font-size:0.88rem;box-shadow:0 10px 30px rgba(0,0,0,0.4);opacity:0;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);z-index:9999;pointer-events:none;text-align:center;max-width:90%;';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
      }, 3500);
    }
  });

  // Mobile Floating Contact Button Scroll Logic
  const floatingBtn = document.getElementById('floating-contact-btn');
  if (floatingBtn) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = 400;
      if (scrollY > heroHeight) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.pointerEvents = 'auto';
      } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
      }
    }, { passive: true });
    // Initial state
    floatingBtn.style.opacity = '0';
    floatingBtn.style.pointerEvents = 'none';
  }
});






/* ================================================================
   TNR HR BUSINESS SOLUTIONS — UNIFIED SCRIPTS
   ================================================================ */

// ================================================================
// NAVIGATION SCROLL EFFECT (Unified for all pages)
// ================================================================
const nav = document.getElementById('siteNav') || document.querySelector('.header');

if (nav) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ================================================================
// MOBILE MENU TOGGLE
// ================================================================
const mobileToggle = document.getElementById('mobileToggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

// Handle mobile toggle (index.html style)
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        if (isOpen) {
            navLinks.style.cssText = '';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'var(--cream)';
            navLinks.style.padding = '24px';
            navLinks.style.borderBottom = '1px solid var(--border)';
            navLinks.style.gap = '16px';
            navLinks.style.zIndex = '999';
        }

        // Toggle icon
        const icon = mobileToggle.querySelector('i');
        if (navLinks.style.display === 'flex') {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Handle hamburger (other pages style)
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');

        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {

        if (
            window.innerWidth <= 768 &&
            !link.parentElement.classList.contains('dropdown')
        ) {
            navLinks.classList.remove('show');
            hamburger.setAttribute('aria-expanded', 'false');

            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Mobile Dropdown Toggle
document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {

        if (window.innerWidth <= 900) {

            e.preventDefault();

            const dropdown = this.parentElement;

            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                }
            });

            dropdown.classList.toggle('active');
        }
    });
});

// ================================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================================
// SCROLL REVEAL ANIMATIONS
// ================================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.12, 
    rootMargin: '0px 0px -60px 0px' 
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .service-item, .value-card, .teaser-card, .news-card, .vacancy-card, .external-job-card').forEach(el => {
    // Only apply initial hidden state if not already handled by CSS
    if (!el.classList.contains('reveal') && 
        !el.classList.contains('reveal-left') && 
        !el.classList.contains('reveal-right')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Create a one-time observer for these elements
        const singleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    singleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        singleObserver.observe(el);
    } else {
        revealObserver.observe(el);
    }
});

// ================================================================
// FORM VALIDATION ENHANCEMENT
// ================================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ================================================================
// VACANCY FILTER FUNCTIONALITY
// ================================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const vacancyCards = document.querySelectorAll('.vacancy-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        vacancyCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Re-trigger animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ================================================================
// HEADER SHADOW ON SCROLL
// ================================================================
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }, { passive: true });
}

// ================================================================
// LAZY LOADING IMAGES FALLBACK
// ================================================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}

// ================================================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ================================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScroll = debounce(() => {
    // Add any additional scroll-based animations here
}, 16);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// ================================================================
// CONSOLE GREETING
// ================================================================
console.log('%cTNR HR Business Solutions', 'color: #1a1a1a; font-size: 20px; font-weight: bold;');
console.log('%cProfessional HR Solutions for South Africa', 'color: #8a8a8a; font-size: 14px;');}
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.clickable-image').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
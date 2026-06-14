// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const roles = ['Web Developer', 'Software Engineering Student', 'Frontend Developer', 'Freelancer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

if (typingText) {
    typeEffect();
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
let isDark = true;

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    isDark = !document.body.classList.contains('light-theme');
    
    // Update icons
    const icon = themeToggle.querySelector('i');
    const mobileIcon = themeToggleMobile.querySelector('i');
    
    if (!isDark) {
        icon.className = 'fas fa-sun';
        mobileIcon.className = 'fas fa-sun';
        themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        mobileIcon.className = 'fas fa-moon';
        themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for reaching out! I will get back to you soon.');
        this.reset();
    });
}

// Intersection Observer for Skill Progress Bars
const skillCards = document.querySelectorAll('.skill-card');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            const percent = entry.target.querySelector('.skill-percent').textContent;
            if (progressBar && progressBar.style.width !== percent) {
                progressBar.style.width = percent;
            }
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => progressObserver.observe(card));

// Active Navigation Link on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        if (window.scrollY >= sectionTop && sectionId) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.style.color = 'var(--primary-cyan)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
});

// Animate elements on scroll
const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-card');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});

// Handle window resize - close mobile menu on desktop view
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Button Ripple Effect
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 400);
    });
});

// Ensure download button works properly
const downloadBtn = document.querySelector('.btn-outline[download]');
if (downloadBtn) {
    console.log('CV download button ready: ' + downloadBtn.getAttribute('href'));
}

// Add hover effect for social icons
const socialIcons = document.querySelectorAll('.social-links a');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const iconElement = this.querySelector('i');
        if (iconElement) {
            iconElement.style.transform = 'scale(1.1)';
        }
    });
    
    icon.addEventListener('mouseleave', function() {
        const iconElement = this.querySelector('i');
        if (iconElement) {
            iconElement.style.transform = 'scale(1)';
        }
    });
});

// Add animation for hero buttons on page load
window.addEventListener('load', function() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        btn.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100);
    });
    
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        link.style.transition = `opacity 0.5s ease ${index * 0.1 + 0.3}s, transform 0.5s ease ${index * 0.1 + 0.3}s`;
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Handle image loading errors gracefully
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.backgroundColor = 'var(--primary-cyan)';
        this.style.opacity = '0.7';
    });
});

// Console greeting
console.log('%c🚀 Rahmanullah Portfolio | Professional Web Developer', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%c✓ Button Order: Hire Me → View Projects → View CV → Download CV', 'color: #10b981; font-size: 12px;');
console.log('%c✓ Professional social icons with border & hover effects', 'color: #3b82f6; font-size: 12px;');
console.log('%c✓ Dark/Light mode active | Smooth scrolling enabled', 'color: #8b5cf6; font-size: 12px;');
// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = 'light'; // Default to light since we can't use localStorage

// Moon icon for dark mode
const moonIcon = `<path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>`;

// Sun icon for light mode  
const sunIcon = `<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>`;

themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');

    // Add a smooth transition effect
    this.style.transform = 'translateY(-50%) rotate(360deg) scale(1.2)';

    setTimeout(() => {
        this.style.transform = 'translateY(-50%) scale(1)';
    }, 300);

    // Change icon based on current theme
    if (body.classList.contains('dark-mode')) {
        themeIcon.innerHTML = moonIcon;
        themeIcon.style.color = '#ff6b35';
    } else {
        themeIcon.innerHTML = sunIcon;
        themeIcon.style.color = '#ffa500';
    }
});

// Add hover effects to theme toggle
themeToggle.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-50%) scale(1.1) rotate(15deg)';
});

themeToggle.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after clicking
        navLinks.classList.remove('active');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Menu item hover effects
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(-10px) scale(1)';
    });
});

// Form submission
document.getElementById('reservationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const date = formData.get('date');
    const guests = formData.get('guests');

    // Simple validation
    if (!name || !email || !date || !guests) {
        alert('Please fill in all required fields.');
        return;
    }

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;

    setTimeout(() => {
        alert(`Thank you, ${name}! Your reservation for ${guests} guests on ${date} has been received. We'll contact you at ${email} to confirm.`);
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Add dynamic background particles (simple animation)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255, 107, 53, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: float 6s linear infinite;
                left: ${Math.random() * 100}vw;
                top: 100vh;
            `;

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Add CSS animation for particles
if (!document.querySelector('#particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
                @keyframes float {
                    to {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
    document.head.appendChild(style);
}

// Create particles periodically
setInterval(createParticle, 2000);
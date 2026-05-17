// ==================== THEME TOGGLE ==================== //
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', savedTheme === 'dark');
updateThemeIcon(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    const theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(isDarkMode);
});

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== PAGE FLIP FUNCTIONALITY ==================== //
const flipBtn = document.getElementById('flipBtn');
const flipContainer = document.getElementById('flipContainer');

flipBtn.addEventListener('click', () => {
    flipContainer.classList.toggle('flipped');
    
    // Update button text/icon based on state
    const isFlipped = flipContainer.classList.contains('flipped');
    
    flipBtn.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    flipBtn.style.transition = 'transform 0.8s ease';
});

// ==================== VIDEO MODAL ==================== //
const videoBtn = document.getElementById('videoBtn');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');

videoBtn.addEventListener('click', () => {
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

closeModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === videoModal) {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (event.target === hireModal) {
        hireModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ==================== HIRE ME MODAL ==================== //
const hireMeBtn = document.getElementById('hireMeBtn');
const hireModal = document.getElementById('hireModal');
const closeHireModal = document.getElementById('closeHireModal');
const contactForm = document.querySelector('.contact-form');

hireMeBtn.addEventListener('click', () => {
    hireModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeHireModal.addEventListener('click', () => {
    hireModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // You can integrate with an email service here (e.g., EmailJS, Formspree)
        console.log('Form submitted:', { name, email, service, message });
        
        // Show success message
        alert(`Thank you, ${name}! I'll get back to you soon at ${email}`);
        
        // Reset form
        contactForm.reset();
        
        // Close modal
        hireModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// ==================== SCROLL ANIMATION ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-card, .highlight-item, .specialization-card, .sample-work-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ==================== SMOOTH SCROLL TO SECTIONS ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#portfolio') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ==================== FLOATING ICONS ON SCROLL ==================== //
const floatingIcons = document.querySelectorAll('.floating-icon');
const floatingContainer = document.querySelector('.floating-icons-container');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    floatingIcons.forEach((icon, index) => {
        const speed = 50 + index * 10; // Different speed for parallax effect
        icon.style.transform = `translateY(${scrollY / speed}px) rotate(${scrollY / 5}deg)`;
    });
});

// ==================== SKILL PROGRESS BAR ANIMATION ==================== //
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-out';
                }, 100);
            });
            skillsAnimated = true;
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ==================== RESPONSIVE ADJUSTMENTS ==================== //
function handleResize() {
    const isMobile = window.innerWidth < 768;
    
    // Adjust floating icons visibility on mobile
    if (isMobile) {
        floatingContainer.style.display = 'none';
    } else {
        floatingContainer.style.display = 'block';
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on page load

// ==================== KEYBOARD NAVIGATION ==================== //
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (hireModal.style.display === 'block') {
            hireModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    // Arrow keys to flip pages
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        flipContainer.classList.toggle('flipped');
    }
});

// ==================== PAGE LOAD ANIMATION ==================== //
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==================== UTILITY FUNCTIONS ==================== //

// Copy to clipboard function for social links or other uses
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ==================== FORM VALIDATION ==================== //
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
});

function validateField(field) {
    if (field.required && field.value.trim() === '') {
        field.style.borderColor = '#ef4444';
    } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        field.style.borderColor = emailRegex.test(field.value) ? '#10b981' : '#ef4444';
    } else {
        field.style.borderColor = 'var(--border-color)';
    }
}

// ==================== SOCIAL LINKS CONFIGURATION ==================== //
// Update these with your actual social media handles
const socialConfig = {
    whatsapp: 'https://wa.me/1234567890', // Replace with your number
    instagram: 'https://instagram.com/your-handle', // Replace with your handle
    github: 'https://github.com/Codedhans',
    twitter: 'https://twitter.com/your-handle' // Replace with your handle
};

// Update social buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    const platform = btn.classList[1]; // Get platform class
    if (socialConfig[platform]) {
        btn.href = socialConfig[platform];
    }
});

// ==================== DYNAMIC FEATURE: Add new blog posts ==================== //
// Function to add new sample work items (for future integration)
function addSampleWork(title, excerpt, category, featured = false) {
    const sampleContainer = document.querySelector('.sample-work-container');
    if (!sampleContainer) return;
    
    const newItem = document.createElement('div');
    newItem.className = 'sample-work-item highlight-item';
    newItem.innerHTML = `
        ${featured ? '<div class="sample-badge featured">Featured</div>' : ''}
        <h4>${title}</h4>
        <p class="sample-excerpt">${excerpt}</p>
        <div class="sample-meta">
            <span class="sample-category">${category}</span>
            <span class="sample-date">2026</span>
        </div>
    `;
    
    sampleContainer.appendChild(newItem);
    observer.observe(newItem);
}

// ==================== ANALYTICS & TRACKING ==================== //
// Track button clicks
flipBtn.addEventListener('click', () => {
    console.log('Flip button clicked');
    // Add analytics tracking here if needed
});

videoBtn.addEventListener('click', () => {
    console.log('Video button clicked');
});

hireMeBtn.addEventListener('click', () => {
    console.log('Hire me button clicked');
});

console.log('Portfolio loaded successfully! 🚀');

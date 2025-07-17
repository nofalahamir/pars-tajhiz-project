// Theme Management
let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Show notification
    const themeText = currentTheme === 'light' ? 'روشن' : 'تاریک';
    showNotification(`تم به حالت ${themeText} تغییر کرد`, 'info');
}

themeToggle.addEventListener('click', toggleTheme);

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start hero animations after loading
            startHeroAnimations();
        }, 500);
    }, 1500);
});

// Hero Title Animation
function startHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        // Initial state
        heroTitle.style.opacity = '0';
        heroTitle.style.filter = 'blur(20px)';
        heroTitle.style.transform = 'scale(2) translateY(50px)';
        heroTitle.style.transition = 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Animate title
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.filter = 'blur(0px)';
            heroTitle.style.transform = 'scale(1) translateY(0)';
        }, 500);
    }
    
    if (heroSubtitle) {
        // Initial state
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.filter = 'blur(10px)';
        heroSubtitle.style.transform = 'scale(1.5) translateY(30px)';
        heroSubtitle.style.transition = 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Animate subtitle
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.filter = 'blur(0px)';
            heroSubtitle.style.transform = 'scale(1) translateY(0)';
        }, 1200);
    }
    
    if (heroButtons) {
        // Initial state
        heroButtons.style.opacity = '0';
        heroButtons.style.filter = 'blur(5px)';
        heroButtons.style.transform = 'scale(1.2) translateY(20px)';
        heroButtons.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Animate buttons
        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.filter = 'blur(0px)';
            heroButtons.style.transform = 'scale(1) translateY(0)';
        }, 1800);
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('section, .strength-card, .service-item, .product-card, .testimonial-card, .contact-wrapper');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Swiper Initialization
const productsSwiper = new Swiper('.products-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Validation patterns
const validationPatterns = {
    name: {
        pattern: /^[\u0600-\u06FF\s]{3,50}$/,
        message: 'نام باید بین ۳ تا ۵۰ کاراکتر باشد'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'ایمیل معتبر وارد کنید'
    },
    phone: {
        pattern: /^[\d\s\-\(\)]{10,15}$/,
        message: 'شماره تماس معتبر وارد کنید'
    },
    message: {
        pattern: /^[\u0600-\u06FF\s\d\.,!?]{10,500}$/,
        message: 'پیام باید بین ۱۰ تا ۵۰۰ کاراکتر باشد'
    }
};

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (validationPatterns[fieldName]) {
        const pattern = validationPatterns[fieldName].pattern;
        const message = validationPatterns[fieldName].message;
        
        if (!pattern.test(fieldValue)) {
            showError(field, message);
            return false;
        }
    }
    
    clearError(field);
    return true;
}

function showError(field, message) {
    const errorElement = field.parentNode.querySelector('.error-message');
    errorElement.textContent = message;
    field.style.borderColor = '#e74c3c';
}

function clearError(field) {
    const errorElement = field.parentNode.querySelector('.error-message');
    errorElement.textContent = '';
    field.style.borderColor = '';
}

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('پیام شما با موفقیت ارسال شد!', 'success');
        
        // Reset button state
        buttonText.style.display = 'inline-block';
        buttonLoader.style.display = 'none';
        submitButton.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Add hover effects to strength cards
document.querySelectorAll('.strength-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to service items
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 150);
    });
});

// Smooth reveal animation for testimonials
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    testimonialObserver.observe(card);
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), #e67e22);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

const partnersSwiper = new Swiper('.partners-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
        modifier: 1.2,
        slideShadows: true,
    },
    navigation: {
        nextEl: '.swiper-button-next.custom-nav',
        prevEl: '.swiper-button-prev.custom-nav',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
}); 
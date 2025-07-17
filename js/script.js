document.addEventListener("DOMContentLoaded", function() {
    // --- UTILITY FUNCTIONS ---

    // Function to load HTML components (header, footer)
    const loadComponent = (url, placeholderId) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                }
            })
            .catch(error => console.error(error));
    };

    // --- INITIALIZATION ---

    // Load header and footer components, then initialize the main scripts
    Promise.all([
        loadComponent('components/header.html', 'header-placeholder'),
        loadComponent('components/footer.html', 'footer-placeholder')
    ]).then(() => {
        // Once components are loaded, initialize all interactive elements
        initializeMain();
    });

    const initializeMain = () => {
        // --- THEME MANAGEMENT ---
        const themeToggle = document.getElementById('theme-toggle');
        let currentTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', currentTheme);
                localStorage.setItem('theme', currentTheme);
            });
        }

        // --- NAVIGATION ---
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Set active navigation link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinksAnchors = document.querySelectorAll('.nav-links a');
        navLinksAnchors.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // --- UI & ANIMATIONS ---

        // Header scroll effect
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Back to Top Button
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Intersection Observer for animations
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

        document.querySelectorAll('section, .strength-card, .service-item, .product-card, .testimonial-card, .contact-wrapper').forEach(el => {
            revealObserver.observe(el);
        });

        // Hero Title Animation
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroButtons = document.querySelector('.hero-buttons');

            if (heroTitle) {
                setTimeout(() => {
                    heroTitle.classList.add('animated');
                }, 500);
            }

            if (heroSubtitle) {
                setTimeout(() => {
                    heroSubtitle.classList.add('animated');
                }, 1200);
            }

            if (heroButtons) {
                setTimeout(() => {
                    heroButtons.classList.add('animated');
                }, 1800);
            }
        }


        // --- SWIPER INITIALIZATION ---
        if (typeof Swiper !== 'undefined') {
            // Products Swiper
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

            // Partners Swiper
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
        }
    };

    // --- LOADING SCREEN ---
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Use window.load to ensure all content (including images) is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500); // Match this with CSS transition time
            }, 500); // Minimum time to show the loader
        });
    }
});

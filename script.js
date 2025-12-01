// ==================== SMOOTH SCROLL ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== STICKY HEADER WITH HIDE/SHOW ====================
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hide');
    } else {
        navbar.classList.remove('hide');
    }
    
    lastScrollTop = scrollTop;
});

// ==================== MOBILE MENU TOGGLE ====================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const bars = mobileMenu.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(7px, 7px)' : 'none';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
});

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = mobileMenu.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards (will run after DOM loads)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ==================== ACTIVE NAV LINK ====================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href="#' + sectionId + '"]')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href="#' + sectionId + '"]')?.classList.remove('active');
        }
    });
});

// ==================== PARALLAX TEXT EFFECT (LEVEL 10 STYLE) ====================
window.addEventListener('scroll', function() {
    const parallaxText = document.getElementById('parallax-text');
    if (parallaxText) {
        const scrolled = window.pageYOffset;
        const projectsSection = document.querySelector('.projects-level10');
        
        if (projectsSection) {
            const sectionTop = projectsSection.offsetTop;
            const sectionHeight = projectsSection.offsetHeight;
            
            // Only animate when section is in view
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                const offset = (scrolled - sectionTop) * 0.5;
                parallaxText.style.transform = `translateY(-50%) translateX(${offset}px)`;
            }
        }
    }
});

// ==================== HERO BACKGROUND SLIDESHOW ====================
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        // Function to show next slide
        function showNextSlide() {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 5 seconds
        setInterval(showNextSlide, 5000);
        
        console.log('Hero slideshow initialized with ' + slides.length + ' slides!');
    }
});

// ==================== SKILLS LOGO CAROUSEL ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if Swiper is loaded
    if (typeof Swiper !== 'undefined') {
        const skillsSwiper = new Swiper('.skillsSwiper', {
            // Slides configuration
            slidesPerView: 'auto',
            spaceBetween: 40,
            
            // Loop
            loop: true,
            loopedSlides: 8,
            
            // Center slides
            centeredSlides: false,
            
            // Autoplay - smooth continuous scroll
            autoplay: {
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            
            // Speed
            speed: 3000,
            
            // Effect
            effect: 'slide',
            
            // Interaction
            allowTouchMove: true,
            grabCursor: true,
            
            // Smooth transition
            freeMode: false,
            freeModeMomentum: false,
            
            // Watch overflow
            watchOverflow: true,
            
            // Responsive
            breakpoints: {
                320: {
                    spaceBetween: 20,
                    speed: 2500
                },
                768: {
                    spaceBetween: 30,
                    speed: 3000
                },
                1024: {
                    spaceBetween: 40,
                    speed: 3500
                }
            }
        });
        
        console.log('Skills Logo Carousel initialized successfully!');
    } else {
        console.error('Swiper library not loaded.');
    }
});

// ==================== PROJECTS CAROUSEL (LEVEL 10 STYLE) ====================
document.addEventListener('DOMContentLoaded', function() {
    
    if (typeof Swiper !== 'undefined') {
        const projectsSwiper = new Swiper('.projectsSwiper', {
            // Slides per view
            slidesPerView: 1,
            spaceBetween: 30,
            
            // Loop
            loop: true,
            
            // Autoplay
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            
            // Speed
            speed: 800,
            
            // Effect
            effect: 'slide',
            
            // Grab cursor
            grabCursor: true,
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Keyboard
            keyboard: {
                enabled: true,
            },
            
            // Breakpoints
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 40
                }
            }
        });
        
        console.log('Projects Carousel initialized successfully!');
    } else {
        console.error('Swiper library not loaded.');
    }
});

// Parallax Text Animation (Level 10 Style)
window.addEventListener('scroll', () => {
    const parallaxText = document.querySelector('.parallax-text');
    if (parallaxText) {
        const scrolled = window.pageYOffset;
        const projectsSection = document.querySelector('.projects-level10');
        const sectionTop = projectsSection.offsetTop;
        const sectionHeight = projectsSection.offsetHeight;
        
        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
            const parallaxSpeed = (scrolled - sectionTop) * 0.3;
            parallaxText.style.transform = `translateY(-50%) translateX(-${parallaxSpeed}px)`;
        }
    }
});



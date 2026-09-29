// ============ SCROLL ANIMATION ============
const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

animatedElements.forEach(el => observer.observe(el));






// ============ ROTATING TEXT ANIMATION ============
const roles = ["Web Developer", "AI Automator", "AI Agent Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const rotatingText = document.getElementById('rotating-text');

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        rotatingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        rotatingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 300;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();










// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('div[id]');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});








// ============ CUSTOM SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; // মিলিসেকেন্ডে — যত বেশি সংখ্যা, তত ধীরে scroll হবে
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutQuad(progress);

                window.scrollTo(0, startPosition + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            }

            requestAnimationFrame(animation);
        }
    });
});





// ============ NAVBAR: SHRINK ON SCROLL ============
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();


// ============ NAVBAR: MOBILE MENU ============
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});






// ============ SCROLL PROGRESS BAR ============
const progressBar = document.getElementById('scroll-progress');

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = percent + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();


// ============ BACK TO TOP BUTTON ============
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});




// ============ PROFILE PIC: REVEAL ONLY AFTER FULL LOAD ============
const picWrap = document.querySelector('.profile-pic-wrap');
const picImg = picWrap.querySelector('img');

function revealProfilePic() {
    picWrap.classList.add('loaded');
}

if (picImg.complete && picImg.naturalWidth > 0) {
    revealProfilePic();
} else {
    picImg.addEventListener('load', revealProfilePic);
}
// ============ SCROLL ANIMATION ============
const animatedElements = document.querySelectorAll('.animate-on-scroll');

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

document.addEventListener('DOMContentLoaded', () => {

    // MOBILE NAVIGATION BAR TOGGLE
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksElement = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksElement.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // MOBILE MENU AUTO_CLOSE
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksElement.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });


    // VIEW MORE BUTTONS FOR PROJECTS 
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const cardInfo = e.target.parentElement;
            const extraContent = cardInfo.querySelector('.project-desc-more');
            
            // VISIBILITY TOGGLE
            extraContent.classList.toggle('hidden');

            // VIEWER SHIFT
            if (extraContent.classList.contains('hidden')) {
                e.target.textContent = 'View More';
            } else {
                e.target.textContent = 'View Less';
            }
        });
    });


    // CONTACT FORM VALIDATION 
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // GRAB VALUES rm WHITESPACE
        const nameVal = document.getElementById('form-name').value.trim();
        const emailVal = document.getElementById('form-email').value.trim();
        const messageVal = document.getElementById('form-message').value.trim();

        // EMAIL PATTERN CHECKER
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let errors = [];

        // CONDITION CHECKS
        if (nameVal === "") {
            errors.push("Full Name is required.");
        }
        
        if (emailVal === "") {
            errors.push("Email Address is required.");
        } else if (!emailRegex.test(emailVal)) {
            errors.push("Please supply a structurally valid email address.");
        }

        if (messageVal === "") {
            errors.push("Message payload body container cannot be left blank.");
        }

        // PROCESS FEEDBACK
        formFeedback.className = "form-feedback"; // Clear legacy modifiers
        
        if (errors.length > 0) {
            formFeedback.innerHTML = errors.join('<br>');
            formFeedback.classList.add('error');
            formFeedback.classList.remove('hidden');
        } else {
            formFeedback.innerHTML = `<i class="fas fa-check-circle"></i> Messages successfully delivered! Thank you, ${nameVal}.`;
            formFeedback.classList.add('success');
            formFeedback.classList.remove('hidden');
            
            // RESET FORM FIELDS
            contactForm.reset();
        }
    });


    // SHOW / HIDE ABOUT ME SECTION 
    const toggleAboutBtn = document.getElementById('toggle-about-btn');
    const aboutDynamicContent = document.getElementById('about-dynamic-content');

    toggleAboutBtn.addEventListener('click', () => {
        aboutDynamicContent.classList.toggle('hidden');

        if (aboutDynamicContent.classList.contains('hidden')) {
            toggleAboutBtn.textContent = 'Show Details';
        } else {
            toggleAboutBtn.textContent = 'Hide Details';
        }
    });


    // DARK MODE TOGGLE 
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    darkModeToggle.addEventListener('click', () => {
        // CHECK CURRENT THEME AND TOGGLE
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const icon = darkModeToggle.querySelector('i');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
        }
    });


    // SCROLL-TO-TOP BUTTON
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        // SHOW BUTTON AFTER SCROLLING DOWN
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        // ACTIVE LINK HIGHLIGHTING
        const sections = document.querySelectorAll('section, header');
        let currentActiveId = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentActiveId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveId}`) {
                link.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // -------------------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 2. Header Scroll Effect
    // -------------------------------------------------------------
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // -------------------------------------------------------------
    // 3. Smooth Scrolling for Nav Links & ScrollSpy
    // -------------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function highlightNav() {
        let scrollPosition = window.scrollY + 120; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Trigger initially

    // -------------------------------------------------------------
    // 4. Typewriter Effect
    // -------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const words = ["B.Tech Computer Science Engineering Student", "Java SE 17 Developer", "Full-Stack Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Subtract character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // Handle word completions and transitions
        if (!isDeleting && charIndex === currentWord.length) {
            // Word fully typed, pause before deleting
            typingSpeed = 2200; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word fully deleted, move to the next
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 600; // Small pause before starting next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(type, 800); // Initial delay
    }

    // -------------------------------------------------------------
    // 5. Projects Filtration
    // -------------------------------------------------------------
    const filterBtns = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state of buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow/animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 6. Credentials Filtration
    // -------------------------------------------------------------
    const credFilterBtns = document.querySelectorAll('[data-cred-filter]');
    const credRows = document.querySelectorAll('.credential-row');

    credFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            credFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-cred-filter');

            credRows.forEach(row => {
                const category = row.getAttribute('data-cred-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    row.style.display = 'flex';
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-15px)';
                    setTimeout(() => {
                        row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        row.style.opacity = '1';
                        row.style.transform = 'translateX(0)';
                    }, 30);
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 7. Email Copy to Clipboard
    // -------------------------------------------------------------
    const emailCard = document.getElementById('email-card');
    const toast = document.getElementById('copy-toast');

    if (emailCard && toast) {
        emailCard.addEventListener('click', function() {
            const emailText = document.getElementById('email-text').textContent;
            
            navigator.clipboard.writeText(emailText).then(() => {
                // Show toast notification
                toast.classList.add('show');
                
                // Hide toast after 2.5 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 2500);
            }).catch(err => {
                console.error('Could not copy email: ', err);
            });
        });
    }

});

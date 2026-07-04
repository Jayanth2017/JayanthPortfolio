/* ──────────────────────────────────────────────────────────────
   FILE: js/script.js
   ────────────────────────────────────────────────────────────── */

// ─── AOS INIT ───
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});

// ─── GSAP + SCROLLTRIGGER ───
gsap.registerPlugin(ScrollTrigger);

// ─── NAVBAR SCROLL EFFECT ───


// ─── HERO STATS COUNTER ───
document.querySelectorAll('.stat-item').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const numberEl = el.querySelector('.number');
    let current = 0;
    const increment = Math.ceil(target / 60);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        numberEl.textContent = target + (target === 98 ? '%' : '+');
                        clearInterval(interval);
                    } else {
                        numberEl.textContent = current + (target === 98 ? '%' : '+');
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(el);
});

// ─── SERVICE CARDS STAGGER (GSAP) ───
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// ─── WORK CARDS STAGGER (GSAP) ───
gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out'
    });
});

// ─── TESTIMONIAL CARDS STAGGER (GSAP) ───
gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// ─── ABOUT SECTION ANIMATIONS ───
// Profile image
gsap.from('.about-img', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    scale: 0.85,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// About content
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    opacity: 0,
    x: 40,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

// Skill tags stagger
gsap.utils.toArray('.about-skills .skill-tag').forEach((tag, i) => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: '.about-skills',
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: i * 0.06,
        ease: 'back.out(1.7)'
    });
});



/* ================================================================
   CONTACT SECTION — Form Submission (Already in your JS)
   This is your existing code — keep it in js/script.js
   ================================================================ */

// ─── FORM SUBMIT ───
const form = document.getElementById('contactForm');
const resultDiv = document.getElementById('formResult');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        formData.append("access_key", "0bdefbb0-10b4-4271-b52c-50501e5ddf02");

        fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.status === 200) {
                    resultDiv.innerHTML = '<span style="color:var(--gold);">✅ Message sent successfully!</span>';
                    form.reset();
                    setTimeout(() => { resultDiv.innerHTML = ''; }, 5000);
                } else {
                    resultDiv.innerHTML = '<span style="color:#ff6b6b;">⚠️ Something went wrong. Please try again.</span>';
                }
            })
            .catch(() => {
                resultDiv.innerHTML = '<span style="color:#ff6b6b;">⚠️ Network error. Please check your connection.</span>';
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                setTimeout(() => { resultDiv.innerHTML = ''; }, 6000);
            });
    });
}
// ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ─── PARALLAX EFFECT ON ORBS ───
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const orbs = document.querySelectorAll('.hero-orb');
    orbs.forEach((orb, i) => {
        const speed = 10 + i * 5;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ─── CARD 3D TILT EFFECT ───
document.querySelectorAll('.work-card, .service-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = x * 6;
        const rotateX = -y * 6;
        card.style.transform =
            `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});

// ─── CONSOLE LOG ───
console.log('🚀 Premium Portfolio — Vision Into Reality With Code & Design');
console.log('💻 Built with ❤️ by Jayanth A H');
console.log('✨ Scroll animations powered by GSAP + ScrollTrigger');

/* ================================================================
   FILE: js/script.js — Navbar & Hero Interactions
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ─── ELEMENTS ───
    const navbar = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const progressBar = document.getElementById('scrollProgress');

    // ─── 1. SCROLL PROGRESS BAR ───
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    });

    // ─── 2. STICKY NAVBAR ───
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleNavbarVisibility() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        if (currentScrollY < 10) {
            navbar.classList.remove('hidden');
            navbar.classList.remove('scrolled');
            lastScrollY = currentScrollY;
            return;
        }

        navbar.classList.add('scrolled');

        if (scrollDelta > 8 && currentScrollY > 80) {
            navbar.classList.add('hidden');
        } else if (scrollDelta < -8) {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ─── 3. HAMBURGER MENU ───
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');

        let overlay = document.querySelector('.nav-overlay');
        if (navLinks.classList.contains('open')) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'nav-overlay active';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', closeMenu);
            }
            document.body.style.overflow = 'hidden';
        } else {
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 400);
            }
            document.body.style.overflow = '';
        }
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 400);
        }
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                closeMenu();
            }
        });
    });

    // ─── 4. ACTIVE LINK ON SCROLL ───
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ─── 5. CLOSE MENU ON RESIZE ───
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navLinks.classList.contains('open')) {
            closeMenu();
        }
    });

    // ─── 6. KEYBOARD ACCESSIBILITY ───
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            closeMenu();
        }
    });

    // ─── 7. PROFILE IMAGE 3D TILT ───
    const profileImg = document.querySelector('.hero-profile-large');
    const profileWrapper = document.querySelector('.hero-profile-wrapper');
    if (profileImg && profileWrapper) {
        profileWrapper.addEventListener('mousemove', (e) => {
            const rect = profileWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = x * 10;
            const rotateX = -y * 10;
            profileImg.style.transform =
                `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04)`;
        });

        profileWrapper.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
    }

    // ─── 8. LAPTOP 3D TILT ───
    const laptop = document.getElementById('laptop3D');
    const wrapper = laptop?.closest('.laptop-wrapper');
    if (laptop && wrapper) {
        let targetY = -6,
            targetX = 4,
            currentY = -6,
            currentX = 4;

        wrapper.addEventListener('mouseenter', () => {
            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                targetY = x * 12;
                targetX = -y * 8;
            });
        });

        wrapper.addEventListener('mouseleave', () => {
            targetY = -1;
            targetX = 1;
        });

        function animateTilt() {
            currentY += (targetY - currentY) * 0.06;
            currentX += (targetX - currentX) * 0.06;
            laptop.style.transform = `rotateY(${currentY}deg) rotateX(${currentX}deg)`;
            requestAnimationFrame(animateTilt);
        }
        animateTilt();
    }

    // ─── 9. GENERATE KEYBOARD ───
    const keyboard = document.getElementById('keyboard');
    if (keyboard) {
        const rows = [
            ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'],
            ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
            ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
            ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
            ['Ctrl', 'Fn', '⌘', ' ', '⌘', 'Alt', 'Ctrl']
        ];

        const specialClasses = {
            'Tab': 'tab',
            'Caps': 'caps',
            'Shift': 'shift',
            'Enter': 'enter',
            '⌫': 'bksp',
            '\\': 'bslash',
            'Ctrl': 'ctrl',
            '⌘': 'cmd',
            'Alt': 'alt',
            'Fn': 'fn',
            ' ': 'space'
        };

        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'key-row';
            row.forEach(key => {
                const keySpan = document.createElement('span');
                keySpan.className = 'key';
                if (specialClasses[key]) keySpan.classList.add(specialClasses[key]);
                if (key === ' ') keySpan.style.background = 'rgba(255,255,255,0.01)';
                keySpan.textContent = key;
                rowDiv.appendChild(keySpan);
            });
            keyboard.appendChild(rowDiv);
        });
    }

    // ─── 10. CODE EDITOR ───
    const editor = document.getElementById('codeEditor');
    if (editor) {
        const lines = [
{
    html: `<span class="code-kw">const</span> <span class="code-var">developer</span> <span class="code-punc">=</span> <span class="code-punc">{</span>`
},
{
    html: `<span class="code-prop">name</span><span class="code-punc">:</span> <span class="code-str">"Jayanth AH"</span><span class="code-punc">,</span>`
},
{
    html: `<span class="code-prop">focus</span><span class="code-punc">:</span> <span class="code-str">"Client Solutions"</span>`
},
{
    html: `<span class="code-punc">};</span>`
},

{
    html: `<span class="code-comment">// Transforming requirements into solutions.</span>`
}
];

        const typingSnippets = [
            'const developer = "Jayanth AH";',
    'const goal = "Client Satisfaction";',
    'analyzeRequirements();',
    'buildCustomSolution();',
    'developWebsite();',
    'developSoftware();',
    'developApplication();',
    'deliverQualityProduct();',
    'console.log("Project Delivered Successfully 🚀");',
    '// Turning requirements into solutions.'
        ];

        let lineHtml = '';
        lines.forEach((line, index) => {
            const num = index + 1;
            const content = line.html || '';
            lineHtml += `
                    <div class="editor-line" data-line="${num}">
                        <span class="line-number">${num}</span>
                        ${content}
                    </div>
                `;
        });

        lineHtml += `
                <div class="editor-line typing-line" data-line="19">
                    <span class="line-number">19</span>
                    <span class="code-txt" id="typingCode"></span>
                    <span class="cursor-blink-3d" id="cursor3D">▌</span>
                </div>
            `;

        editor.innerHTML = lineHtml;

        // ─── TYPING EFFECT ───
        const typingCode = document.getElementById('typingCode');
        const cursor3D = document.getElementById('cursor3D');
        if (typingCode && cursor3D) {
            let snippetIndex = 0,
                charIndex = 0,
                isDeleting = false;

            function typeCode() {
                const fullText = typingSnippets[snippetIndex];
                if (isDeleting) {
                    typingCode.textContent = fullText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingCode.textContent = fullText.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === fullText.length) {
                    setTimeout(() => { isDeleting = true;
                        setTimeout(typeCode, 200); }, 3000);
                    return;
                }
                if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    snippetIndex = (snippetIndex + 1) % typingSnippets.length;
                    setTimeout(typeCode, 400);
                    return;
                }
                setTimeout(typeCode, isDeleting ? 20 : 40);
            }
            setTimeout(typeCode, 2200);
        }
    }

    console.log('✨ Portfolio — Fully Loaded & Centered');
});

/* ================================================================
   ABOUT SECTION — 3D Timeline Interactions
   Add to your js/script.js
   ================================================================ */

// ─── 3D CARD TILT ───
document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = x * 8;
        const rotateX = -y * 6;
        card.style.transform =
            `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform =
            'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
});

// ─── PROGRESS RING ANIMATION (on scroll) ───
document.querySelectorAll('.timeline-progress .progress-ring circle:last-child').forEach(ring => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dasharray = ring.getAttribute('stroke-dasharray');
                const dashoffset = ring.getAttribute('stroke-dashoffset');
                ring.style.strokeDashoffset = '106.8';
                setTimeout(() => {
                    ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    ring.style.strokeDashoffset = dashoffset;
                }, 200);
                observer.unobserve(ring);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(ring);
});

console.log('🏆 3D Timeline with GamiPress progress loaded!');
/* ================================================================
   SKILLS SECTION — Orbital Laptop with Scroll Rotation
   Add to your js/script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    const orbitRing = document.getElementById('orbitRing');
    const centerLaptop = document.getElementById('centerLaptop');
    const orbitalContainer = document.getElementById('orbitalContainer');
    const orbitItems = document.querySelectorAll('.orbit-item');

    if (!orbitRing || !centerLaptop) return;

    // ─── 1. POSITION ORBIT ITEMS ───
    const totalSkills = orbitItems.length;
    const radius = orbitalContainer.offsetWidth / 2 - 40;

    function positionItems(rotationAngle = 0) {
        const containerRect = orbitalContainer.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const currentRadius = Math.min(containerRect.width, containerRect.height) / 2 - 40;

        orbitItems.forEach((item, index) => {
            const angle = (index / totalSkills) * 2 * Math.PI + rotationAngle;
            const x = centerX + currentRadius * Math.cos(angle) - 28;
            const y = centerY + currentRadius * Math.sin(angle) - 28;
            
            item.style.left = x + 'px';
            item.style.top = y + 'px';
            item.style.transform = 'translate(0, 0)';
            
            // Store the angle for hover effects
            item.dataset.angle = angle;
        });
    }

    // ─── 2. SCROLL-BASED ROTATION ───
    let currentAngle = 0;
    let lastScrollY = window.scrollY;
    let targetAngle = 0;
    let isAnimating = false;

    function updateOrbit() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        // Update angle based on scroll direction
        // Scroll down → clockwise (negative rotation), Scroll up → anti-clockwise (positive rotation)
        const rotationSpeed = 0.003; // Adjust for sensitivity
        targetAngle += scrollDelta * rotationSpeed;
        
        lastScrollY = scrollY;
        
        // Smooth the rotation
        currentAngle += (targetAngle - currentAngle) * 0.08;
        
        // Position items
        positionItems(currentAngle);
        
        // Rotate the laptop slightly
        const laptopRotation = currentAngle * 0.3;
        centerLaptop.style.transform = `rotateY(${laptopRotation * 0.5}deg)`;
        
        requestAnimationFrame(updateOrbit);
    }

    // ─── 3. HANDLE RESIZE ───
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            positionItems(currentAngle);
        }, 200);
    });

    // ─── 4. INITIAL POSITION ───
    // Small delay to ensure container is rendered
    setTimeout(() => {
        positionItems(0);
    }, 100);

    // ─── 5. START THE LOOP ───
    updateOrbit();

    // ─── 6. HOVER EFFECT — PAUSE ROTATION ───
    orbitalContainer.addEventListener('mouseenter', () => {
        // Slow down the rotation on hover
        const slowDown = () => {
            if (orbitalContainer.matches(':hover')) {
                // We can't easily pause the animation loop, but we can reduce the target
                // Actually, we'll keep it running but the user can interact with items
            }
        };
    });

    // ─── 7. TOOLTIP POSITIONING ───
    orbitItems.forEach(item => {
        const tooltip = item.querySelector('.orbit-tooltip');
        if (tooltip) {
            // Tooltip is positioned with CSS
        }
    });

    // ─── 8. SCROLL INDICATOR FOR THE SECTION ───
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsSection.classList.add('skills-visible');
                }
            });
        }, { threshold: 0.1 });
        observer.observe(skillsSection);
    }

    console.log('🚀 Orbital skills section loaded! Rotate based on scroll.');
});

/* ================================================================
   PROJECTS SECTION — Scroll Trigger + Floating Animation
   Add to your js/script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    // ─── 1. SCROLL TRIGGER — REVEAL CARDS ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                // Add visible class to trigger floating animation
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // ─── 2. CARD 3D TILT ───
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = x * 5;
            const rotateX = -y * 4;
            card.style.transform = 
                `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ─── 3. TECH TAGS HOVER EFFECT ───
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
            tag.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
            tag.style.boxShadow = '';
        });
    });

    console.log('🚀 Projects section loaded with floating animation!');
});

/* ================================================================
   CV SECTION — Paper-style PDF Layout (Black & White)
   Add to your js/script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    const cvPaper = document.querySelector('.cv-paper');

    // ─── 1. PAPER TILT ON HOVER ───
    if (cvPaper) {
        cvPaper.addEventListener('mousemove', (e) => {
            const rect = cvPaper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = x * 2;
            const rotateX = -y * 1.5;
            cvPaper.style.transform = 
                `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-2px)`;
        });

        cvPaper.addEventListener('mouseleave', () => {
            cvPaper.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0)';
        });
    }

    // ─── 2. SCROLL REVEAL FOR CV PAPER ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cvPaper.style.opacity = '1';
                cvPaper.style.transform = 'translateY(0)';
                observer.unobserve(cvPaper);
            }
        });
    }, { threshold: 0.1 });

    if (cvPaper) {
        cvPaper.style.opacity = '0';
        cvPaper.style.transform = 'translateY(30px)';
        cvPaper.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(cvPaper);
    }

    console.log('📄 CV Paper-style section loaded!');
});

/* ================================================================
   CERTIFICATE SECTION — Floating Animation + Scroll Trigger
   Add to your js/script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    const certificateCards = document.querySelectorAll('.certificate-card');

    // ─── 1. SCROLL TRIGGER — REVEAL CARDS ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    certificateCards.forEach(card => {
        observer.observe(card);
    });

    // ─── 2. CARD 3D TILT ───
    certificateCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = x * 5;
            const rotateX = -y * 4;
            card.style.transform = 
                `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-12px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    console.log('📜 Certificate section loaded with floating animation!');
});

/* ================================================================
   FOOTER SECTION — Smooth scroll & interactions
   Add to your js/script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ─── 1. SMOOTH SCROLL FOR FOOTER LINKS ───
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-logo');

    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ─── 2. SOCIAL ICONS HOVER EFFECT ───
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add a subtle scale effect
            this.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // ─── 3. FOOTER REVEAL ANIMATION ───
    const footer = document.querySelector('.footer-section');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.style.opacity = '1';
                    footer.style.transform = 'translateY(0)';
                    observer.unobserve(footer);
                }
            });
        }, { threshold: 0.1 });

        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
        footer.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(footer);
    }

    // ─── 4. YEAR AUTO-UPDATE ───
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace('2025', year);
    }

    console.log('🚀 Footer loaded successfully!');
});
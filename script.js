// ============================================
// SWISS PUNK - MAIN JAVASCRIPT
// Interactive Chaos & Controlled Disruption
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation Active State
    setActiveNavLink();
    
    // Glitch Effect on Main Title
    initGlitchEffect();
    
    // Random Color Shifts
    initColorShifts();
    
    // Parallax Scroll Effects
    initParallaxEffects();
    
    // Interactive Grid Items
    initGridInteractions();
    
    // Dynamic Background Noise
    initBackgroundNoise();
    
    // Typewriter Effect for Quotes
    initTypewriterEffect();
    
    // Fragment Animation
    initFragmentAnimation();
});

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ============================================
// GLITCH EFFECT
// ============================================
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.main-title');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                
                setTimeout(() => {
                    element.style.transform = 'translate(0, 0)';
                }, 50);
            }
        }, 100);
    });
}

// ============================================
// COLOR SHIFTS
// ============================================
function initColorShifts() {
    const shiftElements = document.querySelectorAll('.title-line');
    const colors = ['#FF0080', '#00FF41', '#FFFF00', '#00FFFF', '#000000'];
    
    shiftElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.color = randomColor;
            this.style.transform = `scale(${1 + Math.random() * 0.2}) rotate(${Math.random() * 10 - 5}deg)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.grid-item, .feature-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const yPos = -(scrolled * speed / 100);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// GRID INTERACTIONS
// ============================================
function initGridInteractions() {
    const gridItems = document.querySelectorAll('.grid-item, .char-card, .pioneer-card');
    
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            // Random skew on hover
            const skewX = Math.random() * 4 - 2;
            const skewY = Math.random() * 4 - 2;
            this.style.transform = `skew(${skewX}deg, ${skewY}deg) scale(1.02)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'skew(0deg, 0deg) scale(1)';
        });
    });
}

// ============================================
// BACKGROUND NOISE ANIMATION
// ============================================
function initBackgroundNoise() {
    const noiseElements = document.querySelectorAll('.nav-noise, .cta-noise-bg');
    
    noiseElements.forEach(element => {
        let offset = 0;
        setInterval(() => {
            offset += 1;
            element.style.backgroundPosition = `${offset}px 0`;
        }, 50);
    });
}

// ============================================
// TYPEWRITER EFFECT
// ============================================
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && i === 0) {
                    const typing = setInterval(() => {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                        } else {
                            clearInterval(typing);
                        }
                    }, 50);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ============================================
// FRAGMENT ANIMATION
// ============================================
function initFragmentAnimation() {
    const fragments = document.querySelectorAll('.title-fragment');
    
    fragments.forEach((fragment, index) => {
        fragment.addEventListener('click', function() {
            // Create explosion effect
            this.style.transition = 'all 0.5s ease-out';
            this.style.transform = `
                translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)
                rotate(${Math.random() * 360}deg)
                scale(${Math.random() * 2})
            `;
            this.style.opacity = '0';
            
            // Reset after animation
            setTimeout(() => {
                this.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                this.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
                this.style.opacity = '1';
            }, 500);
        });
    });
}

// ============================================
// RANDOM DECORATION ROTATIONS
// ============================================
setInterval(() => {
    const decorations = document.querySelectorAll('.card-decoration, .char-decoration');
    decorations.forEach(deco => {
        if (Math.random() > 0.98) {
            const currentRotation = parseInt(deco.style.transform.replace(/[^\d-]/g, '')) || 45;
            deco.style.transition = 'transform 0.5s ease';
            deco.style.transform = `rotate(${currentRotation + 90}deg)`;
        }
    });
}, 1000);

// ============================================
// KONAMI CODE EASTER EGG
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateChaosMode();
    }
});

function activateChaosMode() {
    document.body.style.animation = 'chaos-spin 10s ease-in-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes chaos-spin {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(720deg) scale(1.5); }
            100% { transform: rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add random colors
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (Math.random() > 0.8) {
            el.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
    });
    
    // Reset after 10 seconds
    setTimeout(() => {
        location.reload();
    }, 10000);
}

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '3px';
        trail.style.height = '3px';
        trail.style.background = ['#FF0080', '#00FF41', '#FFFF00', '#00FFFF'][Math.floor(Math.random() * 4)];
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.borderRadius = '50%';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.transition = 'all 0.5s ease-out';
            trail.style.transform = 'scale(4)';
            trail.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
});

// ============================================
// CARD FLIP ON CLICK
// ============================================
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transition = 'transform 0.6s';
        this.style.transform = 'rotateY(360deg)';
        
        setTimeout(() => {
            this.style.transform = 'rotateY(0deg)';
        }, 600);
    });
});

// ============================================
// BUTTON INTERACTIONS
// ============================================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = `skew(-5deg) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'skew(0deg) scale(1)';
    });
    
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c SWISS PUNK ', 'background: #FF0080; color: #000; font-size: 30px; font-weight: bold; padding: 10px;');
console.log('%c Breaking the grid since 1978 ', 'background: #00FF41; color: #000; font-size: 16px; padding: 5px;');
console.log('%c Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A ', 'background: #000; color: #FFFF00; font-size: 12px; padding: 5px;');
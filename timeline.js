// ============================================
// TIMELINE PAGE - Scroll Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeTimeline();
});

function initializeTimeline() {
    // Scroll indicator animation
    animateScrollIndicator();
    
    // Parallax effects on scroll
    window.addEventListener('scroll', handleTimelineScroll);
    
    // Intersection Observer for event reveals
    observeTimelineEvents();
    
    // Initialize visual demos
    initializeVisualDemos();
}

function animateScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;
    
    setInterval(() => {
        indicator.style.transform = 'translateY(10px)';
        setTimeout(() => {
            indicator.style.transform = 'translateY(0)';
        }, 500);
    }, 1500);
}

function handleTimelineScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax on timeline events
    const events = document.querySelectorAll('.timeline-event');
    events.forEach((event, index) => {
        const speed = (index % 3 + 1) * 0.3;
        const yPos = -(scrolled * speed / 50);
        event.style.transform = `translateY(${yPos}px)`;
    });
    
    // Era markers sticky effect simulation
    const eras = document.querySelectorAll('.timeline-era');
    eras.forEach(era => {
        const rect = era.getBoundingClientRect();
        const marker = era.querySelector('.era-marker');
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            marker.style.position = 'sticky';
            marker.style.top = '100px';
        }
    });
}

function observeTimelineEvents() {
    const options = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger animations for specific demos
                const demo = entry.target.querySelector('.event-visual');
                if (demo) {
                    animateDemo(demo);
                }
            }
        });
    }, options);
    
    document.querySelectorAll('.timeline-event').forEach(event => {
        observer.observe(event);
    });
}

function animateDemo(demo) {
    if (demo.classList.contains('helvetica-demo')) {
        const text = demo.querySelector('span');
        if (text) {
            text.style.animation = 'fadeInScale 1s ease-out';
        }
    }
    
    if (demo.classList.contains('punk-demo')) {
        const text = demo.querySelector('.punk-text');
        if (text) {
            text.style.animation = 'shakeIn 0.8s ease-out';
        }
    }
    
    if (demo.classList.contains('breakthrough-demo')) {
        const texts = demo.querySelectorAll('.breakthrough-text');
        texts.forEach((text, i) => {
            setTimeout(() => {
                text.style.animation = 'explodeIn 0.6s ease-out';
            }, i * 200);
        });
    }
    
    if (demo.classList.contains('glitch-demo')) {
        const text = demo.querySelector('.glitch-text');
        if (text) {
            setInterval(() => {
                text.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`;
            }, 100);
        }
    }
}

function initializeVisualDemos() {
    // Grid demo animation
    const gridDemos = document.querySelectorAll('.demo-grid');
    gridDemos.forEach(grid => {
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            grid.appendChild(cell);
        }
    });
    
    // Rave text glowing effect
    const raveTexts = document.querySelectorAll('.rave-text');
    raveTexts.forEach(text => {
        setInterval(() => {
            const colors = ['#FF0080', '#00FF41', '#FFFF00', '#00FFFF'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            text.style.textShadow = `0 0 20px ${randomColor}, 0 0 40px ${randomColor}`;
        }, 500);
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes shakeIn {
        0% {
            opacity: 0;
            transform: translateX(-50px) rotate(-10deg);
        }
        50% {
            transform: translateX(10px) rotate(5deg);
        }
        100% {
            opacity: 1;
            transform: translateX(0) rotate(0);
        }
    }
    
    @keyframes explodeIn {
        from {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
        to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    .timeline-event {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .timeline-event.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .grid-cell {
        width: 25%;
        height: 50px;
        border: 1px solid #000;
        background: rgba(255, 0, 128, 0.1);
    }
`;
document.head.appendChild(style);

console.log('%c TIMELINE LOADED ', 'background: #FFFF00; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');

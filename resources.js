// ============================================
// RESOURCES PAGE - Interactive Tools
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializePunkifier();
    initializePaletteGenerator();
});

// ============================================
// PUNK-IFY TEXT GENERATOR
// ============================================

function initializePunkifier() {
    const inputText = document.getElementById('inputText');
    const generateBtn = document.getElementById('generateBtn');
    const downloadSVG = document.getElementById('downloadSVG');
    const punkOutput = document.getElementById('punkOutput');
    const presetButtons = document.querySelectorAll('.preset-btn');
    
    let currentStyle = 'weingart';
    
    // Preset button handlers
    presetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            presetButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentStyle = this.dataset.style;
        });
    });
    
    // Generate punk text
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const text = inputText.value || 'PUNK';
            punkifyText(text, currentStyle);
        });
    }
    
    // Download SVG
    if (downloadSVG) {
        downloadSVG.addEventListener('click', function() {
            downloadAsSVG();
        });
    }
}

function punkifyText(text, style) {
    const output = document.getElementById('punkOutput');
    output.innerHTML = ''; // Clear existing
    
    const colors = ['#FF0080', '#00FF41', '#FFFF00', '#00FFFF', '#000000'];
    
    switch(style) {
        case 'weingart':
            // Layered, offset text
            for (let i = 0; i < 3; i++) {
                const span = document.createElement('span');
                span.textContent = text;
                span.className = 'output-text weingart-style';
                span.style.position = 'absolute';
                span.style.fontSize = '80px';
                span.style.fontFamily = 'Bebas Neue, sans-serif';
                span.style.color = colors[i];
                span.style.transform = `translate(${i * 5}px, ${i * 5}px) rotate(${i * 2}deg)`;
                span.style.zIndex = 10 - i;
                output.appendChild(span);
            }
            break;
            
        case 'glitch':
            // Glitch effect
            const glitchSpan = document.createElement('span');
            glitchSpan.textContent = text;
            glitchSpan.className = 'output-text glitch-style';
            glitchSpan.style.fontSize = '80px';
            glitchSpan.style.fontFamily = 'Bebas Neue, sans-serif';
            glitchSpan.style.color = colors[0];
            glitchSpan.style.textShadow = `
                3px 3px 0 ${colors[1]},
                -3px -3px 0 ${colors[2]},
                3px -3px 0 ${colors[3]}
            `;
            output.appendChild(glitchSpan);
            
            // Animate glitch
            setInterval(() => {
                const offset = Math.random() * 6 - 3;
                glitchSpan.style.transform = `translate(${offset}px, ${offset}px)`;
            }, 100);
            break;
            
        case 'halftone':
            // Halftone dots effect
            const halftoneSpan = document.createElement('span');
            halftoneSpan.textContent = text;
            halftoneSpan.className = 'output-text halftone-style';
            halftoneSpan.style.fontSize = '80px';
            halftoneSpan.style.fontFamily = 'Bebas Neue, sans-serif';
            halftoneSpan.style.color = colors[0];
            halftoneSpan.style.background = 'radial-gradient(circle, #000 20%, transparent 20%)';
            halftoneSpan.style.backgroundSize = '10px 10px';
            halftoneSpan.style.WebkitBackgroundClip = 'text';
            halftoneSpan.style.backgroundClip = 'text';
            halftoneSpan.style.WebkitTextFillColor = 'transparent';
            output.appendChild(halftoneSpan);
            break;
            
        case 'layer':
            // Multiple colored layers
            for (let i = 0; i < 5; i++) {
                const span = document.createElement('span');
                span.textContent = text;
                span.className = 'output-text layer-style';
                span.style.position = 'absolute';
                span.style.fontSize = '80px';
                span.style.fontFamily = 'Bebas Neue, sans-serif';
                span.style.color = colors[i % colors.length];
                span.style.opacity = '0.5';
                span.style.transform = `translate(${i * 8}px, ${i * 8}px)`;
                span.style.zIndex = 10 - i;
                output.appendChild(span);
            }
            break;
            
        case 'chaos':
            // Scattered letters
            const letters = text.split('');
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.className = 'output-text chaos-style';
                span.style.position = 'absolute';
                span.style.fontSize = Math.random() * 60 + 40 + 'px';
                span.style.fontFamily = 'Bebas Neue, sans-serif';
                span.style.color = colors[Math.floor(Math.random() * colors.length)];
                span.style.transform = `
                    translate(${index * 50 + Math.random() * 40 - 20}px, ${Math.random() * 100 - 50}px)
                    rotate(${Math.random() * 60 - 30}deg)
                `;
                span.style.zIndex = index;
                output.appendChild(span);
            });
            break;
    }
}

function downloadAsSVG() {
    const output = document.getElementById('punkOutput');
    const bbox = output.getBoundingClientRect();
    
    let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${bbox.width}" height="${bbox.height}" viewBox="0 0 ${bbox.width} ${bbox.height}">
    <rect width="100%" height="100%" fill="white"/>
    <text x="50%" y="50%" font-family="Bebas Neue, sans-serif" font-size="80" fill="#FF0080" text-anchor="middle" dominant-baseline="middle">
        ${output.textContent}
    </text>
</svg>`;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'swiss-punk-text.svg';
    link.click();
    URL.revokeObjectURL(url);
}

// ============================================
// COLOR PALETTE GENERATOR
// ============================================

function initializePaletteGenerator() {
    const generateBtn = document.getElementById('generatePalette');
    const paletteDisplay = document.getElementById('paletteDisplay');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generateNewPalette);
    }
    
    // Copy button handlers
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            copyToClipboard(color);
            
            // Visual feedback
            this.textContent = 'COPIED!';
            setTimeout(() => {
                this.textContent = 'COPY';
            }, 1000);
        });
    });
}

function generateNewPalette() {
    const paletteDisplay = document.getElementById('paletteDisplay');
    paletteDisplay.innerHTML = '';
    
    // Generate 5 high-contrast, clashing colors
    const palette = generateClashingColors(5);
    
    palette.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.background = color;
        
        const code = document.createElement('span');
        code.className = 'color-code';
        code.textContent = color;
        // Determine text color based on background brightness
        const brightness = getBrightness(color);
        code.style.color = brightness > 128 ? '#000000' : '#FFFFFF';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'COPY';
        copyBtn.dataset.color = color;
        copyBtn.addEventListener('click', function() {
            copyToClipboard(color);
            this.textContent = 'COPIED!';
            setTimeout(() => {
                this.textContent = 'COPY';
            }, 1000);
        });
        
        swatch.appendChild(code);
        swatch.appendChild(copyBtn);
        paletteDisplay.appendChild(swatch);
    });
}

function generateClashingColors(count) {
    const colors = [];
    const hueRanges = [
        [0, 30],      // Reds
        [60, 120],    // Greens/Yellows
        [180, 240],   // Cyans/Blues
        [280, 330]    // Magentas/Pinks
    ];
    
    for (let i = 0; i < count; i++) {
        let hue, saturation, lightness;
        
        if (i < count - 1) {
            // Bright, saturated colors
            const range = hueRanges[i % hueRanges.length];
            hue = Math.random() * (range[1] - range[0]) + range[0];
            saturation = Math.random() * 30 + 70; // 70-100%
            lightness = Math.random() * 20 + 45;  // 45-65%
        } else {
            // One neutral or extreme
            const extremes = [[0, 0, 0], [0, 0, 100], [0, 0, 50]]; // Black, White, Gray
            const extreme = extremes[Math.floor(Math.random() * extremes.length)];
            hue = extreme[0];
            saturation = extreme[1];
            lightness = extreme[2];
        }
        
        colors.push(hslToHex(hue, saturation, lightness));
    }
    
    return colors;
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getBrightness(hexColor) {
    const rgb = hexColor.match(/\w\w/g).map(x => parseInt(x, 16));
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

console.log('%c RESOURCES LOADED ', 'background: #00FF41; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');

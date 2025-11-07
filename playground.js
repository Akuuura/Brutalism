// ============================================
// SWISS PUNK PLAYGROUND - Interactive Design Tool
// ============================================

let currentElement = null;
let elementCounter = 1;
let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;

document.addEventListener('DOMContentLoaded', function() {
    initializePlayground();
});

function initializePlayground() {
    // Get controls
    const textInput = document.getElementById('textInput');
    const fontSize = document.getElementById('fontSize');
    const rotation = document.getElementById('rotation');
    const letterSpacing = document.getElementById('letterSpacing');
    const glitchIntensity = document.getElementById('glitchIntensity');
    const layerCount = document.getElementById('layerCount');
    const skewX = document.getElementById('skewX');
    const skewY = document.getElementById('skewY');
    const enableHalftone = document.getElementById('enableHalftone');
    const showGrid = document.getElementById('showGrid');
    const breakGrid = document.getElementById('breakGrid');
    
    // Get action buttons
    const randomizeBtn = document.getElementById('randomize');
    const resetBtn = document.getElementById('reset');
    const addElementBtn = document.getElementById('addElement');
    const exportBtn = document.getElementById('export');
    
    // Get canvas
    const canvas = document.getElementById('playgroundCanvas');
    
    // Select first element by default
    currentElement = document.querySelector('.draggable-element');
    if (currentElement) {
        selectElement(currentElement);
    }
    
    // Event listeners for controls
    if (textInput) {
        textInput.addEventListener('input', (e) => {
            if (currentElement) {
                currentElement.querySelector('.element-text').textContent = e.target.value || 'PUNK';
            }
        });
    }
    
    if (fontSize) {
        fontSize.addEventListener('input', (e) => {
            document.getElementById('fontSizeValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (rotation) {
        rotation.addEventListener('input', (e) => {
            document.getElementById('rotationValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (letterSpacing) {
        letterSpacing.addEventListener('input', (e) => {
            document.getElementById('spacingValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (glitchIntensity) {
        glitchIntensity.addEventListener('input', (e) => {
            document.getElementById('glitchValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (layerCount) {
        layerCount.addEventListener('input', (e) => {
            document.getElementById('layerValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (skewX) {
        skewX.addEventListener('input', (e) => {
            document.getElementById('skewXValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (skewY) {
        skewY.addEventListener('input', (e) => {
            document.getElementById('skewYValue').textContent = e.target.value;
            updateElement();
        });
    }
    
    if (enableHalftone) {
        enableHalftone.addEventListener('change', updateElement);
    }
    
    if (showGrid) {
        showGrid.addEventListener('change', (e) => {
            canvas.classList.toggle('show-grid', e.target.checked);
        });
    }
    
    if (breakGrid) {
        breakGrid.addEventListener('change', (e) => {
            canvas.classList.toggle('broken-grid', e.target.checked);
        });
    }
    
    // Color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (currentElement) {
                const color = e.target.dataset.color;
                currentElement.querySelector('.element-text').style.color = color;
            }
        });
    });
    
    // Action buttons
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', randomizeElement);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetElement);
    }
    
    if (addElementBtn) {
        addElementBtn.addEventListener('click', addNewElement);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportCanvas);
    }
    
    // Initialize drag functionality
    initDragAndDrop();
}

function updateElement() {
    if (!currentElement) return;
    
    const text = currentElement.querySelector('.element-text');
    const fontSize = document.getElementById('fontSize').value;
    const rotation = document.getElementById('rotation').value;
    const letterSpacing = document.getElementById('letterSpacing').value;
    const glitch = document.getElementById('glitchIntensity').value;
    const layers = parseInt(document.getElementById('layerCount').value);
    const skewX = document.getElementById('skewX').value;
    const skewY = document.getElementById('skewY').value;
    const halftone = document.getElementById('enableHalftone').checked;
    
    // Apply basic styles
    text.style.fontSize = fontSize + 'px';
    text.style.letterSpacing = letterSpacing + 'px';
    
    // Build transform
    let transform = `rotate(${rotation}deg) skew(${skewX}deg, ${skewY}deg)`;
    
    // Add glitch effect
    if (glitch > 0) {
        const offset = glitch / 10;
        text.style.textShadow = `
            ${offset}px ${offset}px 0 #FF0080,
            ${-offset}px ${-offset}px 0 #00FF41,
            ${offset}px ${-offset}px 0 #FFFF00
        `;
    } else {
        text.style.textShadow = 'none';
    }
    
    text.style.transform = transform;
    
    // Handle layers
    const existingLayers = currentElement.querySelectorAll('.layer-clone');
    existingLayers.forEach(layer => layer.remove());
    
    if (layers > 1) {
        for (let i = 1; i < layers; i++) {
            const clone = text.cloneNode(true);
            clone.classList.add('layer-clone');
            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.opacity = '0.5';
            clone.style.zIndex = '-1';
            clone.style.transform = transform + ` translate(${i * 3}px, ${i * 3}px)`;
            
            const colors = ['#FF0080', '#00FF41', '#FFFF00', '#00FFFF'];
            clone.style.color = colors[i % colors.length];
            
            currentElement.appendChild(clone);
        }
    }
    
    // Halftone effect
    if (halftone) {
        currentElement.classList.add('halftone-effect');
    } else {
        currentElement.classList.remove('halftone-effect');
    }
}

function randomizeElement() {
    if (!currentElement) return;
    
    // Randomize all controls
    document.getElementById('fontSize').value = Math.floor(Math.random() * 150) + 30;
    document.getElementById('rotation').value = Math.floor(Math.random() * 360) - 180;
    document.getElementById('letterSpacing').value = Math.floor(Math.random() * 40) - 10;
    document.getElementById('glitchIntensity').value = Math.floor(Math.random() * 100);
    document.getElementById('layerCount').value = Math.floor(Math.random() * 5) + 1;
    document.getElementById('skewX').value = Math.floor(Math.random() * 60) - 30;
    document.getElementById('skewY').value = Math.floor(Math.random() * 60) - 30;
    document.getElementById('enableHalftone').checked = Math.random() > 0.5;
    
    // Update value displays
    document.getElementById('fontSizeValue').textContent = document.getElementById('fontSize').value;
    document.getElementById('rotationValue').textContent = document.getElementById('rotation').value;
    document.getElementById('spacingValue').textContent = document.getElementById('letterSpacing').value;
    document.getElementById('glitchValue').textContent = document.getElementById('glitchIntensity').value;
    document.getElementById('layerValue').textContent = document.getElementById('layerCount').value;
    document.getElementById('skewXValue').textContent = document.getElementById('skewX').value;
    document.getElementById('skewYValue').textContent = document.getElementById('skewY').value;
    
    // Random color
    const colors = ['#FF0080', '#00FF41', '#FFFF00', '#00FFFF', '#000000', '#FFFFFF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    currentElement.querySelector('.element-text').style.color = randomColor;
    
    // Random position
    const canvas = document.getElementById('playgroundCanvas');
    const maxX = canvas.offsetWidth - 200;
    const maxY = canvas.offsetHeight - 100;
    currentElement.style.left = Math.floor(Math.random() * maxX) + 'px';
    currentElement.style.top = Math.floor(Math.random() * maxY) + 'px';
    
    updateElement();
}

function resetElement() {
    if (!currentElement) return;
    
    // Reset all controls to defaults
    document.getElementById('textInput').value = 'PUNK';
    document.getElementById('fontSize').value = 80;
    document.getElementById('rotation').value = 0;
    document.getElementById('letterSpacing').value = 0;
    document.getElementById('glitchIntensity').value = 0;
    document.getElementById('layerCount').value = 1;
    document.getElementById('skewX').value = 0;
    document.getElementById('skewY').value = 0;
    document.getElementById('enableHalftone').checked = false;
    
    // Update displays
    document.getElementById('fontSizeValue').textContent = '80';
    document.getElementById('rotationValue').textContent = '0';
    document.getElementById('spacingValue').textContent = '0';
    document.getElementById('glitchValue').textContent = '0';
    document.getElementById('layerValue').textContent = '1';
    document.getElementById('skewXValue').textContent = '0';
    document.getElementById('skewYValue').textContent = '0';
    
    // Reset element
    currentElement.querySelector('.element-text').textContent = 'PUNK';
    currentElement.querySelector('.element-text').style.color = '#000000';
    currentElement.style.left = '50px';
    currentElement.style.top = '50px';
    
    updateElement();
}

function addNewElement() {
    elementCounter++;
    const canvas = document.getElementById('playgroundCanvas');
    
    const newElement = document.createElement('div');
    newElement.classList.add('draggable-element');
    newElement.dataset.id = elementCounter;
    newElement.style.left = (50 + (elementCounter * 30)) + 'px';
    newElement.style.top = (50 + (elementCounter * 30)) + 'px';
    
    const text = document.createElement('span');
    text.classList.add('element-text');
    text.textContent = 'NEW';
    
    newElement.appendChild(text);
    canvas.appendChild(newElement);
    
    // Initialize drag for new element
    initDragForElement(newElement);
    
    // Select the new element
    selectElement(newElement);
}

function selectElement(element) {
    // Deselect all
    document.querySelectorAll('.draggable-element').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Select this one
    element.classList.add('selected');
    currentElement = element;
    
    // Update controls to match element's current state
    const text = element.querySelector('.element-text');
    document.getElementById('textInput').value = text.textContent;
}

function initDragAndDrop() {
    const elements = document.querySelectorAll('.draggable-element');
    elements.forEach(element => {
        initDragForElement(element);
    });
}

function initDragForElement(element) {
    element.addEventListener('mousedown', dragStart);
    element.addEventListener('click', () => selectElement(element));
}

function dragStart(e) {
    if (e.target.classList.contains('draggable-element') || e.target.classList.contains('element-text')) {
        const element = e.target.classList.contains('draggable-element') ? e.target : e.target.parentElement;
        
        initialX = e.clientX - element.offsetLeft;
        initialY = e.clientY - element.offsetTop;
        
        isDragging = true;
        currentElement = element;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }
}

function drag(e) {
    if (isDragging && currentElement) {
        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        
        currentElement.style.left = currentX + 'px';
        currentElement.style.top = currentY + 'px';
    }
}

function dragEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
}

function exportCanvas() {
    // Use html2canvas library if available, otherwise provide instructions
    const canvas = document.getElementById('playgroundCanvas');
    
    // Simple export using browser's built-in screenshot capability
    alert('To export your design:\n\n1. Right-click on the canvas area\n2. Select "Save image as..."\n\nOr use your browser\'s screenshot tool (Ctrl+Shift+S in Firefox, or screenshot extensions in Chrome).\n\nFor best results, install the "Awesome Screenshot" browser extension!');
    
    // Alternative: Open in new window for easier screenshot
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Swiss Punk Export</title>
            <link rel="stylesheet" href="styles.css">
            <style>
                body { margin: 0; padding: 0; overflow: hidden; }
                #export-canvas { 
                    width: 100vw; 
                    height: 100vh; 
                    background: white;
                    position: relative;
                }
            </style>
        </head>
        <body>
            <div id="export-canvas">${canvas.innerHTML}</div>
        </body>
        </html>
    `);
}

console.log('%c PLAYGROUND READY ', 'background: #FF0080; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Start creating! ', 'background: #00FF41; color: #000; font-size: 14px; padding: 5px;');

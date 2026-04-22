/* ============================================
   CRAFT BURGER — Premium 3D Experience
   Main JavaScript
   ============================================ */

(function () {
    'use strict';

    // ── Configuration ──
    const CONFIG = {
        totalFrames: 240,
        imagePath: 'burgerpics/ezgif-frame-',
        imageExt: '.jpg',
        scrollMultiplier: 1, // frames per scroll unit
    };

    // ── State ──
    const state = {
        images: [],
        loadedCount: 0,
        currentFrame: 0,
        isReady: false,
    };

    // ── DOM References ──
    const dom = {
        preloader: document.getElementById('preloader'),
        preloaderBar: document.getElementById('preloader-bar'),
        preloaderStatus: document.getElementById('preloader-status'),
        canvas: document.getElementById('burger-canvas'),
        canvasContainer: document.getElementById('canvas-container'),
        nav: document.getElementById('main-nav'),
        heroText: document.getElementById('hero-text'),
        scrollIndicator: document.getElementById('scroll-indicator'),
        heroGlow: document.getElementById('hero-glow'),
        burgerGlow: document.getElementById('burger-ambient-glow'),
        panelStory: document.getElementById('panel-story'),
        panelCraft: document.getElementById('panel-craft'),
        panelIngredients: document.getElementById('panel-ingredients'),
        finalContent: document.getElementById('final-content'),
    };

    const ctx = dom.canvas.getContext('2d');

    // ── Utility: pad number to 3 digits ──
    function padNum(n) {
        return String(n).padStart(3, '0');
    }

    // ── Image Preloading ──
    function preloadImages() {
        return new Promise((resolve) => {
            let loaded = 0;

            for (let i = 1; i <= CONFIG.totalFrames; i++) {
                const img = new Image();
                img.src = `${CONFIG.imagePath}${padNum(i)}${CONFIG.imageExt}`;

                img.onload = () => {
                    loaded++;
                    state.loadedCount = loaded;

                    // Update preloader bar
                    const pct = Math.round((loaded / CONFIG.totalFrames) * 100);
                    dom.preloaderBar.style.width = pct + '%';
                    dom.preloaderStatus.textContent = `Loading ${pct}%`;

                    if (loaded === CONFIG.totalFrames) {
                        resolve();
                    }
                };

                img.onerror = () => {
                    loaded++;
                    console.warn(`Failed to load frame ${i}`);
                    if (loaded === CONFIG.totalFrames) {
                        resolve();
                    }
                };

                state.images[i - 1] = img;
            }
        });
    }

    // ── Canvas Rendering ──
    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        dom.canvas.width = window.innerWidth * dpr;
        dom.canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        dom.canvas.style.width = window.innerWidth + 'px';
        dom.canvas.style.height = window.innerHeight + 'px';
    }

    function renderFrame(index) {
        const frameIdx = Math.max(0, Math.min(CONFIG.totalFrames - 1, Math.round(index)));

        if (frameIdx === state.currentFrame && state.isReady) return;
        state.currentFrame = frameIdx;

        const img = state.images[frameIdx];
        if (!img || !img.complete) return;

        const cw = window.innerWidth;
        const ch = window.innerHeight;

        ctx.clearRect(0, 0, cw, ch);

        // Calculate aspect-fit dimensions
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider — fit to height
            drawH = ch;
            drawW = drawH * imgRatio;
        } else {
            // Canvas is taller — fit to width
            drawW = cw;
            drawH = drawW / imgRatio;
        }

        drawX = (cw - drawW) / 2;
        drawY = (ch - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // ── GSAP ScrollTrigger Setup ──
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // ─── Frame scrubbing tied to scroll ───
        const frameObj = { frame: 0 };

        gsap.to(frameObj, {
            frame: CONFIG.totalFrames - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: '#scroll-spacer',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
            onUpdate: function () {
                renderFrame(frameObj.frame);
            },
        });

        // ─── Hero text entrance ───
        const heroTl = gsap.timeline({ delay: 0.3 });
        heroTl
            .to(dom.heroText, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
            })
            .to(dom.scrollIndicator, {
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.4');

        // ─── Hero text fade out on scroll ───
        gsap.to(dom.heroText, {
            opacity: 0,
            y: -60,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: '#scroll-spacer',
                start: 'top top',
                end: '5% top',
                scrub: true,
            },
        });

        gsap.to(dom.scrollIndicator, {
            opacity: 0,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: '#scroll-spacer',
                start: 'top top',
                end: '3% top',
                scrub: true,
            },
        });

        // ─── Hero glow intensity on scroll ───
        gsap.to(dom.heroGlow, {
            opacity: 0,
            scale: 1.5,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: '#scroll-spacer',
                start: 'top top',
                end: '10% top',
                scrub: true,
            },
        });

        // ─── Ambient glow pulsation ───
        gsap.to(dom.burgerGlow, {
            scale: 1.2,
            opacity: 0.8,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
        });

        // ─── Navbar scroll state ───
        ScrollTrigger.create({
            start: 'top -80',
            onUpdate: (self) => {
                if (self.direction === 1 && self.scroll() > 80) {
                    dom.nav.classList.add('scrolled');
                } else if (self.scroll() < 80) {
                    dom.nav.classList.remove('scrolled');
                }
            },
        });

        // ─── Glass panel reveals ───
        const panels = [dom.panelStory, dom.panelCraft, dom.panelIngredients];

        panels.forEach((panel) => {
            if (!panel) return;

            ScrollTrigger.create({
                trigger: panel.closest('.overlay-section'),
                start: 'top 70%',
                end: 'bottom 30%',
                onEnter: () => panel.classList.add('visible'),
                onLeave: () => panel.classList.remove('visible'),
                onEnterBack: () => panel.classList.add('visible'),
                onLeaveBack: () => panel.classList.remove('visible'),
            });
        });

        // ─── Final section reveal ───
        gsap.to(dom.finalContent, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#final',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            },
        });

        // ─── Canvas container gentle float when idle ───
        gsap.to(dom.canvasContainer, {
            y: -8,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    }

    // ── Initialization ──
    async function init() {
        resizeCanvas();
        window.addEventListener('resize', () => {
            resizeCanvas();
            renderFrame(state.currentFrame);
        });

        // Preload all images
        await preloadImages();

        // Mark ready
        state.isReady = true;

        // Render first frame
        renderFrame(0);

        // Hide preloader
        dom.preloader.classList.add('hidden');

        // Init GSAP animations after a short delay
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    }

    // ── Boot ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

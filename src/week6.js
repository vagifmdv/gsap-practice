import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(
  Observer,
  SplitText,
  ScrollTrigger,
  CustomEase,
  TextPlugin,
  ScrambleTextPlugin,
  MorphSVGPlugin
);

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log(gsap.version);

  // ————— LENIS ————— //
  ('use strict');
  let lenis;
  if (Webflow.env('editor') === undefined) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.2,
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
  }
  // ————— LENIS ————— //

  // ————— MAGNETIC BUTTON ————— //

  const magneticButtons = document.querySelectorAll('.button.is-magnetic');

  magneticButtons.forEach((button) => {
    const quickX = gsap.quickTo(button, 'x', { duration: 0.3, ease: 'power2.out' });
    const quickY = gsap.quickTo(button, 'y', { duration: 0.3, ease: 'power2.out' });

    const magneticDistance = 50; // Distance from button edges
    let isActive = false;

    document.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();

      // Calculate distance from cursor to button edges
      const closestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const closestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));

      const deltaX = e.clientX - closestX;
      const deltaY = e.clientY - closestY;
      const distanceFromEdge = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distanceFromEdge <= magneticDistance) {
        if (!isActive) {
          isActive = true;
          gsap.to(button, { duration: 0.3, ease: 'power2.out' });
        }

        // Calculate magnetic pull from button center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pullX = e.clientX - centerX;
        const pullY = e.clientY - centerY;

        const strength = 0.4;
        quickX(pullX * strength);
        quickY(pullY * strength);
      } else {
        if (isActive) {
          isActive = false;
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      }
    });
  });
  // ————— MAGNETIC BUTTON ————— //

  // ————— BACKGROUND FILL BUTTON ————— //

  const fillButtons = document.querySelectorAll('.button.is-fill');

  fillButtons.forEach((button) => {
    const fillColor = '#0465a6ff';
    const baseColor = '#000000';

    // Set CSS custom property for width
    button.style.setProperty('--fill-width', '0%');
    button.style.background = `linear-gradient(to right, ${fillColor} var(--fill-width), ${baseColor} var(--fill-width))`;

    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        '--fill-width': '100%',
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        '--fill-width': '0%',
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });

  // ————— BACKGROUND FILL BUTTON ————— //

  // ————— SPLIT TEXT BUTTON ————— //

  // Splitting the text
  function createSplit() {
    return SplitText.create('.button.is-split .button-text', {
      type: 'chars',
      charsClass: 'char',
    });
  }

  let split = createSplit();

  // Resplitting on window resize
  function handleResize() {
    split.revert();
    split = createSplit();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });

  // Animation
  const splitButtons = document.querySelectorAll('.button.is-split');
  splitButtons.forEach((button) => {
    const letters = button.querySelectorAll('.char');
    button.addEventListener('mouseenter', function () {
      gsap.to(button.querySelectorAll('.char'), {
        yPercent: -100,
        duration: 0.5,
        ease: 'power4.inOut',
        stagger: { each: 0.02, from: 'start' },
      });
    });
    button.addEventListener('mouseleave', function () {
      gsap.to(button.querySelectorAll('.char'), {
        yPercent: 0,
        duration: 0.3,
        ease: 'power4.inOut',
        stagger: { each: 0.02, from: 'end' },
      });
    });
  });
  // ————— SPLIT TEXT BUTTON ————— //

  // ————— ICON MORPH BUTTON ————— //

  const morphButtons = document.querySelectorAll('.button.is-morph');
  morphButtons.forEach((button) => {
    const icon1 = button.querySelectorAll('.icon1');
    const icon2 = button.querySelectorAll('.icon2');

    gsap.set(icon2, { autoAlpha: 0 });

    button.addEventListener('mouseenter', function () {
      gsap.to(icon1, {
        morphSVG: icon2,
        duration: 0.3,
        ease: 'power2.Out',
      });
    });
    button.addEventListener('mouseleave', function () {
      gsap.to(icon1, {
        morphSVG: icon1,
        duration: 0.3,
        ease: 'power2.Out',
      });
    });
  });

  // ————— ICON MORPH BUTTON ————— //

  // ————— RIPPLE BUTTON ————— //

  const rippleButtons = document.querySelectorAll('.button.is-ripple');

  rippleButtons.forEach((button) => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 0, 0, 1)'; // Change color as needed
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '0px';
      ripple.style.height = '0px';

      button.appendChild(ripple);

      // Calculate size for ripple to cover entire button
      const size = Math.max(rect.width, rect.height) * 2;

      // Animate ripple
      gsap.to(ripple, {
        width: size + 'px',
        height: size + 'px',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          ripple.remove();
        },
      });
    });
  });

  // ————— RIPPLE BUTTON ————— //

  // ————— CUSTOM CURSOR ————— //
  const cursor = document.querySelector('.cursor');

  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  let xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' });
  let yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Custom cursor controller

  if (cursor) {
    // Function to remove all combo classes
    function removeAllClasses() {
      cursor.classList.remove('is-text', 'is-pointer', 'is-click');
    }

    // Function to check if element or its parents contain text
    function isTextElement(element) {
      // Common text elements (excluding DIV since it's often a container)
      const textTags = [
        'P',
        'H1',
        'H2',
        'H3',
        'H4',
        'H5',
        'H6',
        'SPAN',
        'LI',
        'TD',
        'TH',
        'LABEL',
        'STRONG',
        'EM',
        'B',
        'I',
        'SMALL',
        'MARK',
        'SUB',
        'SUP',
      ];

      // Special handling for DIVs - only consider them text elements if they have direct text content
      if (element.tagName === 'DIV') {
        // Only check direct text nodes
        for (let child of element.childNodes) {
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
            return true;
          }
        }
        return false;
      }

      // Check if element is a text node or contains text
      if (element.nodeType === Node.TEXT_NODE && element.textContent.trim()) {
        return true;
      }

      // Check if element is a text tag and has text content
      if (textTags.includes(element.tagName) && element.textContent.trim()) {
        return true;
      }

      return false;
    }

    // Function to check if element is a link
    function isLinkElement(element) {
      return (
        element.tagName === 'A' ||
        element.closest('a') ||
        element.style.cursor === 'pointer' ||
        window.getComputedStyle(element).cursor === 'pointer'
      );
    }

    // Mouse move event to handle hover states
    document.addEventListener('mousemove', (e) => {
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);

      if (!elementUnderCursor || elementUnderCursor === cursor) {
        removeAllClasses();
        return;
      }

      // Remove click class on mouse move (click should be temporary)
      cursor.classList.remove('is-click');

      // Check for link first (higher priority)
      if (isLinkElement(elementUnderCursor)) {
        removeAllClasses();
        cursor.classList.add('is-pointer');
      }
      // Then check for text
      else if (isTextElement(elementUnderCursor)) {
        removeAllClasses();
        cursor.classList.add('is-text');
      }
      // Default state
      else {
        removeAllClasses();
      }
    });

    // Mouse down event for click state
    document.addEventListener('mousedown', (e) => {
      cursor.classList.add('is-click');
    });

    // Mouse up event to remove click state
    document.addEventListener('mouseup', (e) => {
      cursor.classList.remove('is-click');
    });

    // Handle mouse leave to reset cursor
    document.addEventListener('mouseleave', () => {
      removeAllClasses();
    });

    // Optional: Handle cases where mouse enters from outside
    document.addEventListener('mouseenter', (e) => {
      // Trigger mousemove logic when mouse enters document
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: e.clientX,
        clientY: e.clientY,
      });
      document.dispatchEvent(mouseMoveEvent);
    });
  }

  // ————— CUSTOM CURSOR ————— //

  // ————— IMAGE GALLERY ————— //

  const imageBlocks = document.querySelectorAll('.week6_image');

  imageBlocks.forEach((block) => {
    // Store original inline styles at page load
    const originalInlineStyles = {
      position: block.style.position,
      width: block.style.width,
      height: block.style.height,
      top: block.style.top,
      left: block.style.left,
      right: block.style.right,
      bottom: block.style.bottom,
      zIndex: block.style.zIndex,
      transform: block.style.transform,
      margin: block.style.margin,
      inset: block.style.inset,
    };

    let isExpanded = false;

    block.addEventListener('click', () => {
      if (!isExpanded) {
        // Store current position at time of click
        const originalRect = block.getBoundingClientRect();

        // Calculate expanded dimensions while preserving aspect ratio
        const blockRatio = originalRect.width / originalRect.height;
        const screenRatio = window.innerWidth / window.innerHeight;

        let newWidth, newHeight;

        if (blockRatio > screenRatio) {
          newWidth = window.innerWidth * 0.9;
          newHeight = newWidth / blockRatio;
        } else {
          newHeight = window.innerHeight * 0.9;
          newWidth = newHeight * blockRatio;
        }

        isExpanded = true;

        // Set initial fixed position at current location
        gsap.set(block, {
          position: 'fixed',
          top: originalRect.top + 'px',
          left: originalRect.left + 'px',
          width: originalRect.width + 'px',
          height: originalRect.height + 'px',
          zIndex: 9999,
          margin: 0,
        });

        // Animate to center with new dimensions
        gsap.to(block, {
          top: '50%',
          left: '50%',
          width: newWidth + 'px',
          height: newHeight + 'px',
          transform: 'translate(-50%, -50%)',
          duration: 0.6,
          ease: 'power2.out',
        });

        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'image-backdrop';
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100vw';
        backdrop.style.height = '100vh';
        backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        backdrop.style.zIndex = '9998';
        backdrop.style.opacity = '0';

        document.body.appendChild(backdrop);

        gsap.to(backdrop, {
          opacity: 1,
          duration: 0.3,
        });

        // Store close function with original data
        block._closeImage = () => closeImage(originalRect);

        // Close on backdrop click
        backdrop.addEventListener('click', block._closeImage);
      } else {
        block._closeImage();
      }

      function closeImage(originalRect) {
        isExpanded = false;

        // Immediately set low z-index so image goes behind nav
        // gsap.set(block, { zIndex: 1 });

        // Remove backdrop with matching timing and ease
        const backdrop = document.querySelector('.image-backdrop');
        if (backdrop) {
          gsap.to(backdrop, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => backdrop.remove(),
          });
        }

        // Animate back to original position
        gsap.to(block, {
          top: originalRect.top + 'px',
          left: originalRect.left + 'px',
          width: originalRect.width + 'px',
          height: originalRect.height + 'px',
          transform: 'none',
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            // Restore original inline styles (which preserves CSS responsiveness)
            Object.keys(originalInlineStyles).forEach((prop) => {
              if (originalInlineStyles[prop]) {
                block.style[prop] = originalInlineStyles[prop];
              } else {
                block.style[prop] = '';
              }
            });
          },
        });
      }
    });
  });

  // ————— IMAGE GALLERY ————— //
});

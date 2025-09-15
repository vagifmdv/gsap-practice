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
  // ————— HERO SLIDER ————— //
  // Scramble text function
  function scrambleText(element, newText, duration = 0.8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const originalText = element.textContent;
    const maxLength = Math.max(originalText.length, newText.length);

    return new Promise((resolve) => {
      let iteration = 0;
      const iterations = maxLength * 2;

      const timer = setInterval(
        () => {
          let scrambled = '';

          for (let i = 0; i < maxLength; i++) {
            if (iteration > i * 2) {
              scrambled += newText[i] || '';
            } else {
              scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          element.textContent = scrambled;
          iteration++;

          if (iteration > iterations) {
            clearInterval(timer);
            element.textContent = newText;
            resolve();
          }
        },
        (duration * 1000) / iterations
      );
    });
  }

  // Slide data
  const slideData = [
    {
      accent: 'exchange',
      metrics: [
        { value: '700+', text: 'Youtube influencers' },
        { value: '1.2K', text: 'Twitter influencers' },
        { value: '7B+', text: 'Impressions' },
      ],
      numeration: '01',
    },
    {
      accent: 'Project',
      metrics: [
        { value: '2B+', text: 'users reached' },
        { value: '3K', text: 'Influencers' },
        { value: '100K', text: 'Paying customers' },
      ],
      numeration: '02',
    },
    {
      accent: 'Token',
      metrics: [
        { value: '5B+', text: 'Under management' },
        { value: '300M', text: 'Market cap' },
        { value: '5', text: 'Successful exits' },
      ],
      numeration: '03',
    },
  ];

  // Elements
  const dots = document.querySelectorAll('.hero_pagination-dot');
  const accentEl = document.querySelector('.hero_title-accent');
  const valueEls = document.querySelectorAll('.hero_metric-value');
  const textEls = document.querySelectorAll('.hero_metric-text');
  const numerationEl = document.querySelector('.hero_numeration');
  const indicatorEl = document.querySelector('.hero_pagination-indicator');

  let currentSlide = 0;
  let isAnimating = false;
  let autoPlayInterval;
  let resumeAutoPlayTimeout;

  // Animation function
  async function animateToSlide(slideIndex) {
    if (isAnimating || slideIndex === currentSlide) return;

    isAnimating = true;
    const data = slideData[slideIndex];

    // Update active dot
    dots[currentSlide]?.classList.remove('is-active');
    dots[slideIndex]?.classList.add('is-active');

    // Animate indicator
    animateIndicator(slideIndex);

    // Animate elements with promises
    const promises = [];

    // Animate accent text
    if (accentEl) {
      promises.push(scrambleText(accentEl, data.accent, 0.6));
    }

    // Animate numeration
    if (numerationEl) {
      promises.push(scrambleText(numerationEl, data.numeration, 0.5));
    }

    // Animate metrics with slight delay
    setTimeout(() => {
      data.metrics.forEach((metric, index) => {
        if (valueEls[index]) {
          promises.push(scrambleText(valueEls[index], metric.value, 0.5));
        }
        if (textEls[index]) {
          promises.push(scrambleText(textEls[index], metric.text, 0.7));
        }
      });
    }, 100);

    await Promise.all(promises);
    currentSlide = slideIndex;
    isAnimating = false;
  }

  // Indicator animation function
  function animateIndicator(slideIndex) {
    if (!indicatorEl) return;

    const positions = ['0rem', '2.5rem', '5rem'];

    gsap.to(indicatorEl, {
      duration: 0.4,
      left: positions[slideIndex],
      right: 'auto',
      x: '0%',
      ease: 'power2.out',
    });
  }

  // Auto-play functionality
  function startAutoPlay() {
    // Clear any existing interval
    stopAutoPlay();

    autoPlayInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slideData.length;
      animateToSlide(nextSlide);
    }, 3000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function pauseAutoPlayWithResume() {
    // Stop current auto-play
    stopAutoPlay();

    // Clear any existing resume timeout
    if (resumeAutoPlayTimeout) {
      clearTimeout(resumeAutoPlayTimeout);
    }

    // Set timeout to resume auto-play after 7 seconds
    resumeAutoPlayTimeout = setTimeout(() => {
      startAutoPlay();
    }, 3000);
  }

  // Add click listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Pause auto-play and resume after delay
      pauseAutoPlayWithResume();
      animateToSlide(index);
    });
  });

  // Initialize - set first button as active and start autoplay
  if (dots[0]) {
    dots[0].classList.add('is-active');
  }

  // Start auto-play after page load
  setTimeout(startAutoPlay, 0);
  // ————— HERO SLIDER ————— //

  // ————— PRELOADER ANIMATION ————— //

  document.fonts.ready.then(function () {
    const preloader = document.querySelector('.preloader_component') || '';

    if (preloader) {
      let preloaderAnimation = gsap.timeline();
      CustomEase.create('preloaderEase', '.5, 0, .25, 1');

      preloaderAnimation
        .set('.preloader_component .grid-item', {
          backdropFilter: 'blur(1.75rem)',
        })
        .to(
          '.preloader_component .grid-item',
          {
            backgroundColor: 'rgba(236, 245, 255, 0.04)',
            duration: 0.4,
            ease: 'power3.out',
            stagger: { from: 'random', amount: 1 },
          },
          '1.0'
        )
        .to(
          '.preloader_component .grid-item',
          {
            backdropFilter: 'blur(0rem)',
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power3.out',
            stagger: { from: 'random', amount: 1 },
          },
          '<0.5'
        )
        .set(preloader, {
          autoAlpha: 0,
        });

      document.querySelectorAll('a').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          if (
            this.hostname === window.location.host &&
            this.getAttribute('href').indexOf('#') === -1 &&
            this.getAttribute('target') !== '_blank'
          ) {
            e.preventDefault();
            const destination = this.getAttribute('href');

            // gsap.set(preloader, { display: 'block' });
            // gsap.to(content, {
            //   opacity: 1,
            //   duration: 0.35,
            //   ease: 'none',
            //   onComplete: () => {
            //     window.location = destination;
            //   },
            // });
          }
        });
      });
    }

    // On click of the back button
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  });
  // ————— PRELOADER ANIMATION ————— //

  // ————— MAGNETIC ICON CURSOR ————— //
  // Magnetic icons hover effect
  const growthCases = document.querySelectorAll('.growth_case-horizontal, .growth_case-vertical');

  growthCases.forEach((container) => {
    const icon = container.querySelector('.icon-1x1-medium');
    let iconInitialX;
    let iconInitialY;

    if (!icon) return;

    // Initial GSAP set
    gsap.set(icon, {
      scale: 1,
    });

    container.addEventListener('mouseenter', () => {
      // Store icon's initial position relative to its container
      const iconRect = icon.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      iconInitialX = iconRect.left - containerRect.left;
      iconInitialY = iconRect.top - containerRect.top;

      // Scale up on hover
      gsap.to(icon, {
        scale: 2.5, // Increased scale
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    container.addEventListener('mousemove', (e) => {
      const containerRect = container.getBoundingClientRect();

      // Get mouse position relative to container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      // Calculate distance from mouse to icon's initial position
      const distanceX = mouseX - iconInitialX;
      const distanceY = mouseY - iconInitialY;

      // Magnetic effect
      const magneticPull = 0.2;
      const moveX = distanceX * magneticPull;
      const moveY = distanceY * magneticPull;

      // Only limit bottom and right movement
      const maxMoveBottom = 50;
      const maxMoveRight = 50;
      const limitedX = Math.min(moveX, maxMoveRight); // only limit right
      const limitedY = Math.min(moveY, maxMoveBottom); // only limit bottom

      gsap.to(icon, {
        x: limitedX,
        y: limitedY,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    container.addEventListener('mouseleave', () => {
      // Return to original position
      gsap.to(icon, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
  // ————— MAGNETIC ICON CURSOR ————— //

  // ————— BUTTONS HOVER ANIMATION ————— //
  const buttons = document.querySelectorAll('.button');
  // Easily adjustable corner animation value
  const cornerAnimationValue = 0.125; // in rem

  buttons.forEach((btnHover) => {
    const btnText = btnHover.querySelector('.button-text');
    const btnCorners = btnHover.querySelector('.button-corners-wrap');
    // Get the original background color
    const originalBgColor = getComputedStyle(btnCorners).backgroundColor;
    // Convert pixels to rem and add extra space
    const btnWidth =
      btnHover.offsetWidth / parseFloat(getComputedStyle(document.documentElement).fontSize) +
      0.125;
    // Set initial width in rem
    gsap.set(btnHover, {
      width: btnWidth + 'rem',
    });

    btnHover.addEventListener('mouseenter', () => {
      // Get fresh text content on each hover
      const currentText = btnText.textContent;

      gsap.to(btnText, {
        duration: 0.5,
        scrambleText: {
          text: currentText,
          chars: 'lowerCase',
          speed: 0.8,
        },
        ease: 'none',
      });

      // Animate corners position and background
      gsap.to(btnCorners, {
        top: cornerAnimationValue + 'rem',
        bottom: cornerAnimationValue + 'rem',
        left: cornerAnimationValue + 'rem',
        right: cornerAnimationValue + 'rem',
        backgroundColor: 'transparent',
        duration: 0.2,
        ease: 'power2.out',
      });
    });

    btnHover.addEventListener('mouseleave', () => {
      // Return corners to original state
      gsap.to(btnCorners, {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: originalBgColor,
        duration: 0.2,
        ease: 'power2.out',
      });
    });
  });
  // ————— BUTTONS HOVER ANIMATION ————— //

  // ————— MENU ANIMATION ————— //
  const menuButton = document.querySelector('.button.is-nav');
  const menuText = menuButton.querySelector('.button-text');
  const navMenu = document.querySelector('.nav_menu');

  menuButton.addEventListener('click', () => {
    const isMenuVisible = getComputedStyle(navMenu).display === 'flex';

    if (!isMenuVisible) {
      // Opening animation
      // First set display to flex
      navMenu.style.display = 'flex';

      // Set button width to auto
      gsap.set(menuButton, {
        width: 'auto',
      });

      // Animate button text to "Close"
      gsap.to(menuText, {
        duration: 0.5,
        scrambleText: {
          text: 'Close',
          chars: 'lowerCase',
          speed: 0.8,
        },
        ease: 'none',
      });

      // Add your menu opening animation here
      gsap.fromTo(
        navMenu,
        { scale: 0, transformOrigin: 'top right' },
        {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1,1)',
        }
      );
    } else {
      // Closing animation
      // Animate button text back to "Menu"
      gsap.to(menuText, {
        duration: 0.5,
        scrambleText: {
          text: 'Menu',
          chars: 'lowerCase',
          speed: 0.8,
        },
        ease: 'none',
      });

      // Fade out menu
      gsap.to(navMenu, {
        scale: 0,
        transformOrigin: 'top right',
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          // Set display none after animation completes
          navMenu.style.display = 'none';
          // Reset opacity for next opening
          navMenu.style.opacity = 1;
        },
      });
    }
  });
  // ————— MENU ANIMATION ————— //
});

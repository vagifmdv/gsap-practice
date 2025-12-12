import Lenis from 'lenis';
import Pixelate from 'pixelate';
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
  // console.log('hello');

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

    // Create a timeline for synchronized animations
    const tl = gsap.timeline();

    // Animate accent text
    if (accentEl) {
      tl.to(accentEl, {
        duration: 0.6,
        scrambleText: {
          text: data.accent,
          chars: 'lowerCase',
          speed: 0.3,
          revealDelay: 0,
        },
        ease: 'none',
      });
    }

    // Animate numeration
    if (numerationEl) {
      tl.to(
        numerationEl,
        {
          duration: 0.5,
          scrambleText: {
            text: data.numeration,
            chars: 'numbers',
            speed: 0.3,
            revealDelay: 0,
          },
          ease: 'none',
        },
        '<'
      );
    }

    // Animate metrics with slight delay
    tl.add(() => {
      data.metrics.forEach((metric, index) => {
        if (valueEls[index]) {
          gsap.to(valueEls[index], {
            duration: 0.5,
            scrambleText: {
              text: metric.value,
              chars: 'numbers',
              speed: 0.3,
              revealDelay: 0,
            },
            ease: 'none',
          });
        }
        if (textEls[index]) {
          gsap.to(textEls[index], {
            duration: 0.7,
            scrambleText: {
              text: metric.text,
              chars: 'lowerCase',
              speed: 0.3,
              revealDelay: 0,
            },
            ease: 'none',
          });
        }
      });
    }, '<0.2');

    // When timeline completes
    tl.then(() => {
      currentSlide = slideIndex;
      isAnimating = false;
    });
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
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slideData.length;
      animateToSlide(nextSlide);
    }, 4000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function pauseAutoPlayWithResume() {
    stopAutoPlay();
    if (resumeAutoPlayTimeout) {
      clearTimeout(resumeAutoPlayTimeout);
    }
    resumeAutoPlayTimeout = setTimeout(() => {
      startAutoPlay();
    }, 5000);
  }

  // Add click listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      pauseAutoPlayWithResume();
      animateToSlide(index);
    });
  });

  // Initialize - set first button as active and start autoplay
  if (dots[0]) {
    dots[0].classList.add('is-active');
  }

  // Start auto-play after page load (in ms)
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

  // ————— Horizontal Sections ————— //

  const slideElements = document.querySelectorAll('.services_horizontal-sticky');
  const totalSlides = slideElements.length;

  function getScrollAmount() {
    // Get the width of one slide
    const slideWidth = slideElements[0].offsetWidth;

    // Convert rem to pixels
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gapBetween = remToPx * 8; // 8rem gap between slides
    const endPadding = remToPx * 4; // 4rem after last slide

    // Total width = (slide width × number of slides) + (gaps between slides) + end padding
    const totalWidth = slideWidth * totalSlides + gapBetween * (totalSlides - 1) + endPadding;

    // Return how much to move left
    return -(totalWidth - window.innerWidth);
  }

  // Main horizontal scroll animation
  const horizontalScroll = gsap.to('.services_horizontal-wrapper', {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: '.services_horizontal-wrapper',
      start: 'top top',
      end: () => `+=${totalSlides * 400}vh`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
  });

  // Freeze background grid - using fromTo for proper animation
  gsap.fromTo(
    '.bg-grid-wrap',
    { y: 0 },
    {
      y: () => {
        const trigger =
          ScrollTrigger.getById(horizontalScroll.scrollTrigger.vars.id) ||
          horizontalScroll.scrollTrigger;
        return trigger.end - trigger.start;
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.services_horizontal-wrapper',
        start: 'top top',
        end: () => `+=${totalSlides * 400}vh`,
        scrub: 0,
        invalidateOnRefresh: true,
      },
    }
  );

  // ————— Horizontal Sections ————— //

  // ————— MAGNETIC ICON CURSOR ————— //
  const growthCases = document.querySelectorAll('.growth_case-horizontal, .growth_case-vertical');
  growthCases.forEach((container) => {
    const icon = container.querySelector('.icon-1x1-medium');
    let iconInitialX;
    let iconInitialY;
    if (!icon) return;

    // Get the arrow elements within THIS specific container
    const arrowRight = container.querySelector('.arrow-right');
    const arrowLeft = container.querySelector('.arrow-left');
    if (!arrowRight || !arrowLeft) return;

    // Initial GSAP set
    gsap.set(icon, {
      scale: 1,
    });

    // Icon morphing - scoped to this container's arrows
    const morphTl = gsap.timeline({ paused: true });
    morphTl.to(arrowRight, {
      duration: 0.2,
      morphSVG: arrowLeft,
      ease: 'power2.Out',
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
      morphTl.play();
    });

    container.addEventListener('mousemove', (e) => {
      const containerRect = container.getBoundingClientRect();
      // Get mouse position relative to container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      // Calculate distance from mouse to icon's initial position
      const distanceX = mouseX - iconInitialX;
      const distanceY = mouseY - iconInitialY;
      // Magnetic effect with reduced pull and limits
      const magneticPull = 0.15; // Reduced from 0.2
      const moveX = distanceX * magneticPull;
      const moveY = distanceY * magneticPull;
      // Reduced maximum movement
      const maxMoveBottom = 35; // Reduced from 50
      const maxMoveRight = 35; // Reduced from 50
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
      morphTl.reverse();
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

  // ————— COMBINED MENU & INDICATOR ANIMATION ————— //
  const menuButton = document.querySelector('.button.is-nav');
  const menuText = menuButton.querySelector('.button-text');
  const navMenu = document.querySelector('.nav_menu');
  const navIndicator = document.querySelector('.nav_indicator');
  const navLinks = document.querySelectorAll('.nav_link');

  // Convert px to rem function
  function pxToRem(px) {
    return px / parseFloat(getComputedStyle(document.documentElement).fontSize) + 'rem';
  }

  // Position mapping for indicator (already in rem)
  const positions = ['0rem', '2.75rem', '5.5rem', '8.25rem'];

  // Initially hide the indicator
  gsap.set(navIndicator, {
    autoAlpha: 0,
  });

  // Indicator hover interactions (only set up once)
  function setupIndicatorInteractions() {
    const currentLink = document.querySelector('.nav_link.w--current');
    const currentIndex = currentLink ? Array.from(navLinks).indexOf(currentLink) : 0;
    const currentLinkWidth = currentLink?.offsetWidth || navLinks[0]?.offsetWidth || 100;
    const currentPosition = positions[currentIndex];

    // Track last hovered link to prevent jumping
    let lastHoveredLink = null;

    navLinks.forEach((link, index) => {
      // Remove any existing listeners to avoid duplicates
      link.removeEventListener('mouseenter', link._indicatorEnter);
      link.removeEventListener('mouseleave', link._indicatorLeave);

      // Create new listeners
      link._indicatorEnter = () => {
        const linkWidth = link.offsetWidth;
        const targetPosition = positions[index];
        lastHoveredLink = link;

        gsap.to(navIndicator, {
          top: targetPosition,
          width: pxToRem(linkWidth),
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      link._indicatorLeave = () => {
        // Small delay to check if another link was hovered
        setTimeout(() => {
          // Only animate back if no other link is currently hovered
          if (lastHoveredLink === link) {
            gsap.to(navIndicator, {
              top: currentPosition,
              width: pxToRem(currentLinkWidth),
              duration: 0.3,
              ease: 'power2.out',
            });
            lastHoveredLink = null;
          }
        }, 50);
      };

      // Add listeners
      link.addEventListener('mouseenter', link._indicatorEnter);
      link.addEventListener('mouseleave', link._indicatorLeave);
    });

    return {
      currentPosition,
      currentLinkWidth: pxToRem(currentLinkWidth),
    };
  }

  menuButton.addEventListener('click', () => {
    const isMenuVisible = getComputedStyle(navMenu).display === 'flex';

    if (!isMenuVisible) {
      // Opening animation
      navMenu.style.display = 'flex';
      gsap.set(menuButton, {
        width: 'auto',
      });

      gsap.to(menuText, {
        duration: 0.5,
        scrambleText: {
          text: 'Close',
          chars: 'lowerCase',
          speed: 0.8,
        },
        ease: 'none',
      });

      // Combined menu and indicator animation
      const menuOpen = gsap.timeline();
      menuOpen
        .fromTo(
          navMenu,
          { scale: 0, transformOrigin: 'top right' },
          {
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1,1)',
          }
        )
        .fromTo(
          '.nav_link',
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.1,
            stagger: 0.05,
            ease: 'power2.out',
            onComplete: () => {
              // Setup indicator after links are fully visible
              const { currentPosition, currentLinkWidth } = setupIndicatorInteractions();
              // Set indicator position and size
              gsap.set(navIndicator, {
                top: currentPosition,
                width: currentLinkWidth,
              });
              // Show indicator with smooth fade
              gsap.to(navIndicator, {
                autoAlpha: 1,
                duration: 0.1,
                ease: 'power2.out',
              });
            },
          },
          '<0.15'
        );
    } else {
      // Closing animation
      gsap.to(menuText, {
        duration: 0.5,
        scrambleText: {
          text: 'Menu',
          chars: 'lowerCase',
          speed: 0.8,
        },
        ease: 'none',
      });

      const menuClose = gsap.timeline();
      menuClose
        // Hide indicator first
        .to(navIndicator, {
          autoAlpha: 0,
          duration: 0.1,
          ease: 'power2.out',
        })
        .to(
          navMenu,
          {
            scale: 0,
            transformOrigin: 'top right',
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              navMenu.style.display = 'none';
              navMenu.style.opacity = 1;
            },
          },
          '<0.05'
        )
        .to(
          '.nav_link',
          {
            autoAlpha: 0,
            duration: 0.05,
            stagger: { each: 0.025, from: 'end' },
            ease: 'power2.out',
          },
          '<'
        );
    }
  });
  // ————— COMBINED MENU & INDICATOR ANIMATION ————— //

  // ————— PIXELATE JS - CASE STUDIES HOVER ————— //
  /*
  $('.growth_case-horizontal, .growth_case-vertical').each(function (index) {
    let image = $(this).find('.image-absolute')[0];
    let pixelate = new Pixelate(image, { amount: 0 });

    let pixel = { value: 0.9 };

    let tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        pixelate.setAmount(pixel.value).render();
      },
      defaults: {
        delay: 0.15,
      },
      ease: 'power2.in',
    });
    tl.set(pixel, { value: 0.97, delay: 0 });
    tl.set(pixel, { value: 0.9 });
    tl.set(pixel, { value: 0.86 });
    tl.set(pixel, { value: 0 });

    $(this).on('mouseenter', function () {
      tl.restart();
    });
    $(this).on('mouseleave', function () {
      tl.progress(1);
    });

    window.addEventListener('resize', function () {
      pixelate.setWidth(image.parentNode.clientWidth).render();
    });
  });
  */
  // ————— PIXELATE JS - CASE STUDIES HOVER ————— //

  // ————— LOGOS SWITCH ANIMATION ————— //

  const squares = document.querySelectorAll('.logos_item');

  function animateThreeSquares() {
    // Get 3 random squares (without duplicates)
    const shuffled = Array.from(squares).sort(() => 0.5 - Math.random());
    const selectedSquares = shuffled.slice(0, 3);

    // Create timeline for all 3 squares
    const masterTl = gsap.timeline();

    selectedSquares.forEach((square, index) => {
      const cells = square.querySelectorAll('.logos_item-cell');
      const logos = square.querySelectorAll('.logos_image');

      // Create timeline for this square
      const squareTl = gsap.timeline();

      // 1. Show cells with stagger
      squareTl
        .to(cells, {
          autoAlpha: 1,
          duration: 0,
          stagger: {
            amount: 0.4,
            from: 'random',
          },
        })

        // 2. Switch logos
        .call(() => {
          logos.forEach((logo) => {
            logo.classList.toggle('hide');
          });
        })

        // 3. Hide cells with stagger
        .to(cells, {
          autoAlpha: 0,
          duration: 0,
          stagger: {
            amount: 0.4,
            from: 'random',
          },
        });

      // Add this square's timeline to master timeline with slight delay
      masterTl.add(squareTl, index * 0.1);
    });

    // After all animations complete, wait and repeat
    masterTl.call(() => {
      setTimeout(animateThreeSquares, 1500);
    });
  }

  // Start the animation
  setTimeout(animateThreeSquares, 2500);
  // ————— LOGOS SWITCH ANIMATION ————— //

  // ————— CASE STUDIES ————— //
  const caseTriggers = document.querySelectorAll('.growth_case-vertical, .growth_case-horizontal');

  caseTriggers.forEach((caseTrigger) => {
    const cells = caseTrigger.querySelectorAll('.growth_cell');

    const accent = caseTrigger.querySelector('.font-family-accent');

    gsap.set(cells, {
      autoAlpha: 1,
    });

    gsap.to(cells, {
      duration: 0,
      autoAlpha: 0,
      delay: 0.8,
      stagger: {
        amount: 0.4,
        from: 'random',
      },
      scrollTrigger: {
        trigger: caseTrigger,
        start: 'top 100%',
      },
    });

    gsap.to(accent, {
      duration: 0.8,
      delay: 0.5,
      scrambleText: {
        text: '{original}',
        chars: 'lowerCase',
        speed: 0.8,
      },
      ease: 'none',
      scrollTrigger: {
        trigger: accent,
        start: 'top 100%',
        // markers: true,
      },
    });
  });
  // ————— CASE STUDIES ————— //

  // ————— NUMBERS COUNTER ————— //

  // Setup
  gsap.registerEffect({
    name: 'counter',
    extendTimeline: true,
    defaults: {
      end: 0,
      duration: 0.5,
      ease: 'power1',
      increment: 1,
    },
    effect: (targets, config) => {
      let tl = gsap.timeline();
      let num = targets[0].innerText.replace(/\,/g, '');
      targets[0].innerText = num;

      tl.from(
        targets,
        {
          duration: config.duration,
          innerText: config.end,
          //snap:{innerText:config.increment},
          modifiers: {
            innerText: function (innerText) {
              return gsap.utils
                .snap(config.increment, innerText)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
          },
          ease: config.ease,
        },
        0
      );

      return tl;
    },
  });

  // Animation
  let counterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#count-up',
      start: 'top 80%',
    },
  });

  counterTl.counter('#count-up', {
    ease: 'power2.out',
    duration: 1.5,
  });
  // ————— NUMBERS COUNTER ————— //

  // ————— RANDOM LINE ANIMATIONS ————— //

  // Configuration
  const animationConfig = {
    speed: { min: 0.3, max: 0.4 }, // Animation duration in seconds
    rarity: { min: 36, max: 48 }, // Delay between animations in seconds
    initialDelay: { min: 1, max: 48 }, // Initial start delay in seconds
  };

  // Horizontal lines
  const horizontalLines = gsap.utils.toArray('.grid-item-line.is-horizontal');

  horizontalLines.forEach((line, index) => {
    gsap.set(line, { position: 'relative', overflow: 'hidden' });

    const glowDiv = document.createElement('div');
    glowDiv.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(144, 255, 0, 0.75) 50%, 
      transparent 100%);
    pointer-events: none;
  `;
    line.appendChild(glowDiv);

    function animateLine() {
      const goRight = Math.random() > 0.5;

      gsap.fromTo(
        glowDiv,
        {
          left: goRight ? '-100%' : '100%',
        },
        {
          left: goRight ? '100%' : '-100%',
          duration: gsap.utils.random(animationConfig.speed.min, animationConfig.speed.max),
          ease: 'none',
          onComplete: () => {
            gsap.delayedCall(
              gsap.utils.random(animationConfig.rarity.min, animationConfig.rarity.max),
              animateLine
            );
          },
        }
      );
    }

    gsap.delayedCall(
      gsap.utils.random(animationConfig.initialDelay.min, animationConfig.initialDelay.max),
      animateLine
    );
  });

  // Vertical lines
  const verticalLines = gsap.utils.toArray('.grid-item-line.is-vertical');

  verticalLines.forEach((line, index) => {
    gsap.set(line, { position: 'relative', overflow: 'hidden' });

    const glowDiv = document.createElement('div');
    glowDiv.style.cssText = `
    position: absolute;
    left: 0;
    top: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, 
      transparent 0%, 
      rgba(144, 255, 0, 0.75) 50%, 
      transparent 100%);
    pointer-events: none;
  `;
    line.appendChild(glowDiv);

    function animateLine() {
      const goDown = Math.random() > 0.5;

      gsap.fromTo(
        glowDiv,
        {
          top: goDown ? '-100%' : '100%',
        },
        {
          top: goDown ? '100%' : '-100%',
          duration: gsap.utils.random(animationConfig.speed.min, animationConfig.speed.max),
          ease: 'none',
          onComplete: () => {
            gsap.delayedCall(
              gsap.utils.random(animationConfig.rarity.min, animationConfig.rarity.max),
              animateLine
            );
          },
        }
      );
    }

    gsap.delayedCall(
      gsap.utils.random(animationConfig.initialDelay.min, animationConfig.initialDelay.max),
      animateLine
    );
  });

  // ————— RANDOM LINE ANIMATIONS ————— //
});

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(Observer, SplitText, ScrollTrigger);

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

  // ————— Scroll Reveal Sections ————— //

  gsap.from('.section_full.is-2 .gsap-item', {
    opacity: 0,
    y: 100,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_full.is-2 .gsap-item',
      start: 'top 80%',
      //   markers: true,
    },
  });

  gsap.from('.section_full.is-3 .gsap-item', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_full.is-3 .gsap-item',
      start: 'center center',
      //   markers: true,
    },
  });

  gsap.from('.section_full.is-4 .gsap-item', {
    opacity: 0,
    x: -100,
    autoAlpha: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_full.is-4 .gsap-item',
      start: 'top 70%',
      //   markers: true,
    },
  });

  // ————— Scroll Reveal Sections ————— //

  // ————— Parallax Effects ————— //

  gsap.set('.section_full.is-5 .gsap-item', { scale: 1.3, yPercent: 40 });
  gsap.from('.section_full.is-5 .gsap-item', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section_full.is-5 .wrap',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.fromTo(
    '.section_full.is-6 .gsap-item',
    {
      yPercent: 150,
      xPercent: -150,
    },
    {
      yPercent: -150,
      xPercent: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section_full.is-6',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  );

  // ————— Parallax Effects ————— //

  // ————— Progress Bar ————— //

  gsap.fromTo(
    '.progress-bar-toggle',
    {
      width: '0%',
    },
    {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    }
  );

  // ————— Progress Bar ————— //

  // ————— Horizontal Sections ————— //

  const slides = document.querySelector('.horizontal-wrapper');
  const totalSlides = document.querySelectorAll('.horizontal-sticky').length;

  function getScrollAmount() {
    let slidesWidth = slides.scrollWidth;
    return -(slidesWidth - window.innerWidth);
  }

  gsap.to('.horizontal-wrapper', {
    x: getScrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-wrapper',
      start: 'top top',
      end: () => `+=${totalSlides * 400}vh`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      //   markers: true,
    },
  });

  // ————— Horizontal Sections ————— //
});

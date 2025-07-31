import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(Observer, SplitText, ScrollTrigger, CustomEase, DrawSVGPlugin, MorphSVGPlugin);

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

  // ————— LOGO ————— //

  // SVG Animation
  const logoTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.3,
  });

  gsap.set('.svg-logo-hero line', { drawSVG: '0%' });

  logoTl
    .to('.svg-logo-hero .white-line', {
      drawSVG: '100%',
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.Out',
    })
    .to(
      '.svg-logo-hero .blue-line, .svg-logo-hero .green-line',
      {
        drawSVG: '100%',
        duration: 0.6,
        ease: 'power2.Out',
      },
      '<0.2'
    )
    .to(
      '.svg-logo-hero svg',
      {
        rotation: 360,
        duration: 2,
        ease: 'power2.Out',
        transformOrigin: 'center center',
      },
      '>-0.3'
    )
    .to(
      '.svg-logo-hero .blue-line, .svg-logo-hero .green-line',
      {
        drawSVG: '0%',
        duration: 0.5,
        ease: 'power2.Out',
      },
      '>0.5'
    )
    .to(
      '.svg-logo-hero .white-line',
      {
        drawSVG: '0%',
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.In',
      },
      '<0.2'
    );
  // ————— LOGO ————— //

  // ————— 6 ICONS ————— //

  gsap.set('.icons-wrap polyline, .icons-wrap line, .icons-wrap path, .icons-wrap circle', {
    drawSVG: '100% 100%',
    autoAlpha: 0,
  });

  const gridTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.3,
    yoyo: true,
  });

  gridTl
    .to('.is-1 polyline', {
      drawSVG: '0% 100%',
      duration: 1.3,
      ease: 'power2.Out',
    })
    .to(
      '.is-1 polyline',
      {
        autoAlpha: 1,
        duration: 0.1,
        ease: 'power2.Out',
      },
      '<'
    )
    .to(
      '.is-2 line',
      {
        drawSVG: '0% 100%',
        duration: 1.3,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<0.2'
    )
    .to(
      '.is-2 line',
      {
        autoAlpha: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<'
    )
    .to(
      '.is-3 polyline',
      {
        drawSVG: '0% 100%',
        duration: 1.3,
        ease: 'power2.Out',
      },
      '<0.2'
    )
    .to(
      '.is-3 polyline',
      {
        autoAlpha: 1,
        duration: 0.1,
        ease: 'power2.Out',
      },
      '<'
    )
    .to(
      '.is-4 polyline, .is-4 path',
      {
        drawSVG: '0% 100%',
        duration: 1.3,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<0.2'
    )
    .to(
      '.is-4 polyline, .is-4 path',
      {
        autoAlpha: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<'
    )
    .to(
      '.is-5 path, .is-5 circle',
      {
        drawSVG: '0% 100%',
        duration: 1.3,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<0.2'
    )
    .to(
      '.is-5 path, .is-5 circle',
      {
        autoAlpha: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<'
    )
    .to(
      '.is-6 line',
      {
        drawSVG: '0% 100%',
        duration: 1.3,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<0.2'
    )
    .to(
      '.is-6 line',
      {
        autoAlpha: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: 'power2.Out',
      },
      '<'
    );

  // ————— 6 ICONS ————— //

  // ————— SIGNATURE ————— //
  const signTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1.5,
  });

  gsap.set(
    '.signature #hPipe, .signature #hBody, .signature #tCross, .signature #mainPath, .signature ellipse',
    {
      drawSVG: '0%',
    }
  );
  gsap.set('.signature ellipse', {
    autoAlpha: 0,
  });

  signTl
    .to('.signature #hPipe', {
      drawSVG: '100%',
      duration: 0.5,
      ease: 'power1.Out',
    })
    .to(
      '.signature #hBody',
      {
        drawSVG: '100%',
        duration: 0.7,
        ease: 'power1.Out',
      },
      '>0.15'
    )
    .to(
      '.signature #mainPath',
      {
        drawSVG: '100%',
        duration: 4.0,
        ease: 'none',
      },
      '>0.1'
    )
    .to(
      '.signature #tCross',
      {
        drawSVG: '100%',
        duration: 0.3,
        ease: 'power1.Out',
      },
      '>0.15'
    )
    .to(
      '.signature ellipse',
      {
        autoAlpha: 1,
        duration: 0.05,
        ease: 'power1.Out',
        stagger: 0.3,
      },
      '>0.2'
    );
  // ————— SIGNATURE ————— //

  // ————— HOVER ————— //
  const btn1 = document.querySelector('.svg-hover');
  const path = document.querySelector('.svg-hover #path');

  gsap.set(path, {
    drawSVG: '100% 100%',
  });

  btn1.addEventListener('mouseenter', () => {
    const hoverTl = gsap.timeline({});

    hoverTl
      .fromTo(
        path,
        { drawSVG: '100% 100%' },
        {
          drawSVG: '150% 50%',
          duration: 1.3,
          ease: 'power2.out',
        }
      )
      .set(path, {
        drawSVG: '0% 100%',
      });
  });

  btn1.addEventListener('mouseleave', () => {
    const hoverOutTl = gsap.timeline({});

    hoverOutTl
      .fromTo(
        path,
        { drawSVG: '0% 100%' },
        {
          drawSVG: '50% 50%',
          duration: 1.3,
          ease: 'power2.out',
        }
      )
      .set(path, {
        drawSVG: '100% 100%',
      });
  });
  // ————— HOVER ————— //

  // ————— CLICK ————— //
  let elements = document.querySelectorAll(
    '.svg-click path:not(#track):not(.flag), .svg-click #flag-group, .svg-click tspan'
  );

  gsap.set(elements, {
    autoAlpha: 0,
  });

  document.querySelector('#click').addEventListener('click', () => {
    gsap.to(elements, {
      autoAlpha: 1,
      duration: 0.3,
      stagger: { amount: 1.0, from: 'random' },
      ease: 'power2.Out',
    });
  });

  document.querySelector('#reset').addEventListener('click', () => {
    gsap.to(elements, {
      autoAlpha: 0,
      duration: 0.3,
      stagger: { amount: 0.3, from: 'random' },
      ease: 'power2.Out',
    });
  });
  // ————— CLICK ————— //

  // ————— MORPH ————— //
  gsap.set('#circle, #activity', { autoAlpha: 0 });

  const morphTl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1 });

  morphTl
    .fromTo(
      '#star',
      { fill: '#EC5F34' },
      {
        morphSVG: '#circle',
        fill: '#3ACB6A',
        duration: 1,
        ease: 'power2.out',
      }
    )
    .to('#play', { duration: 1, morphSVG: '#activity', ease: 'power2.Out' }, '<');
  // ————— MORPH ————— //
});

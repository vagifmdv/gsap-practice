import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(Observer, SplitText, ScrollTrigger, CustomEase);

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

  // ————— EASING EXAMPLES ————— //

  const btn1 = document.getElementById('btn1');

  btn1.addEventListener('mouseenter', () => {
    gsap.to(btn1, {
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  btn1.addEventListener('mouseleave', () => {
    gsap.to(btn1, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  const btn2 = document.getElementById('btn2');

  btn2.addEventListener('mouseenter', () => {
    gsap.to(btn2, {
      y: -10,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  });

  btn2.addEventListener('mouseleave', () => {
    gsap.to(btn2, {
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  });

  const btn3 = document.getElementById('btn3');

  btn3.addEventListener('mouseenter', () => {
    gsap.to(btn3, {
      y: -15,
      duration: 0.6,
      ease: 'bounce.out',
    });
  });

  btn3.addEventListener('mouseleave', () => {
    gsap.to(btn3, {
      y: 0,
      duration: 0.6,
      ease: 'bounce.out',
    });
  });

  const btn4 = document.getElementById('btn4');

  btn4.addEventListener('mouseenter', () => {
    gsap.to(btn4, {
      y: -15,
      duration: 0.8,
      ease: 'back.out',
    });
  });

  btn4.addEventListener('mouseleave', () => {
    gsap.to(btn4, {
      y: 0,
      duration: 0.8,
      ease: 'back.out',
    });
  });

  const btn5 = document.getElementById('btn5');

  btn5.addEventListener('mouseenter', () => {
    gsap.to(btn5, {
      y: -15,
      duration: 0.8,
      ease: 'elastic.out',
    });
  });

  btn5.addEventListener('mouseleave', () => {
    gsap.to(btn5, {
      y: 0,
      duration: 0.8,
      ease: 'elastic.out',
    });
  });

  const btn6 = document.getElementById('btn6');

  btn6.addEventListener('mouseenter', () => {
    gsap.to(btn6, {
      y: -15,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  btn6.addEventListener('mouseleave', () => {
    gsap.to(btn6, {
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  gsap.to('#spinner1', {
    rotation: 360,
    duration: 2,
    ease: 'none',
    repeat: -1,
  });

  gsap.to('#spinner2', {
    rotation: 360,
    duration: 2,
    ease: CustomEase.create('custom', 'M0,0 C0,0 0.405,0.101 0.507,0.512 0.604,0.909 1,0.988 1,1 '),
    repeat: -1,
  });

  // ————— EASING EXAMPLES ————— //

  // ————— SHOPPING CART BUTTON ————— //

  document.getElementById('btn-cart').addEventListener('click', function () {
    const cartNumber = document.querySelector('.cart_number');
    const currentValue = parseInt(cartNumber.textContent);
    cartNumber.textContent = currentValue + 1;

    const cartImage = document.querySelector('.cart_image');

    const cartAnimation = gsap.timeline();
    cartAnimation
      .to(cartImage, {
        y: -15,
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        cartImage,
        {
          rotation: -10,
          scaleY: 0.9,
          duration: 0.3,
          ease: 'power2.out',
        },
        '<'
      )
      .to(cartImage, {
        y: 0,
        duration: 1,
        ease: 'elastic.out(1.2,0.285)',
      })
      .to(
        cartImage,
        {
          rotation: 0,
          scaleY: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        '<'
      );
  });

  // ————— SHOPPING CART BUTTON ————— //

  // ————— FORM VALIDATION ————— //

  // Create combined timeline for form error
  const formErrorTimeline = gsap.timeline({ paused: true });
  formErrorTimeline
    .to('.form_component', {
      x: -10,
      rotation: -2,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to('.form_component', {
      x: 10,
      rotation: 2,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to('.form_component', {
      x: -8,
      rotation: -1,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to('.form_component', {
      x: 8,
      rotation: 1,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to('.form_component', {
      x: 0,
      rotation: 0,
      duration: 0.8,
      ease: 'elastic.out(1.2,0.3)',
    })
    .to(
      '.form_component',
      {
        borderColor: '#ff5a65',
        duration: 0.2,
        ease: 'power2.out',
      },
      0
    )
    .fromTo(
      '.form_error',
      {
        opacity: 0,
        y: -10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      0.2
    );

  document.getElementById('form-submit').addEventListener('click', function () {
    formErrorTimeline.restart();
  });

  document.getElementById('form-reset').addEventListener('click', function () {
    formErrorTimeline.pause().progress(0);
  });

  // ————— FORM VALIDATION ————— //
});

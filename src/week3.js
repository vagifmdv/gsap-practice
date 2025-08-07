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

  // Modals

  document.querySelectorAll('[fs-modal-element="open-1"]').forEach((button) => {
    button.addEventListener('click', () => {
      gsap.fromTo(
        '[data-popup="modal"]',
        {
          scale: 0.9,
          transformOrigin: 'bottom',
        },
        {
          scale: 1,
          transformOrigin: 'bottom',
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    });
  });

  document.querySelectorAll('[fs-modal-element="close-1"]').forEach((button) => {
    button.addEventListener('click', () => {
      gsap.fromTo(
        '[data-popup="modal"]',
        {
          scale: 1,
          transformOrigin: 'bottom',
        },
        {
          scale: 0.9,
          transformOrigin: 'bottom',
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    });
  });

  document.querySelectorAll('[fs-modal-element="open-2"]').forEach((button) => {
    button.addEventListener('click', () => {
      gsap.fromTo(
        '[data-popup="modal"]',
        {
          scale: 0.9,
        },
        {
          scale: 1,
          duration: 0.8,
          ease: 'back.out',
        }
      );
    });
  });

  document.querySelectorAll('[fs-modal-element="close-2"]').forEach((button) => {
    button.addEventListener('click', () => {
      gsap.fromTo(
        '[data-popup="modal"]',
        {
          scale: 1,
        },
        {
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out',
        }
      );
    });
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

  // Version 1 (Timing is off)

  // const formErrorTimeline = gsap.timeline({ paused: true });
  // formErrorTimeline
  //   .to('.form_component', {
  //     keyframes: [
  //       { x: -10, rotation: -2, duration: 0.1 },
  //       { x: 10, rotation: 2, duration: 0.1 },
  //       { x: -8, rotation: -1, duration: 0.1 },
  //       { x: 8, rotation: 1, duration: 0.1 },
  //       { x: 0, rotation: 0, duration: 0.8, ease: 'elastic.out(1.2,0.3)' },
  //     ],
  //     ease: 'power2.out',
  //   })
  //   .to(
  //     '.form_component',
  //     {
  //       borderColor: '#ff5a65',
  //       duration: 0.2,
  //       ease: 'power2.out',
  //     },
  //     0
  //   )
  //   .fromTo(
  //     '.form_error',
  //     {
  //       opacity: 0,
  //       y: -10,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.3,
  //       ease: 'power2.out',
  //     },
  //     0.2
  //   );

  // Version 2 (Not working)

  // const formErrorTimeline = gsap.timeline({ paused: true });
  // formErrorTimeline
  //   .set('.form_component', { transformOrigin: 'center' })
  //   .to('.form_component', {
  // x: '0, -10, 10, -8, 8, 0',
  // rotation: '0, -2, 2, -1, 1, 0',
  //     duration: 1.2,
  //     ease: 'power2.out, power2.out, power2.out, power2.out, elastic.out(1.2,0.3)',
  //     borderColor: '#ff5a65',
  //   })
  //   .fromTo(
  //     '.form_error',
  //     {
  //       opacity: 0,
  //       y: -10,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.3,
  //       ease: 'power2.out',
  //     },
  //     0.2
  //   );

  // Version 3 (Original)

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

  // ————— PRELOADER ANIMATION ————— //

  document.fonts.ready.then(function () {
    const preloader = document.querySelector('.preloader_component') || '';

    if (preloader) {
      let preloaderAnimation = gsap.timeline();
      CustomEase.create('preloaderEase', '.5, 0, .25, 1');
      const cover = preloader.querySelectorAll('.preloader_cover');
      const content = preloader.querySelector('.preloader_content');

      let split = SplitText.create('[split-type]', {
        type: 'words',
        mask: 'words',
        wordsClass: 'word++',
      });

      console.log(split.words);

      gsap.set(cover, { display: 'none' });
      preloaderAnimation
        .from('.preloader_bg-line', {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.5,
          ease: 'power3.out',
          stagger: { from: 'random', each: 0.2 },
        })
        .from(
          '[data-animate="text-intro"] .word',
          {
            yPercent: 100,
            rotateZ: 5,
            rotateX: -60,
            rotateY: 40,
            duration: 1,
            ease: 'preloaderEase',
            stagger: 0.1,
          },
          '<0.3'
        )
        // .add(() => {
        //   const preloaderTexts = document.querySelectorAll('.preloader_text');
        //   const totalItems = preloaderTexts.length;

        //   // Create custom ease
        //   const customEase = CustomEase.create(
        //     'custom',
        //     'M0,0 C0.152,0.454 0.323,0.621 0.484,0.702 0.96,0.941 0.911,0.847 1,1 '
        //   );

        //   preloaderTexts.forEach((text, index) => {
        //     if (index === 0) return; // Skip first one (already visible)

        //     // Calculate delay with custom ease
        //     const progress = index / (totalItems - 1);
        //     const easedProgress = customEase(progress);
        //     const delay = easedProgress * 3; // Total duration of X seconds

        //     gsap.delayedCall(delay, () => {
        //       // Hide all text elements first
        //       preloaderTexts.forEach((el) => gsap.set(el, { display: 'none' }));
        //       // Show current element
        //       gsap.set(text, { display: 'block' });
        //     });
        //   });
        // }, '<0.4')
        .add(() => {
          const texts = [
            'Week',
            'həftə',
            'неделя',
            'Woche',
            'semaine',
            'semana',
            'nedēļa',
            'апта',
            'viikko',
            'javë',
            'hafta',
            'vaiaso',
            'неделя',
            'vika',
            'həftə',
            'неделя',
            'Woche',
            'semaine',
            'semana',
            'nedēļa',
            'vika',
            'Week',
          ];

          const textElement = document.querySelector('.preloader_text');
          if (!textElement) return;

          const customEase = CustomEase.create(
            'custom',
            'M0,0 C0.152,0.454 0.323,0.621 0.484,0.702 0.96,0.941 0.911,0.847 1,1'
          );

          let currentIndex = 0;
          textElement.textContent = texts[0];

          gsap.to(
            {},
            {
              progress: 1,
              duration: 3,
              ease: 'none',
              onUpdate: function () {
                const progress = customEase(this.progress());
                const newIndex = Math.floor(progress * texts.length);

                if (newIndex !== currentIndex && newIndex < texts.length) {
                  currentIndex = newIndex;
                  textElement.textContent = texts[newIndex];
                }
              },
            }
          );
        }, '<0.4')
        .to(
          '[data-animate-2="text-outro"] .word',
          {
            autoAlpha: 0,

            duration: 0.8,
            ease: 'preloaderEase',
            stagger: 0.1,
          },
          4.75
        )
        .to(
          '.preloader_bg-item-color',
          {
            yPercent: -120,
            rotateZ: -2,
            rotateX: 0,
            rotateY: 10,
            duration: 1,
            ease: 'power1.in',
            stagger: { from: 'start', each: 0.1 },
          },
          '<-0.6'
        )
        .to(
          '.preloader_bg-line',
          {
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power3.out',
            stagger: { from: 'start', each: 0.1 },
          },
          '<'
        )
        .to(
          '.preloader_bg-item-color',
          {
            yPercent: -120,
            rotateZ: -2,
            rotateX: 0,
            rotateY: 10,
            duration: 1,
            ease: 'power2.in',
            stagger: { from: 'start', each: 0.1 },
          },
          '<'
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
});

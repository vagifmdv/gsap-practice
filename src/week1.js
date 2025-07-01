import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(Observer, SplitText);

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log(gsap.version);

  // 1. Hero Section Animations

  gsap.from('.hero-title', {
    duration: 1.5,
    x: -100,
    opacity: 0,
    ease: 'power2.out',
  });

  gsap.from('.subheading', {
    duration: 1.2,
    x: 100,
    opacity: 0,
    delay: 0.3,
    ease: 'power2.out',
  });

  gsap.fromTo(
    '.button-hero',
    {
      scale: 0.8,
      opacity: 0,
      backgroundColor: '#c1d9c2',
    },
    {
      duration: 0.8,
      scale: 1,
      opacity: 1,
      backgroundColor: '#e2eae3',
      delay: 0.6,
      ease: 'power2.out',
    }
  );

  gsap.to('.hero-image', {
    duration: 8,
    scale: 1.05,
    ease: 'none',
    transformOrigin: 'center center',
  });

  gsap.from('.hero-wrapper', {
    duration: 2,
    clipPath: 'inset(100% 0% 0% 0%)',
    ease: 'power2.out',
  });

  // 2. Timeline Multi-Step Animation

  let split = SplitText.create('.card-title', {
    type: 'chars', // only split into words and lines (not characters)
  });

  const cardTimeline = gsap.timeline();

  cardTimeline
    .from('.card-flex', {
      duration: 0.6,
      y: 100,
      opacity: 0,
      ease: 'power2.out',
    })
    .from(
      '.image-card',
      {
        duration: 0.4,
        scale: 0,
        ease: 'power2.out',
      },
      '<0.2'
    )
    .from(split.chars, {
      opacity: 0,
      stagger: { amount: 0.8 },
    })
    .from('.card-description', {
      duration: 0.5,
      opacity: 0,
      ease: 'power2.out',
    })
    .from('.button-card', {
      duration: 0.6,
      scale: 0,
      opacity: 0,
      ease: 'elastic.out(1,0.5)',
    });

  // 3. Staggered Navigation Animation

  gsap.from('.nav-link-2', {
    yPercent: -100,
    autoAlpha: 0,
    ease: 'power2.out',
    stagger: 0.1,
  });

  // 4. Interactive Controls

  document.querySelector('.is-play').addEventListener('click', function () {
    cardTimeline.play();
  });

  document.querySelector('.is-pause').addEventListener('click', function () {
    cardTimeline.pause();
  });

  document.querySelector('.is-reverse').addEventListener('click', function () {
    cardTimeline.reverse();
  });
});

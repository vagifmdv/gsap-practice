import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(Observer, SplitText, ScrollTrigger, CustomEase, TextPlugin, ScrambleTextPlugin);

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

  // ————— TYPEWRITER ANIMATION ————— //
  const twText = document.querySelector('#typewriter');
  const twContent = twText.textContent;
  const twCursor = document.querySelector('.cursor');

  gsap.set(twText, { text: '' });
  gsap.set('.cursor', { autoAlpha: 1 });

  const typewriterTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true,
  });

  typewriterTl.to(twText, {
    text: twContent,
    duration: 2,
    ease: 'none',
  });

  gsap.to(twCursor, {
    autoAlpha: 0,
    duration: 0,
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true,
    ease: 'power2.inOut',
  });
  // ————— TYPEWRITER ANIMATION ————— //

  // ————— WORD REVEAL ANIMATION ————— //
  let revealSplit = SplitText.create('#reveal', {
    type: 'words',
    mask: 'words',
  });

  gsap.set(revealSplit.words, {
    yPercent: 100,
    autoAlpha: 0,
  });

  const revealTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    yoyo: true,
  });

  revealTl.to(revealSplit.words, {
    yPercent: 0,
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.1,
  });
  // ————— WORD REVEAL ANIMATION ————— //

  // ————— SCRAMBLE ANIMATION ————— //
  const scrambleText = document.querySelector('#scramble');

  const scrambleTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
  });

  scrambleTl.to(scrambleText, {
    duration: 1.5,
    scrambleText: {
      text: '{original}',
      chars: 'upperCase',
    },
    ease: 'none',
  });
  // ————— SCRAMBLE ANIMATION ————— //

  // ————— LINE REVEAL ANIMATION ————— //
  let linesSplit = SplitText.create('#lines', {
    type: 'lines',
    mask: 'lines',
  });

  gsap.set(linesSplit.lines, {
    x: 50,
    autoAlpha: 0,
  });

  const linesTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1,
    yoyo: true,
  });

  linesTl.to(linesSplit.lines, {
    x: 0,
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.2,
  });
  // ————— LINE REVEAL ANIMATION ————— //

  // ————— HOVER ANIMATION ————— //
  const btnHover = document.getElementById('hover');
  const btnText = btnHover.querySelector('.button-text');
  const btnTextContent = btnText.textContent;
  const btnTextReplacement = 'Some Info';

  const btnWidth = btnHover.offsetWidth;
  gsap.set(btnHover, {
    width: btnWidth,
  });

  btnHover.addEventListener('mouseenter', () => {
    gsap.to(btnText, {
      duration: 0.5,
      scrambleText: {
        text: btnTextReplacement,
        chars: 'lowerCase',
        speed: 0.8,
      },
      ease: 'none',
    });
  });

  btnHover.addEventListener('mouseleave', () => {
    gsap.to(btnText, {
      duration: 0.5,
      scrambleText: {
        text: btnTextContent,
        chars: 'lowerCase',
        speed: 0.8,
      },
      ease: 'none',
    });
  });
  // ————— HOVER ANIMATION ————— //

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
    yoyo: true,
    repeat: -1,
    repeatDelay: 1,
  });

  counterTl.counter('#count-up', {
    ease: 'none',
    duration: 1.5,
  });
  // ————— NUMBERS COUNTER ————— //
});

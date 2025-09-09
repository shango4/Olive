// const { default: Shery } = require("sheryjs"); //comment out this line if appear automatically, always go for cdn

let tl = gsap.timeline();

//locomotive smooth/locomotive scrolltrigger doesn't works
function locosanime() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// locosanime();

function loadanime() {
  tl.from(".lines h1 ", {
    y: 110,
    stagger: 0.1,
    duration: 0.5,
    delay: 0.25,
  });

  tl.from("#line1p1", {
    opacity: 0,
    onStart: () => {
      //feature
      let h3 = document.querySelector("#line1p1 h3");
      let timer = 0;
      setInterval(() => {
        if (timer <= 100) {
          h3.innerHTML = timer++; //increment & induce till 100
        }
      }, 25);
    },
  });

  tl.to(".lines h2", {
    animationName: "nowanime", //another way to pass animation name
    opacity: 1, //in css must give 0
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 0.4,
    delay: 3, //match accordingly with timer
  });

  tl.from("#page1", {
    y: 1800, //page1 transition from bottom //900 = half screen
    opacity: 0, //from 0 - 1
    delay: 0.1,
    ease: Power4, //transition effect
  });

  tl.to("#loader", {
    display: "none", //permanently remove after page1 arrives
  });
}

loadanime();

function cursoranime() {
  document.addEventListener("mousemove", (param) => {
    //custom cursor movement feature
    gsap.to("#crsr", {
      left: param.x, //x axis
      top: param.y, //y axis
    });
  });

  Shery.makeMagnet("nav h1" /* Element to target.*/, {
    //Parameters are optional.
    //   ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    //   duration: 1,
  });
}

cursoranime();

function page1load() {
  tl.from(".mclass h1 , .mclass h2", {
    y: 110,
    stagger: 0.1,
    duration: 0.5,
  });
  tl.to(".mclass h1 , .mclass h2", {
    y: 0,
    stagger: 0.1,
    duration: 0.5,
  });

  tl.from("nav", {
    opacity: 0,
  });
}

page1load();

function sheryanime() {
  Shery.imageEffect(".imaged", {
    style: 5,
    deubg: true, //debug panel doesn't works
    gooey: true, //gooey panel doesn't works
  });
}

sheryanime();

document.addEventListener("mousemove", (param) => {
  gsap.to("#flag", {
    x: param.x - 230,
    y: param.y - 150,
  });
});
document.querySelector("#mclass").addEventListener("mouseenter", () => {
  gsap.to("#flag", {
    opacity: 1,
  });
});
document.querySelector("#mclass").addEventListener("mouseleave", function () {
  gsap.to("#flag", {
    opacity: 0,
  });
});

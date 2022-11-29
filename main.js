const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const squares = gsap.utils.toArray(".js-imgs");
const spanText = document.querySelectorAll(".span-text");
const viewMax = {};
const pad = 10;
const coords = {
  mouseX: 0,
  mouseY: 0,
};

const onResize = () => {
  viewMax.x = window.innerHeight - pad;
  viewMax.y = window.innerHeight - pad;
};
onResize();

const updateMousePosition = (e) => {
  coords.mouseX = e.clientX;
  coords.mouseY = e.clientY;
};

const tweenProperty = (target, prop) => {
  gsap.to(target, {
    duration: "random(9, 10)",
    [prop]: `random(${pad}, ${viewMax[prop]})`,
    ease: "sine.inOut",
    onComplete: tweenProperty,
    onCompleteParams: [target, prop],
  });
};

const setSquares = () => {
  squares.forEach((square) => {
    gsap.set(square, {
      x: `random(${pad}, ${viewMax.x})`,
      y: `random(${pad}, ${viewMax.y})`,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
    });
    gsap.to(square, {
      duration: 0.2,
      scale: 1,
    });
    tweenProperty(square, "x");
    tweenProperty(square, "y");
  });
};
setSquares();

const groupSquareInLine = () => {
  gsap.killTweensOf(squares);
  gsap.getTweensOf(squares).forEach((s) => s.kill());
  const tl = gsap.timeline();
  tl.to(squares, { duration: 0.3, borderRadius: "50%" });
  tl.to(squares, { duration: 0.2, scale: 2 });
  window.addEventListener("mousemove", squaresFollowCursor);
  squaresFollowCursor();
};

const squaresFollowCursor = () => {
  gsap.to(squares, { duration: 0.3, x: coords.mouseX, y: coords.mouseY });
};
const disperseSquares = () => {
  window.removeEventListener("mousemove", squaresFollowCursor);
  squares.forEach((square) => {
    gsap.to(square, {
      duration: 2,
      scale: 1,
      overwite: true,
      x: coords.mouseX,
      y: coords.mouseY,
      onComplete() {
        tweenProperty(square, "y");
      },
    });
  });
};
window.addEventListener("resize", onResize);
window.addEventListener("mousemove", updateMousePosition);
spanText.forEach((span) => {
  span.addEventListener("mouseenter", groupSquareInLine);
});
spanText.forEach((span) => {
  span.addEventListener("mouseleave", disperseSquares);
});
const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const span = document.querySelectorAll(".headline");

const tl = new TimelineMax();

tl.fromTo(
  hero,
  1.2,
  { width: "60%" },
  { width: "100%", ease: "slow(0.7, 0.7, false)" }
);
tl.fromTo(
  hero,
  1,
  { height: 0 },
  { height: "100%", ease: "slow(0.7, 0.7, false)" }
);
tl.fromTo(
  slider,
  1.2,
  { x: "-100%" },
  { x: "0%", ease: Power2.easeInOut },
  "-=2.2"
);

$(document).ready(function () {
  $(".headline span").lettering();
  tl.fromTo(
    ".headline span",

    { opacity: 0, x: 30 },
    {
      opacity: 1,
      x: 0,
      stagger: 0.14,
      ease: "slow(0.7, 0.7, false)",
      duration: 1,
    }
  );
});
let cursor = $(".cursor"),
  follower = $(".cursor-follower");
let posX = 0,
  posY = 0;

let mouseX = 0,
  mouseY = 0;

const tl2 = gsap.timeline();
tl2.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    tl2.set(follower, {
      css: {
        left: posX - 12,
        top: posY - 12,
      },
    });
    tl2.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});
$(document).mousemove(function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

var navLink = gsap.utils.toArray(".nav-link"),
  imgWraper = document.querySelector(".image-wraper"),
  imgItem = document.querySelector(".image-placeholder img");

const linkHover = (e) => {
  if (e.type === "mouseenter") {
    var imgSrc = e.target.dataset.src;
    var tl = gsap.timeline();
    tl.set(imgItem, {
      attr: { src: imgSrc },
    }).to(imgWraper, {
      autoAlpha: 1,
      scale: 1,
    });
  } else if (e.type === "mouseleave") {
    var tl = gsap.timeline();
    tl.to(imgWraper, {
      autoAlpha: 0,
      scale: 0.3,
    });
  }
};

const moveImg = (e) => {
  var mouseX = e.clientX,
    mouseY = e.clientY;
  var tl = gsap.timeline();
  tl.to(imgWraper, { duration: 1, x: mouseX, y: mouseY, ease: Expo.ease });
};

const initMoveImgAnimation = () => {
  navLink.forEach((link) => {
    link.addEventListener("mouseenter", linkHover);
    link.addEventListener("mouseleave", linkHover);
    link.addEventListener("mousemove", moveImg);
  });
};
const init = () => {
  initMoveImgAnimation();
};
window.addEventListener("load", () => {
  init();
});

let tlMain = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "-40%",
    end: "0%",
    scrub: 2,
  },
});
let tlAbout = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "80%",
    end: "90%",
    scrub: 2,
  },
});
tlMain.fromTo(
  ".ab-title",
  { opacity: 0, x: "100%" },
  { duration: 5, opacity: 1, x: "0" }
);

tlMain.fromTo(
  navLink,
  { opacity: 0, x: "-100%" },
  { duration: 5, opacity: 1, x: "0" }
);

tlMain.fromTo(
  ".text-ab",
  { opacity: 0, y: "100%" },
  { duration: 5, opacity: 1, y: "0", stagger: 0.2 }
);
tlAbout.fromTo(
  ".small-screener",
  { x: -100, opacity: 0 },
  { duration: 1, x: 0, opacity: 1, stagger: 0.4 }
);
$(document).ready(function () {
  $(".sec-two .text p span").lettering();

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "50%",
      end: "100%",
      scrub: 3,
    },
  });

  tl.from(".text p span span", {
    duration: 4,
    x: -20,
    opacity: 0,
    stagger: 5,
  })
    .from(".img-group img", {
      duration: 1,
      x: "70%",
      opacity: 0,
      stagger: 0.14,
    })
    .to(
      ".img-group img",
      {
        duration: 1,
        x: "70%",
        margin: "0 -140px 0",
        opacity: 1,
        rotate: 15,
        stagger: 0.14,
      },
      "-=1.4"
    );
  let mm = gsap.matchMedia();
  mm.add(
    "(min-width: 1370px)",
    () => {
      // this setup code only runs when viewport is at least 800px wide
      setTimeout(function () {
        $(".moments").mouseover(function () {
          gsap.to(".img-group img", {
            duration: 1,
            x: 100,
            margin: "0 10px 0",
            opacity: 1,
            rotate: 0,
            stagger: 0.14,
          });
        });
      });

      $(".moments").mouseout(function () {
        gsap.to(".img-group img", {
          duration: 1,
          x: "70%",
          margin: "0 -140px 0",
          opacity: 1,
          rotate: 15,
          stagger: 0.14,
        });
      });
    },
    5000
  );
});
let tlBlogSec1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".blog-section",
    start: "-40%",
    end: "80%",
    scrub: 2,
  },
});
tlBlogSec1.fromTo(
  ".img-animate img",
  1.2,
  { scale: 0 },
  { scale: 1, stagger: 0.5, duration: 1 }
);
let tlBlogSec2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".blog-section",
    start: "-50%",
    end: "70%",
    scrub: 2,
  },
});
tlBlogSec2.fromTo(
  ".blog-text",
  1.2,
  { scale: 0 },
  { scale: 1, stagger: 0.5, duration: 1 }
);
let tlBlogSecH2 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".blog-section h2",

      scrub: 2,
    },
  })
  .fromTo(".blog-section h2", 1.2, { scale: 0 }, { scale: 1, duration: 1 });

$(document).ready(function () {
  $(".date").text(new Date().getFullYear());
});

let tlBlogSec3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".blog-section",
    start: "50%",
    end: "80%",
    scrub: 2,
  },
});
tlBlogSec3.fromTo(
  ".footer-holder",
  { opacity: 0, scale: 0 },
  { duration: 2, opacity: 1, scale: 1, ease: "slow(0.7, 0.7, false)" }
);
gsap.from(".circle", {
  repeat: -1,
  duration: 1,
  opacity: 0,
  y: "random(-200,200)",
  stagger: 0.25,
});

$(document).ready(function () {
  setTimeout(() => {
    gsap.set(".preloader", { autoAlpha: 0 });
  }, 1500);
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".img",
      start: "-5%",
      scrub: true,
    },
  })
  .to(".img", {
    stagger: 0.2,
    y: -700,
    scrub: true,
  });

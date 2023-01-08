const d = document;
const w = globalThis ?? window;
const log = console;

const WAITASEC = 1000;
let ISSCROLLING = false;

const elementToWatch: object[] | any = {
  '[data-move="0"]': "move__down",
  '[data-move="1"]': "move__down",
  '[data-move="2"]': "move__left",
  '[data-move="3"]': "move__right",
  '[data-move="4"]': "move__up",
  '[data-move="5"]': "move__right",
  '[data-move="6"]': "move__left",
  '[data-move="7"]': "move__right",
  '[data-move="8"]': "move__right",
  '[data-move="9"]': "move__left",
  '[data-move="10"]': "move__left",
  '[data-move="11"]': "move__up",
  '[data-move="12"]': "move__down",
};

const userInteractions = (function () {
  on(".li:not(.ul li)", {
    pointerover(e: any) {
      e.preventDefault();
      const parent = e.composedPath()[0];

      const child = parent.childNodes;
      child[3]?.classList.add("visible");
      child[1]?.classList.add("over");
    },
    pointerleave(e: any) {
      e.preventDefault();
      const parent = e.composedPath()[0];
      const child = parent.childNodes;
      on(".ul.visible", {
        pointerleave(e: any) {
          e.preventDefault();
          e.composedPath()[0]?.classList.remove("visible");
          child[1]?.classList?.remove("over");
        },
      });
    },
  });

  on(".ft li", {
    pointerover(e: any) {
      let el = e.composedPath()[0];
      if (el && el instanceof HTMLLIElement) {
        el.classList.toggle("on");
      }
    },
  });

  w.onscroll = userIsScrolling;
  w.onresize = userIsResizing;
})();

function userIsScrolling(event: any): boolean {
  if (ISSCROLLING === false) {
    let frame = requestAnimationFrame(function () {
      watchForScroll(elementToWatch);
      ISSCROLLING = false;
    });
  }

  ISSCROLLING = true;
  return ISSCROLLING;
}

userIsResizing();
function userIsResizing(e?: EventTarget | any) {
  if (e) e.preventDefault();

  const imgElemennt = {
    menu: dq(".hd__menu img"),
    arrow: dqA(".li img"),
    nav: dq(".hd nav"),
  };

  const imgUrl = {
    menuClose: "/assets/images/icon-hamburger.svg",
    menuOpen: "/assets/images/icon-close.svg",
    arrowWt: "/assets/images/icon-arrow-light.svg",
    arrowCl: "/assets/images/icon-arrow-dark.svg",
  };

  if (w.innerWidth <= 767.98) {
    imgElemennt.nav.style = "display: none";

    on(".hd__menu img", {
      click(ev: any) {
        ev.preventDefault();
        if (imgElemennt.menu.src.match(/ham/g)) {
          imgElemennt.menu.src = imgUrl.menuOpen;
          imgElemennt.nav.style = "display:flex";
        } else {
          imgElemennt.menu.src = imgUrl.menuClose;
          imgElemennt.nav.style = "display: none";
        }
      },
    });

    imgElemennt.arrow.forEach(function (el: any) {
      el.src = imgUrl.arrowCl;
    });
  } else {
    // imgElemennt.menu.src = imgUrl.menuClose
  }
}

/**
 * watchForScroll - function watches an element when the user scrolls
 * pass through it or when it needs to toggle some classes
 * @param param = an object of element and classes
 */
function watchForScroll(param?: object[]): void {
  if (param) {
    for (let el in param) {
      let target = el;
      let token = param[el];
      const targetElement = dq(target);

      if (isPartial(target)) {
        targetElement.classList?.remove(token);
      } else {
        targetElement.classList.add(token);
      }
    }
  }

  function isPartial(visible: string) {
    let bound = getAxis(visible);
    let top = bound!.top;
    let bottom = bound!.bottom;
    let height = bound!.height;
    // return top >= 0 && bottom <= w.innerHeight;
    return top + height >= 0 && height + w.innerHeight >= bottom;
  }
}

function getAxis(param: string): DOMRect | undefined {
  const element = d.querySelector(param);
  const axis = element!.getBoundingClientRect();
  return axis;
}

/**
 * on - adds multiple events to an element
 * @param element = string
 * @param events = object
 */
function on(element: string, events: {} | any): void {
  if (typeof element === "string") {
    const e = d.querySelectorAll(element);
    for (let key in events) {
      e.forEach(function (el) {
        el.addEventListener(key, events[key]);
      });
    }
  } else log.warn("pls provide a css selector");
}

function dq(x: string): Element | any {
  return d.querySelector(x);
}
function dqA(x: string) {
  return d.querySelectorAll(x);
}

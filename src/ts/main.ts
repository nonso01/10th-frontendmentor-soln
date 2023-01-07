const d = document;
const w = window;
const log = console;

const WAITASEC = 1000;
const ISSCROLLING = false

const userInteractions = (function () {
  on(".li:not(.ul li)", {
    pointerover(e: any) {
      const parent = e.composedPath()[0];

      const child = parent.childNodes;
      child[3]?.classList.add("visible");
      child[1]?.classList.add("over");
    },
    pointerleave(e: any) {
      const parent = e.composedPath()[0];
      const child = parent.childNodes;
      on(".ul.visible", {
        pointerleave(e: any) {
          e.composedPath()[0]?.classList.remove("visible");
          child[1]?.classList.remove("over");
        },
      });
    },
  });

  window.onscroll = userIsScrolling
})();


function userIsScrolling(event: any): boolean {
  
/**
 * addScroll - function watches an element when the user scrolls
 * pass through it or when it needs to toggle some classes
 * @param param = string
 */
function addSroll(param: string): void {

}

function getAxis(param: string): DOMRect | undefined {
  const element = d.querySelector(param)
  const axis = element?.getBoundingClientRect()
  return axis
}

  return ISSCROLLING
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
  return d.querySelector(x)
}
function dqA(x: string) {
  return d.querySelectorAll(x)
}


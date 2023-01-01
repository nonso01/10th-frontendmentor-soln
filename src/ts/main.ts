const d = document;
const w = window;
const log = console;

const WAITASEC = 1000;

const userInteractions = (function () {
  on(".li:not(.ul li)", {
    pointerover(e: any) {
      const parent = e.composedPath()[0];

      const child = parent.childNodes;
      child[3]?.classList.add("visible");
      child[1]?.classList.add("over");
      // log.log(child[1]);
    },
    pointerleave(e: any) {
      const parent = e.composedPath()[0];
      const child = parent.childNodes;
      child[1]?.classList.remove("over");
      on(".ul.visible", {
        pointerleave(e: any) {
          e.composedPath()[0]?.classList.remove("visible");
        },
      });
    },
  });
})();

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

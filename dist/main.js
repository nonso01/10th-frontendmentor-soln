"use strict";
const d = document;
const w = globalThis !== null && globalThis !== void 0 ? globalThis : window;
const log = console;
const WAITASEC = 1000;
let ISSCROLLING = false;
const elementToWatch = {
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
        pointerover(e) {
            const parent = e.composedPath()[0];
            const child = parent.childNodes;
            child[3].classList.add("visible");
            child[1].classList.add("over");
        },
        pointerleave(e) {
            const parent = e.composedPath()[0];
            const child = parent.childNodes;
            on(".ul.visible", {
                pointerleave(e) {
                    var _a, _b;
                    (_a = e.composedPath()[0].classList) === null || _a === void 0 ? void 0 : _a.remove("visible");
                    (_b = child[1].classList) === null || _b === void 0 ? void 0 : _b.remove("over");
                },
            });
        },
    });
    w.onscroll = userIsScrolling;
    w.onmousemove = userMouseIsMoving;
})();
function userIsScrolling(event) {
    if (ISSCROLLING === false) {
        let frame = requestAnimationFrame(function () {
            watchForScroll(elementToWatch);
            ISSCROLLING = false;
        });
    }
    ISSCROLLING = true;
    return ISSCROLLING;
}
function userMouseIsMoving(e) {
    log.log(e === null || e === void 0 ? void 0 : e.toElement);
}
function watchForScroll(param) {
    var _a;
    if (param) {
        for (let el in param) {
            let target = el;
            let token = param[el];
            const targetElement = dq(target);
            if (isPartial(target)) {
                (_a = targetElement.classList) === null || _a === void 0 ? void 0 : _a.remove(token);
            }
            else {
                targetElement.classList.add(token);
            }
        }
    }
    function isPartial(visible) {
        let bound = getAxis(visible);
        let top = bound.top;
        let bottom = bound.bottom;
        let height = bound.height;
        return top + height >= 0 && height + w.innerHeight >= bottom;
    }
}
function getAxis(param) {
    const element = d.querySelector(param);
    const axis = element.getBoundingClientRect();
    return axis;
}
function on(element, events) {
    if (typeof element === "string") {
        const e = d.querySelectorAll(element);
        for (let key in events) {
            e.forEach(function (el) {
                el.addEventListener(key, events[key]);
            });
        }
    }
    else
        log.warn("pls provide a css selector");
}
function dq(x) {
    return d.querySelector(x);
}
function dqA(x) {
    return d.querySelectorAll(x);
}

"use strict";
const d = document;
const w = window;
const log = console;
const WAITASEC = 1000;
const ISSCROLLING = false;
const userInteractions = (function () {
    on(".li:not(.ul li)", {
        pointerover(e) {
            var _a, _b;
            const parent = e.composedPath()[0];
            const child = parent.childNodes;
            (_a = child[3]) === null || _a === void 0 ? void 0 : _a.classList.add("visible");
            (_b = child[1]) === null || _b === void 0 ? void 0 : _b.classList.add("over");
        },
        pointerleave(e) {
            const parent = e.composedPath()[0];
            const child = parent.childNodes;
            on(".ul.visible", {
                pointerleave(e) {
                    var _a, _b;
                    (_a = e.composedPath()[0]) === null || _a === void 0 ? void 0 : _a.classList.remove("visible");
                    (_b = child[1]) === null || _b === void 0 ? void 0 : _b.classList.remove("over");
                },
            });
        },
    });
    window.onscroll = userIsScrolling;
})();
function userIsScrolling(event) {
    function addSroll(param) {
    }
    function getAxis(param) {
        const element = d.querySelector(param);
        const axis = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
        return axis;
    }
    return ISSCROLLING;
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

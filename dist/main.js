"use strict";
const d = document;
const w = globalThis !== null && globalThis !== void 0 ? globalThis : window;
const log = console;
const WAITASEC = 1000;
let ISSCROLLING = false;
const elementToWatch = {
    '[data-move="0"]': "move__down",
    '[data-move="1"]': "move__down",
    '[data-move="2"]': "move__right",
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
    const attr = dq(".attr");
    on(".li:not(.ul li)", {
        click(e) {
            var _a, _b;
            e.preventDefault();
            const parent = e.composedPath()[0];
            const child = parent.childNodes;
            (_a = child[3]) === null || _a === void 0 ? void 0 : _a.classList.toggle("visible");
            (_b = child[1]) === null || _b === void 0 ? void 0 : _b.classList.toggle("over");
        },
    });
    on(".ft li", {
        pointerover(e) {
            let el = e.composedPath()[0];
            if (el && el instanceof HTMLLIElement) {
                el.classList.toggle("on");
            }
        },
    });
    on(".btn", {
        click(e) {
            var _a;
            e.preventDefault();
            (_a = attr.classList) === null || _a === void 0 ? void 0 : _a.remove("h");
        },
    });
    on(".attr img", {
        click(e) {
            attr.classList.add("h");
        },
    });
    w.onscroll = userIsScrolling;
    w.onresize = userIsResizing;
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
userIsResizing();
function userIsResizing(e) {
    if (e)
        e.preventDefault();
    const imgElement = {
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
        imgElement.nav.style = "display: none";
        on(".hd__menu img", {
            click(ev) {
                ev.preventDefault();
                if (imgElement.menu.src.match(/ham/g)) {
                    imgElement.menu.src = imgUrl.menuOpen;
                    imgElement.nav.style = "display:flex";
                }
                else {
                    imgElement.menu.src = imgUrl.menuClose;
                    imgElement.nav.style = "display: none";
                }
            },
        });
        imgElement.arrow.forEach(function (el) {
            el.src = imgUrl.arrowCl;
        });
    }
    else {
        imgElement.nav.style = "display: flex";
        imgElement.arrow.forEach(function (el) {
            el.src = imgUrl.arrowWt;
        });
    }
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

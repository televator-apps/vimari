/*
 * Code in this file is taken from sVim, it has been adjusted to
 * work with Vimari.
 * Assumes global variable: settings.
 */

let animationFrame = null;

function customScrollBy(x, y) {
    // If smooth scroll is off then use regular scroll
    if (settings == undefined || settings.smoothScroll === undefined || !settings.smoothScroll) {
        window.scrollBy(x, y);
        return;
    }
    window.cancelAnimationFrame(animationFrame);

    // Smooth scroll
    let i = 0;
    let delta = 0;

    // Ease function
    function easeOutExpo(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }

    // Animate the scroll
    function animLoop() {
        const toScroll = Math.round(easeOutExpo(i, 0, y, settings.scrollDuration) - delta);
        if (toScroll !== 0) {
            if (y) {
                window.scrollBy(0, toScroll);
            } else {
                window.scrollBy(toScroll, 0);
            }
        }

        if (i < this.settings.scrollDuration) {
            animationFrame = window.requestAnimationFrame(animLoop);
        }

        delta = easeOutExpo(i, 0, (x || y), settings.scrollDuration);
        i += 1;
    }

    // Start scroll
    animLoop();
}

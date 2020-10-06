/* eslint-env browser */

export const smoothScroll = (target, duration = 1000) => {
  const scrollTarget = document.querySelector(target);
  const scrollTargetPosition = scrollTarget.offsetTop;
  const scrollStartPosition = document.body.scrollTop;
  const scrollDistance = scrollTargetPosition - scrollStartPosition;
  let startTime = null;

  // source: http://gizma.com/easing/
  function ease(t, b, c, d) {
    /* eslint-disable */
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
    /* eslint-enable */
  }

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, scrollStartPosition, scrollDistance, duration);

    document.body.scroll(0, run);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animation);
    }
  }

  window.requestAnimationFrame(animation);
};

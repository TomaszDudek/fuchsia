/* eslint-env browser */
import { Component } from 'component-loader-js';

class Gear extends Component {
  constructor() {
    super(...arguments);

    const { body } = document;

    body.addEventListener('scroll', () => {
      this.rotateCogs();
    });
    this.scrollTop();
  }

  // eslint-disable-next-line class-methods-use-this
  getScrollInDeg() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    // eslint-disable-next-line no-mixed-operators
    return (b[st] / (b[sh] - h.clientHeight)) * 360;
  }

  scrollTop() {
    this.el.addEventListener('click', (e) => {
      e.preventDefault();

      let i = document.body.scrollTop;
      // todo: think about animating the scroll by request animation frame
      const int = setInterval(() => {
        document.body.scroll(0, i);
        i -= 30;
        if (i <= 0) {
          clearInterval(int);
        }
      }, 2);
    });
  }

  rotateCogs() {
    const smallCog = this.el.getElementsByClassName('gear__cog--small')[0];
    const mediumCog = this.el.getElementsByClassName('gear__cog--medium')[0];
    const largeCog = this.el.getElementsByClassName('gear__cog--large')[0];

    smallCog.style.transform = `rotate3d(0, 0, 1, ${this.getScrollInDeg() * 3}deg)`;
    mediumCog.style.transform = `rotate3d(0, 0, 1, ${-this.getScrollInDeg() * 2}deg)`;
    largeCog.style.transform = `rotate3d(0, 0, 1, ${this.getScrollInDeg()}deg)`;
  }

  destroy() {
    super.destroy();
  }
}

export default Gear;

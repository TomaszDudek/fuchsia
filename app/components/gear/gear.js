import { Component } from 'component-loader-js';
import throttle from 'lodash/throttle';
import { smoothScroll } from '../../scripts/utils/export-star';

class Gear extends Component {
  constructor() {
    super(...arguments);

    // document.body.addEventListener('scroll', throttle(() => {
    //   this.rotateCogs();
    // }, 15), { passive: true });
    this.subscribe('scrollSpy::scroll::event', () => {
      this.rotateCogs();
    });
    this.scrollTop();
  }

  getScrollInDeg = () => {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    return (b[st] / (b[sh] - h.clientHeight)) * 360;
  };

  scrollTop() {
    this.el.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('#body');
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

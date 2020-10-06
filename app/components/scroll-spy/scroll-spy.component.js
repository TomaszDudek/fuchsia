import { Component } from 'component-loader-js';

class ScrollSpy extends Component {
  constructor() {
    super(...arguments);

    this.el.addEventListener('scroll', (e) => {
      this.publish('scrollSpy::custom::event', e);
      // console.log('published e:', e);
    });
  }

  destroy() {
    super.destroy();
  }
}

export default ScrollSpy;

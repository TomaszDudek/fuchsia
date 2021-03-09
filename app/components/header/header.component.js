import { Component } from 'component-loader-js';

class Header extends Component {
  constructor() {
    super(...arguments);

    this.subscribe('scrollSpy::scroll::event', (event) => {
      this.toggle(event.target.scrollTop);
    });
  }

  toggle(scrollPosition) {
    if (scrollPosition >= 100) {
      this.el.classList.add('header--is-sticky');
    } else {
      this.el.classList.remove('header--is-sticky');
    }
  }

  destroy() {
    super.destroy();
  }
}

export default Header;

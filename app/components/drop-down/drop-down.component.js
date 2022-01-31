import { Component } from 'component-loader-js';

class Dropdown extends Component {
  constructor() {
    super(...arguments);

    this.init();
  }

  init() {
    console.log('init', this.el);
  }

  destroy() {
    super.destroy();
  }
}

export default Dropdown;

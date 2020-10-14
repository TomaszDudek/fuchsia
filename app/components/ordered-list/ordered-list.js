import { Component } from 'component-loader-js';

class OrderedList extends Component {
  constructor() {
    super(...arguments);
    this.countChild();
    this.el.addEventListener('click', (e) => {
      this.publish('orderedlist::custom::event', e);
    });
  }

  countChild() {
    console.log('OL Children: ', this.el.children.length);
  }

  destroy() {
    super.destroy();
  }
}

export default OrderedList;

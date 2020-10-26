import { Component } from 'component-loader-js';

class UnOrderedList extends Component {
  constructor() {
    super(...arguments);
    this.countChild();
    this.subscribe('orderedlist::custom::event', (data) => {
      console.log('log subscribed data "orderedlist::custom::event": ', data);
    });
  }

  countChild() {
    // console.log('UL Children: ', this.el.children.length);
  }

  destroy() {
    super.destroy();
  }
}

export default UnOrderedList;

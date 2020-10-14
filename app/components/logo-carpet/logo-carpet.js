import { Component } from 'component-loader-js';

class LogoCarpet extends Component {
  constructor() {
    super(...arguments);
    console.log('constructor LogoCarpet'); // todo: remove!
  }

  destroy() {
    super.destroy();
  }
}

export default LogoCarpet;

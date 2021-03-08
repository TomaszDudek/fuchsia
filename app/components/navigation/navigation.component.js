import { Component } from 'component-loader-js';

class NavigationComponent extends Component {
  constructor() {
    super();
    this.getElements();
    this.bindEventListeners();
  }

  getElements() {
    this.buttonOpen = document.getElementById('navigationButtonOpen');
    this.buttonClose = document.getElementById('navigationButtonClose');
    this.navigationContainer = document.getElementById('navigationContainer');
  }

  bindEventListeners() {
    this.buttonOpen.addEventListener('click', (e) => this.toggle(e));
    this.buttonClose.addEventListener('click', (e) => this.toggle(e));
  }

  toggle(e) {
    e.preventDefault();
    this.navigationContainer.classList.toggle('navigation__container--is-open');
  }

  destroy() {
    super.destroy();
  }
}

export default NavigationComponent;

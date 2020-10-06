/* eslint-env browser */
import { Component } from 'component-loader-js';

class SectionNavigation extends Component {
  constructor() {
    super(...arguments);
    this.setNavigationItems(this.getTitles());
  }

  getTitles = () => document.getElementsByClassName('page-section__title');

  setNavigationItems = (items) => {
    const targetList = document.getElementsByClassName('section-navigation__list')[0];
    const itemList = document.createDocumentFragment();

    Array.from(items).forEach((el) => {
      const newItem = this.createItem(el.innerHTML);
      this.setIdOnTarget(el, this.createId(el.innerHTML));
      itemList.appendChild(newItem);
    });

    targetList.appendChild(itemList);
  }

  setIdOnTarget = (target, id) => {
    const newTarget = target.closest('section.page-section');
    newTarget.setAttribute('id', id);
  }

  createItem = (text) => {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.setAttribute('href', `#${this.createId(text)}`);
    link.classList.add('section-navigation__link');
    link.innerHTML = text;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      this.smoothScroll(e.target.hash);
    });

    item.classList.add('section-navigation__item');
    item.appendChild(link);

    return item;
  }

  createId = (string) => {
    const id = `${string}`;
    return id.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  // todo: make this reusable
  smoothScroll = (target, duration = 1000) => {
    const scrollTarget = document.querySelector(target);
    const scrollTargetPositon = scrollTarget.offsetTop;
    const scrollStartPosition = document.body.scrollTop;
    const scrollDistance = scrollTargetPositon - scrollStartPosition;
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
  }

  destroy() {
    super.destroy();
  }
}

export default SectionNavigation;

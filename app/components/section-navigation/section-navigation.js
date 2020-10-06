/* eslint-env browser */
import { Component } from 'component-loader-js';
import { smoothScroll } from '../../scripts/utils/smoothScroll';

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
      smoothScroll(e.target.hash);
    });

    item.classList.add('section-navigation__item');
    item.appendChild(link);

    return item;
  }

  createId = (string) => {
    const id = `${string}`;
    return id.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  destroy() {
    super.destroy();
  }
}

export default SectionNavigation;

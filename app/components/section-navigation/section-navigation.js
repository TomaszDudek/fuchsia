import { Component } from 'component-loader-js';
import { smoothScroll } from '../../scripts/utils/export-star';

class SectionNavigation extends Component {
  constructor() {
    super(...arguments);
    this.setNavigationItems(this.getTitles());

    const sectionMargin = 200;
    let currentActive = 0;
    const sections = this.getTitles();
    const navigationItems = document.querySelectorAll('.section-navigation__item');

    this.subscribe('scrollSpy::custom::event', () => {
      // eslint-disable-next-line max-len
      const current = sections.length - [...sections].reverse().findIndex((section) => document.body.scrollTop >= section.offsetTop - sectionMargin) - 1;
      if (current !== currentActive) {
        this.removeAllActive(navigationItems, sections);
        currentActive = current;
        this.makeActive(navigationItems, current);
      }
    });
  }

  makeActive = (menuLinks, link) => {
    menuLinks[link].classList.add('active');
  }

  removeActive = (menuLinks, link) => {
    menuLinks[link].classList.remove('active');
  };

  removeAllActive = (menuLinks, sections) => {
    [...Array(sections.length).keys()].forEach((link) => {
      this.removeActive(menuLinks, link);
    });
  }

  getTitles = () => {
    return document.getElementsByClassName('page-section__title');
  }

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

import { Component } from 'component-loader-js';
import throttle from 'lodash/throttle';
import { smoothScroll } from '../../scripts/utils/export-star';

class SectionNavigation extends Component {
  constructor() {
    super(...arguments);
    this.titels = this.getTitles();
    this.setNavigationItems(this.titels);
    this.sectionMargin = 200;
    this.currentActive = 0;

    const sections = this.titels;
    const navigationItems = this.getNavigationItems();

    document.body.addEventListener('scroll', throttle(() => {
      // eslint-disable-next-line max-len
      const current = sections.length - [...sections].reverse().findIndex((section) => document.body.scrollTop >= section.offsetTop - this.sectionMargin) - 1;
      if (current !== this.currentActive) {
        this.removeAllActive(navigationItems, sections);
        this.currentActive = current;
        this.makeActive(navigationItems, current);
      }
    }, 100), { passive: true });
  }

  makeActive = (menuLinks, link) => {
    const item = menuLinks[link];
    if (item) {
      item.classList.add('active');
      this.highlightLink(item);
    }
  }

  highlightLink = (element) => {
    this.stopHighlighting();
    const link = element.querySelector('.section-navigation__link');
    link.classList.add('highlighted');
    setTimeout(() => { link.classList.remove('highlighted'); }, 1000);
  };

  stopHighlighting = () => {
    const links = this.el.querySelectorAll('.highlighted');
    links.forEach((link) => {
      link.classList.remove('highlighted');
    });
  }

  removeActive = (menuLinks, link) => {
    menuLinks[link].classList.remove('active');
  };

  removeAllActive = (menuLinks, sections) => {
    [...Array(sections.length).keys()].forEach((link) => {
      this.removeActive(menuLinks, link);
    });
  }

  getTitles = () => document.getElementsByClassName('page-section__title');

  getNavigationItems = () => document.querySelectorAll('.section-navigation__item');

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
    return id.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()).split('.').join('');
  };

  destroy() {
    super.destroy();
  }
}

export default SectionNavigation;

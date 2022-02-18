import { Component } from 'component-loader-js';
import { smoothScroll } from '../../scripts/utils/export-star';

class SectionNavigation extends Component {
  constructor() {
    super(...arguments);
    this.sectionMargin = 200;
    this.currentActive = 0;

    this.init();
  }

  init() {
    this.setReferences();
    this.buildNavigation();
    this.setUpPubSub();
  }

  setReferences() {
    this.linkableSections = document.querySelectorAll('section[id]');
    this.navigation = this.el.querySelector('.section-navigation__list');
  }

  buildNavigation() {
    const itemList = document.createDocumentFragment();

    this.linkableSections.forEach((section) => {
      itemList.appendChild(this.createNavigationItem(section));
    });

    this.navigation.appendChild(itemList);
  }

  createNavigationItem(section) {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.setAttribute('href', `#${section.id}`);
    link.classList.add('section-navigation__link');
    link.innerHTML = this.extractSectionName(section);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(e.target.hash);
    });

    item.classList.add('section-navigation__item');
    item.appendChild(link);

    return item;
  }

  extractSectionName(section) {
    return section.querySelector('.page-section__title').innerText;
  }

  setUpPubSub() {
    const sections = document.querySelectorAll('section[id] .page-section__title');
    const navigationItems = document.querySelectorAll('.section-navigation__item');

    this.subscribe('scrollSpy::scroll::event', () => {
      // eslint-disable-next-line max-len
      const current = sections.length - [...sections].reverse().findIndex((section) => document.body.scrollTop >= section.offsetTop - this.sectionMargin) - 1;
      if (current !== this.currentActive) {
        this.removeAllActive(navigationItems, sections);
        this.currentActive = current;
        this.makeActive(navigationItems, current);
      }
    });
  }

  makeActive(menuLinks, link) {
    const item = menuLinks[link];
    if (item) {
      item.classList.add('active');
      this.highlightLink(item);
    }
  }

  highlightLink(element) {
    this.stopHighlighting();
    const link = element.querySelector('.section-navigation__link');
    link.classList.add('highlighted');
    setTimeout(() => { link.classList.remove('highlighted'); }, 1000);
  }

  stopHighlighting() {
    const links = this.el.querySelectorAll('.highlighted');
    links.forEach((link) => {
      link.classList.remove('highlighted');
    });
  }

  removeActive(menuLinks, link) {
    menuLinks[link].classList.remove('active');
  }

  removeAllActive(menuLinks, sections) {
    [...Array(sections.length).keys()].forEach((link) => {
      this.removeActive(menuLinks, link);
    });
  }

  destroy() {
    super.destroy();
  }
}

export default SectionNavigation;

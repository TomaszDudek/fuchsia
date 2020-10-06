/* eslint-env browser */
import ComponentLoader from 'component-loader-js';
import OrderedList from './components/ordered-list/ordered-list';
import UnOrderedList from './components/unordered-list/unordered-list';
import Gear from './components/gear/gear';
import SectionNavigation from './components/section-navigation/section-navigation';
import './index.scss';

console.log('Fuchsia template is working!');
console.log(document.querySelectorAll('*').length);

const componentLoader = new ComponentLoader({
  OrderedList,
  UnOrderedList,
  Gear,
  SectionNavigation,
});

document.addEventListener('DOMContentLoaded', () => {
  componentLoader.scan();
});

console.log('EOF index.js'); // todo: remove

/* eslint-env browser */
import ComponentLoader from 'component-loader-js';
import OrderedList from './components/ordered-list/ordered-list';
import UnOrderedList from './components/unordered-list/unordered-list';
import './index.scss';

console.log('Fuchsia template is working!');
console.log(document.querySelectorAll('*').length);

const componentLoader = new ComponentLoader({ OrderedList, UnOrderedList });

document.addEventListener('DOMContentLoaded', () => {
  componentLoader.scan();
});

console.log('EOF index.js'); // todo: remove

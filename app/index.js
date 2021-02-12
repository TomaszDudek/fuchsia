/* eslint-env browser */
import ComponentLoader from 'component-loader-js';
import OrderedList from './components/ordered-list/ordered-list';
import UnOrderedList from './components/unordered-list/unordered-list';
import Gear from './components/gear/gear';
import SectionNavigation from './components/section-navigation/section-navigation';
import YoutubePlayer from './components/youtube-player/youtube-player';
import LogoCarpet from './components/logo-carpet/logo-carpet';
import './index.scss';
import DarkModeToggleComponent from "./components/dark-mode-toggle/dark-mode-toggle.component";

// console.log('Fuchsia template is working!');
// console.log(document.querySelectorAll('*').length);

const componentLoader = new ComponentLoader({
  OrderedList,
  UnOrderedList,
  Gear,
  SectionNavigation,
  YoutubePlayer,
  LogoCarpet,
  DarkModeToggleComponent
});

document.addEventListener('DOMContentLoaded', () => {
  componentLoader.scan();
});

document.addEventListener('touchstart', () => {}, { passive: true });

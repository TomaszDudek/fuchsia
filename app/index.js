/* eslint-env browser */
import './index.scss';
import ComponentLoader from 'component-loader-js';
import ScrollSpy from './components/scroll-spy/scroll-spy.component';
import Gear from './components/gear/gear';
import SectionNavigation from './components/section-navigation/section-navigation';
import YoutubePlayer from './components/youtube-player/youtube-player';
import LogoCarpet from './components/logo-carpet/logo-carpet';
import DarkModeToggleComponent from './components/dark-mode-toggle/dark-mode-toggle.component';
import Navigation from './components/navigation/navigation.component';
import Header from './components/header/header.component';
import Dropdown from './components/drop-down/drop-down.component';

// console.log('Fuchsia template is working!');
// console.log(document.querySelectorAll('*').length);

const componentLoader = new ComponentLoader({
  ScrollSpy,
  Header,
  Navigation,
  DarkModeToggleComponent,
  Gear,
  SectionNavigation,
  LogoCarpet,
  YoutubePlayer,
  Dropdown,
});

document.addEventListener('DOMContentLoaded', () => {
  componentLoader.scan();
});

document.addEventListener('touchstart', () => {}, { passive: true });

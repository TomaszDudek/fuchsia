import { Component } from 'component-loader-js';

class DarkModeToggleComponent extends Component {
  constructor() {
    super();

    this.btn = document.querySelector('.dark-mode-toggle');
    this.prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    this.currentTheme = localStorage.getItem('theme');

    this.toggle();
    this.click();
  }

  toggle() {
    if (this.currentTheme === 'dark') {
      document.body.classList.toggle('dark-theme');
    } else if (this.currentTheme === 'light') {
      document.body.classList.toggle('light-theme');
    }
  }

  click() {
    this.btn.addEventListener('click', () => {
      let theme;
      if (this.prefersDarkScheme.matches) {
        document.body.classList.toggle('light-theme');
        theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      } else {
        document.body.classList.toggle('dark-theme');
        theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      }
      localStorage.setItem('theme', theme);
    });
  }

  destroy() {
    super.destroy();
  }
}

export default DarkModeToggleComponent;

import { Component } from 'component-loader-js';

class LogoCarpet extends Component {
  constructor() {
    super(...arguments);

    this.CONFIG = {
      itemsToShow: 4,
      firstStart: 10000,
      interval: 3000,
      classes: {
        itemContainer: 'logo-carpet__container'
      }
    };

    this.lastNumber = null;
    this.imagePool = [];
    this.allContainers = null;

    this.setupDomReferences();
    this.generateImagePoolAndRemoveContainers();

    setTimeout(() => {
      this.replaceImage();
      setInterval(() => { this.replaceImage(); }, this.CONFIG.interval);
    }, this.CONFIG.firstStart);
  }

  setupDomReferences() {
    this.allContainers = document.getElementsByClassName(this.CONFIG.classes.itemContainer);
  }

  getRandomContainer() {
    const min = 0;
    const max = this.CONFIG.itemsToShow;
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min)) + min;
    } while (randomNumber === this.lastNumber);
    this.lastNumber = randomNumber;
    return this.allContainers[randomNumber];
  }

  setNewImage(containerToReplaceImage) {
    const imageToAdd = this.imagePool[0];
    containerToReplaceImage.appendChild(imageToAdd);
  }

  replaceImage() {
    const containerToReplaceImage = this.getRandomContainer();
    const imageToRemove = containerToReplaceImage.children[0];

    containerToReplaceImage.innerHTML = '';

    this.setNewImage(containerToReplaceImage);
    this.updateImagePool(imageToRemove);
  }

  updateImagePool(imageToRemove) {
    this.imagePool.shift();
    this.imagePool.push(imageToRemove);

    // console.log('updated imagePool', this.imagePool);
  }

  generateImagePoolAndRemoveContainers() {
    for (let counter = (this.allContainers.length - 1);
      counter >= this.CONFIG.itemsToShow;
      counter -= 1) {
      this.imagePool.push(this.allContainers[counter].children[0]);
      this.allContainers[counter].remove();
    }
    this.imagePool.reverse();

    // console.log('initial imagePool', this.imagePool);
  }

  destroy() {
    super.destroy();
  }
}

export default LogoCarpet;

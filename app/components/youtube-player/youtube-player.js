import { Component } from 'component-loader-js';
import YouTubePlayer from 'youtube-player';
import _ from 'lodash';

class YoutubePlayer extends Component {
  constructor() {
    super(...arguments);
    const videoId = this.el.dataset.componentVideoid;
    const ytPlayer = new YouTubePlayer('player');
    const stateNames = {
      '-1': 'unstarted',
      0: 'ended',
      1: 'playing',
      2: 'paused',
      3: 'buffering',
      5: 'video cued'
    };

    // ytPlayer.loadVideoById('Qp8U_cevJd8');
    ytPlayer.loadVideoById(videoId);

    ytPlayer.on('stateChange', _.debounce((event) => {
      if (!stateNames[event.data]) {
        throw new Error(`Unknown state (${event.data}).`);
      }

      console.log(`State: ${stateNames[event.data]} (${event.data}).`);

      this.toggle(event);
    }, 100));
  }

  toggle(event) {
    const state = event.data;

    if (state === 1 || state === 3) {
      this.el.classList.add('youtube-player--is-playing');
    } else {
      this.el.classList.remove('youtube-player--is-playing');
    }
  }
}

export default YoutubePlayer;

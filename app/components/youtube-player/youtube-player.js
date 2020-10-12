import { Component } from 'component-loader-js';
import YouTubePlayer from 'youtube-player';

class YoutubePlayer extends Component {
  constructor() {
    super(...arguments);
    const ytPlayer = new YouTubePlayer('player');
    ytPlayer.loadVideoById('74pX6-3u7uE');
    console.log('ytPlayer', ytPlayer);
  }
}

export default YoutubePlayer;

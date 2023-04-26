import { Howl } from 'howler';

import bounceSrc from './assets/sounds/bounce';

const bounceSound = new Howl({
  src: [bounceSrc],
  autoplay: false,
  loop: false,
  rate: 1.0,
  volume: 0.25,
});

export const playBounce = () => {
  bounceSound.play();
};

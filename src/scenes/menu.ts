import { Sprite, Scene } from 'kontra';

let sprite = Sprite({
  x: 100, // starting x,y position of the sprite
  y: 80,
  color: 'red', // fill color of the sprite rectangle
  width: 20, // width and height of the sprite rectangle
  height: 40,
  dx: 2, // move the sprite 2px to the right every frame
});

const menuScene = Scene({
  id: 'menu',
  objects: [sprite],
});

export default menuScene;

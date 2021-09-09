import p5 from 'p5';
import { Game } from './game';

const game = new Game();

new p5((p: p5) => {
  p.setup = () => {
    game.setup(p);
  };

  p.draw = () => {
    game.draw(p);
  };

  p.keyPressed = () => {
    game.keyPressed(p.keyCode, p);
  };

  p.keyReleased = () => {
    game.keyReleased(p.keyCode, p);
  };
});

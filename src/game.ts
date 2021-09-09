import p5 from 'p5';
import { Player } from './player';
import { Stage } from './stage';

export class Game {
  private screen: {width: number, height: number};
  private stage: Stage;
  private player: Player;

  public constructor() {
    this.screen = {
      width: 960,
      height: 640,
    };
  }

  public setup(p: p5) {
    p.createCanvas(this.screen.width, this.screen.height);
    Player.screen = this.screen;
    this.player = new Player(p, this.screen.width/ 2, this.screen.height / 2, 32, 4);

    this.stage = new Stage(32);
  }

  public draw(p: p5) {
    p.background(64);

    this.stage.draw(p);

    this.player.draw(p);
    this.player.update(p);

    this.stage.checkCollision(this.player);
  }

  public keyPressed(keyCode: number, _p: p5) {
    this.player.keyPressed(keyCode);
  }

  public keyReleased(keyCode: number, p: p5) {
    this.player.keyReleased(keyCode, p);
  }
}

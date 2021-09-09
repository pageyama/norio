import p5 from 'p5'

export class Player {
  static screen: { width: number, height: number };
  private speed: number;
  private gravity = 0.4;

  public readonly size: number;
  public readonly sizeHalf: number;

  public pos: p5.Vector;
  public vel: p5.Vector;

  public isJumping: boolean;

  constructor(p: p5, x: number, y: number, size: number, speed: number) {
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(0, 0);
    this.size = size;
    this.sizeHalf = size / 2;
    this.speed = speed;

    this.isJumping = true;
  }

  public draw(p: p5) {
    p.push();
    p.noStroke();
    p.rectMode(p.CENTER);
    p.fill(255);
    p.rect(this.pos.x, this.pos.y, this.size, this.size);
    p.pop();
  }

  public update(_p: p5) {
    this.pos.x += this.vel.x;
    if(this.isJumping) {
      this.vel.y += this.gravity;
      this.pos.y += this.vel.y;
    }
  }

  public get left() {
    return this.pos.x - this.sizeHalf;
  }

  public get right() {
    return this.pos.x + this.sizeHalf;
  }

  public get top() {
    return this.pos.y - this.sizeHalf;
  }

  public get bottom() {
    return this.pos.y + this.sizeHalf;
  }

  public keyPressed(keyCode: number) {
    if(keyCode == 68) {
      //d
      this.vel.x = this.speed;
    } else if(keyCode == 65) {
      //a
      this.vel.x = - this.speed;
    } else if(keyCode == 32) {
      //space
      console.log('Space pressed')
      console.log(this.isJumping)
      if(!this.isJumping) {
        this.vel.y = -14;
        this.isJumping = true;
      }
    }
  }

  public keyReleased(keyCode: number, p: p5) {

    if(keyCode == 68) {
      if(p.keyIsDown(65)) {
        this.vel.x = - this.speed;
      } else {
        this.vel.x = 0;
      }
    }else if(keyCode == 65) {
      if(p.keyIsDown(68)) {
        this.vel.x = this.speed;
      } else {
        this.vel.x = 0;
      }
    }
  }
}

import p5 from 'p5';
import { Player } from './player';

export class Stage {
  private tileSize: number;
  private map: number[][];

  public constructor(tileSize: number) {
    this.tileSize = tileSize;
    this.map = map;
  }

  public draw(p: p5) {

    p.push();

    for(let r = 0; r < this.map.length; r++) {
      for(let c = 0; c < this.map[0].length; c++) {

        const cell = this.map[r][c];
        if(cell == CellType.None) {
          p.fill(200);
        } else if(cell == CellType.Block) {
          p.fill(64)
        }

        p.rect(this.tileSize * c, this.tileSize * r, this.tileSize, this.tileSize);

      }
    }

    p.pop();
  }

  public getCell(x: number, y: number): Cell {
    const c = Math.floor(x / this.tileSize);
    const r = Math.floor(y / this.tileSize);

    return {
      x: c * this.tileSize,
      y: r * this.tileSize,
      col: c,
      row: r,
      type: this.map[r][c],
    }
  }

  public checkCollision(player: Player) {
    if(player.isJumping) {

      if(player.vel.y > 0) {
        this.checkLanding(player);
      } else {
        //top side
        const top = Math.floor(player.top / this.tileSize);
        const left = Math.floor(player.left / this.tileSize);
        const right = Math.floor(player.right / this.tileSize);

        if(this.map[top][left] == CellType.Block || this.map[top][right] == CellType.Block) {
          player.pos.y = (top + 1) * this.tileSize + player.sizeHalf;
          player.vel.y = 0;
        }
      }


    } else {
      this.checkFalling(player);
    }

    const top = Math.floor(player.top / this.tileSize);
    const bottom = Math.floor(player.bottom / this.tileSize);
    const left = Math.floor(player.left / this.tileSize);
    const right = Math.floor(player.right / this.tileSize);

    if(player.vel.x < 0 && (this.map[top][left] == CellType.Block || this.map[bottom][left] == CellType.Block)) {
      //left side
      player.pos.x = (left + 1) * this.tileSize + player.sizeHalf;
      player.vel.x = 0;
    } else if(player.vel.x > 0 && (this.map[top][right] == CellType.Block || this.map[bottom][right] == CellType.Block)) {
      //right
      player.pos.x = right * this.tileSize - player.sizeHalf - 1;
      player.vel.x = 0;
    }
  }

  private checkFalling(player: Player) {
      const underRow = Math.floor(player.bottom / this.tileSize) + 1;
      if(underRow >= this.map.length) {
        player.isJumping = true;
        return;
      }

      const left = Math.floor(player.left / this.tileSize);
      const right = Math.floor(player.right / this.tileSize);

      const bottomLeft = this.map[underRow][left];
      const bottomRight = this.map[underRow][right];

      if(bottomLeft == CellType.None && bottomRight == CellType.None) {
        player.isJumping = true;
      }
  }

  private checkLanding(player: Player) {
    const bottom = Math.floor(player.bottom / this.tileSize);
    const left = Math.floor(player.left / this.tileSize);
    const right = Math.floor(player.right / this.tileSize);

    const bottomLeft = this.map[bottom][left];
    const bottomRight = this.map[bottom][right];

    if(bottomLeft == CellType.Block || bottomRight == CellType.Block) {
      player.pos.y = this.tileSize * bottom - player.sizeHalf - 2;
      player.vel.y = 0;
      player.isJumping = false;
    }
  }
}

type Cell = {
  x: number,
  y: number,
  col: number,
  row: number,
  type: CellType,
}

export enum CellType {
  None,
  Block,
}

const map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

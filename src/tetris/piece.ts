import { ROWS, COLUMNS } from "./grid";
import { createPiece } from "./global";
// import { UpdateScores$ } from "./global";


export class Piece {
   public x: number = Math.floor(ROWS / 2) - 1;
   public y: number = -1;
   private _blocks: number[][];
   private _nextBlocks: number[][];
   private game;

   get blocks() {
      return this._blocks;
   }

   get nextBlocks() {
      return this._nextBlocks;
   }

   constructor(game) {
      this.game = game;
      this._blocks = createPiece();
      this._nextBlocks = createPiece();
   }

   moveLeft() {
      this.x -= 1;
      if (this.hasCollision()) {
         this.x += 1;
      }
   }

   moveRight() {
      this.x += 1;
      if (this.hasCollision()) {
         this.x -= 1;
      }
   }

   moveDown() {
      this.y += 1;
      if (this.hasCollision()) {
         this.y -= 1;
         this.lock();
         this.clearLines();
         this.updatePieces();
      }

      //gameover
      if(this.hasCollision()) {
         this.game.state.gameOver = true;
         this.game.controller.stop();
      }
   }

   rotate() {
      const temp = [];
      const initial = [...this._blocks];

      for (let x = 0; x < this._blocks.length; x++) {
         temp[x] = new Array(this._blocks.length).fill(0);
      }

      for (let y = 0; y < this._blocks.length; y++) {
         for (let x = 0; x < this._blocks.length; x++) {
            temp[x][y] = this._blocks[this._blocks.length - 1 - y][x];
         }
      }

      this._blocks = temp;

      if (this.hasCollision()) {
         this._blocks = initial;
      }
   }

   clearLines() {
      let lines = [];
      let grid = this.game.grid;

      for (let y = grid.value.length - 1; y >= 0; y--) {
         let numberOfBlocks = 0;
         for (let x = 0; x < grid.value[y].length; x++) {
            if (grid.value[y][x]) {
               numberOfBlocks += 1;
            }
         }

         if (numberOfBlocks === 0) {
            break;
         } else if (numberOfBlocks < grid.value[y].length) {
            continue;
         } else if (numberOfBlocks === grid.value[y].length) {
            lines.unshift(y);
         }
      }

      for (let index of lines) {
         grid.value.splice(index, 1);
         grid.value.unshift(new Array(ROWS).fill(0));
      }

      this.updateScore(lines.length);
   }

   updateScore(clearedLines) {
      const points = {
         1: 40,
         2: 100,
         3: 300,
         4: 1200
      }
      if (clearedLines > 0) {
         this.game.state.scores += points[clearedLines];
         this.game.state.lines += clearedLines;
      }
   }

   updatePieces() {
      this._blocks = this._nextBlocks;
      this._nextBlocks = createPiece();
      this.x = Math.floor(ROWS / 2) - 1;
      this.y = -1;
   }

   hasCollision() {
      const { x: pieceX, y: pieceY } = this;
      const grid = this.game.grid;

      for (let y = 0; y < this._blocks.length; y++) {
         for (let x = 0; x < this._blocks[y].length; x++) {
            if (
               this._blocks[y][x] &&
               ((grid.value[pieceY + y] === undefined || grid.value[pieceY + y][pieceX + x] === undefined) ||
                  grid.value[pieceY + y][pieceX + x])
            ) {
               return true;
            }
         }
      }

      return false;
   }

   lock() {
      const grid = this.game.grid;

      for (let y = 0; y < this._blocks.length; y++) {
         for (let x = 0; x < this._blocks[y].length; x++) {
            if (this._blocks[y][x]) {
               grid.value[this.y + y][this.x + x] = this._blocks[y][x]
            }
         }
      }
   }
}
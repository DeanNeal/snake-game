export const ROWS = 10;
export const COLUMNS = ROWS * 2;

export class Grid {
   private _value: number[][];
   private game;

   constructor(game) {
      this.game = game;
      this._value = this.create();
   }

   get value() {
      return this._value;
   }

   create() {
      const playfield = [];

      for (let y = 0; y < COLUMNS; y++) {
         playfield[y] = [];
         for (let x = 0; x < ROWS; x++) {
            playfield[y][x] = 0;
         }
      }
      
      return playfield;
   }


   getState() {
      const playfield = this.game.grid.create();

      for (let y = 0; y < this.game.grid.value.length; y++) {
         playfield[y] = [];
         for (let x = 0; x < this.game.grid.value[y].length; x++) {
            playfield[y][x] = this.game.grid.value[y][x];
         }
      }

      for (let y = 0; y < this.game.activePiece.blocks.length; y++) {
         for (let x = 0; x < this.game.activePiece.blocks[y].length; x++) {
            if (this.game.activePiece.blocks[y][x]) {
               playfield[this.game.activePiece.y + y][this.game.activePiece.x + x] = this.game.activePiece.blocks[y][x];
            }
         }
      }

      return playfield;
   }

}
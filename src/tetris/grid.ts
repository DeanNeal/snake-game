export const ROWS = 11;
export const COLUMNS = 22;

export class Grid {
   private _value: number[][];

   constructor() {
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

}
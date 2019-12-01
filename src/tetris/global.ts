import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export const WINDOW_SIZE: number = (window.innerHeight < window.innerWidth) ? (window.innerHeight - 50) : (window.innerWidth - 50);
// export const TILE_SIZE: number = WINDOW_SIZE / 15;
// export const BULLET_SPEED: number = WINDOW_SIZE / 2.2;
export const WIDTH = 450;//300
export const GRID_WIDTH = WIDTH - 150;
export const HEIGHT = 600;

export const UpdateScores$ = new BehaviorSubject({ scores: 0, lines: 0 });


export function createPiece() {
   const index = Math.floor(Math.random() * 9);
   const type = 'IJLOSTZCP'[index];
   let piece = [];//{x: Math.floor(ROWS / 2) - 1, y: -1, blocks: []};

   switch (type) {
      case 'I':
         piece = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
         ];
         break;
      case 'J':
         piece = [
            [0, 0, 0],
            [2, 2, 2],
            [0, 0, 2]
         ];
         break;
      case 'L':
         piece = [
            [0, 0, 0],
            [3, 3, 3],
            [3, 0, 0]
         ];
         break;
      case 'O':
         piece = [
            [0, 0, 0, 0],
            [0, 4, 4, 0],
            [0, 4, 4, 0],
            [0, 0, 0, 0]
         ];
         break;
      case 'S':
         piece = [
            [0, 0, 0],
            [0, 5, 5],
            [5, 5, 0]
         ];
         break;
      case 'T':
         piece = [
            [0, 0, 0],
            [6, 6, 6],
            [0, 6, 0]
         ];
         break;
      case 'Z':
         piece = [
            [0, 0, 0],
            [7, 7, 0],
            [0, 7, 7]
         ];
         break;
      case 'C':
         piece = [
            [0, 0, 0],
            [8, 8, 8],
            [8, 0, 8]
         ];
         break;
      case 'P':
         piece = [
            [0, 0, 0],
            [0, 9, 0],
            [0, 0, 0]
         ];
         break;

      default:
         throw new Error('FUCK');
   }

   return piece;
}
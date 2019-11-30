import './tetris.less';
import { WIDTH, HEIGHT, GRID_WIDTH } from "./global";
import { Piece } from './piece';
import { Grid, ROWS, COLUMNS } from "./grid";
import { Controller } from './controller';

interface ILevel {
   scores: number;
   maxScores: number;
   startWithBots: number;
}

interface IState {
   pause: boolean;
   init: boolean;
   gameOver: boolean;
   scores: number;
   lines: number;
   level: number;
}

class State {
   public pause: boolean = false;
   public init: boolean = true;
   public gameOver: boolean = false;

   public scores = 0;
   public lines = 0;
   get level() {
      return Math.floor(this.lines * 0.1)
   }
}

class Game {
   public canvas: HTMLCanvasElement;
   private context: CanvasRenderingContext2D;
   // private gameCallback: () => void;
   public state: IState = new State();
   private activePiece = new Piece(this);
   private grid = new Grid();
   // private pressedKeys: { [s: string]: boolean } = {};
   public controller: Controller = new Controller(this);

   static colors = {
      1: 'cyan',
      2: 'blue',
      3: 'orange',
      4: 'yellow',
      5: 'green',
      6: 'purple',
      7: 'red'
   };

   constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');

      this.canvas.width = WIDTH;
      this.canvas.height = HEIGHT;

      this.render();
   }

   clearScreen() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   draw() {
      this.clearScreen();

      this.context.strokeStyle = 'white';
      this.context.lineWidth = 4;
      this.context.strokeRect(2, 2, GRID_WIDTH, HEIGHT - 4);

      this.context.fillStyle = 'white';
      this.context.font = '20px Arial';
      this.context.textAlign = 'left';
      this.context.fillText(`Score: ${this.state.scores}`, GRID_WIDTH + 15, 25);
      this.context.fillText(`Lines: ${this.state.lines}`, GRID_WIDTH + 15, 60);
      this.context.fillText(`Level: ${this.state.level}`, GRID_WIDTH + 15, 95);
      this.context.fillText(`Next figure: `, GRID_WIDTH + 15, 130);

      // this.context.fillStyle = '#000';
      // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }

   renderStartScreen() {
      // this.context.fillStyle = 'rgba(0,0,0,0.75)';
      this.context.fillRect(0, 0, WIDTH, HEIGHT);

      this.context.fillStyle = 'white';
      this.context.font = '20px Arial';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';

      this.context.fillText('Press ENTER to start', GRID_WIDTH / 2, HEIGHT / 2);
   }

   renderPauseScreen() {
      this.context.fillStyle = 'rgba(0,0,0,0.75)';
      this.context.fillRect(0, 0, WIDTH, HEIGHT);

      this.context.fillStyle = 'white';
      this.context.font = '20px Arial';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';

      this.context.fillText('Press P to resume', GRID_WIDTH / 2, HEIGHT / 2);
   }

   renderGameOverScreen() {
      this.clearScreen();

      // this.context.fillStyle = 'rgba(0,0,0,0.75)';
      // this.context.fillRect(0,0, WIDTH, HEIGHT);

      this.context.fillStyle = 'white';
      this.context.font = '20px Arial';
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';

      this.context.fillText('GAMEOVER', GRID_WIDTH / 2, HEIGHT / 2);
      this.context.fillText('Press ENTER to restart', GRID_WIDTH / 2 + 30, HEIGHT / 2 + 30);
   }

   drawPieces() {
      const blockWidth = (GRID_WIDTH - 6) / ROWS;
      const blockHeight = (HEIGHT - 2) / COLUMNS;

      this.getState().forEach((line, row) => {
         line.forEach((block, column) => {
            if (block) {

               this.context.fillStyle = Game.colors[block];
               this.context.strokeStyle = 'black';
               this.context.lineWidth = 2;
               this.context.fillRect(column * blockWidth + 5, row * blockWidth + 5, blockWidth, blockHeight);
               this.context.strokeRect(column * blockWidth + 5, row * blockWidth + 5, blockWidth, blockHeight);
            }
         })
      });

      this.activePiece.nextBlocks.forEach((line, row)=> {
         line.forEach((block, column) => {
            if(block) {
               this.context.fillStyle = Game.colors[block];
               this.context.strokeStyle = 'black';
               this.context.lineWidth = 2;
               this.context.fillRect(GRID_WIDTH + column * blockWidth + 20, row * blockWidth + 130, blockWidth, blockHeight);
               this.context.strokeRect(GRID_WIDTH + column * blockWidth + 20, row * blockWidth + 130, blockWidth, blockHeight);
            }
         });
      });
   }

   getState() {
      const playfield = this.grid.create();

      for (let y = 0; y < this.grid.value.length; y++) {
         playfield[y] = [];
         for (let x = 0; x < this.grid.value[y].length; x++) {
            playfield[y][x] = this.grid.value[y][x];
         }
      }

      for (let y = 0; y < this.activePiece.blocks.length; y++) {
         for (let x = 0; x < this.activePiece.blocks[y].length; x++) {
            if (this.activePiece.blocks[y][x]) {
               playfield[this.activePiece.y + y][this.activePiece.x + x] = this.activePiece.blocks[y][x];
            }
         }
      }

      return playfield;
   }


   render() {
      if (this.state.init) {
         this.renderStartScreen();
         return;
      }

      if (this.state.pause) {
         this.renderPauseScreen();
         return;
      }

      if (this.state.gameOver) {
         this.renderGameOverScreen();
         return;
      }


      this.draw();
      this.drawPieces();
   }

   // update(dt): void {
   //    // this.draw();

   //    // this.drawPiece();

   //    // this.keyboard();
   // }

   reset() {
      this.state = new State();
      this.grid = new Grid();
   }
}

const canvas = <HTMLCanvasElement>document.getElementById('tetris');
(window as any).game = new Game(canvas);
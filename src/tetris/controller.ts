import { UpdateScores$ } from "./global";

export class Controller {
   private game;
   private interval: number;

   constructor(game) {
      this.game = game;

      window.addEventListener('keyup', (e: KeyboardEvent) => {
         switch (e.keyCode) {
            case 40:
               if (!this.game.state.gameOver) {
                  this.play();
               }
               break;
         }
      });

      window.addEventListener('keydown', (e: KeyboardEvent) => {

         if (this.game.state.init || this.game.state.gameOver) {
            if (e.keyCode === 13) {
               
               if (this.game.state.gameOver) {
                  this.game.reset();
               }

               this.game.state.init = false;
               this.play();
            }
            return;
         }

         switch (e.keyCode) {
            case 37:
               this.game.activePiece.moveLeft();
               this.game.render();
               break;

            case 38:
               this.game.activePiece.rotate();
               this.game.render();
               break;

            case 39:
               this.game.activePiece.moveRight();
               this.game.render();
               break;

            case 40:
               this.game.activePiece.moveDown();
               this.stop();
               break;

            case 80:
               if (!this.game.state.init && !this.game.state.gameOver) {
                  this.game.state.pause = !this.game.state.pause;
                  this.game.state.pause ? this.stop() : this.play();
               }
               break;
         }
      }, false);
   }

   play() {
      const speed = 1000 - this.game.state.level * 100
      this.interval = window.setInterval(() => {
         if (!this.game.state.pause) {
            this.game.activePiece.moveDown();
            this.game.render();
         }
      }, speed > 0 ? speed : 100);

      this.game.render();
   }

   stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.game.render();
   }
}
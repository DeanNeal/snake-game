import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export const WINDOW_SIZE: number = (window.innerHeight  < window.innerWidth) ? (window.innerHeight - 50) : (window.innerWidth - 50) ;
// export const TILE_SIZE: number = WINDOW_SIZE / 15;
// export const BULLET_SPEED: number = WINDOW_SIZE / 2.2;
export const WIDTH = 450;//300
export const GRID_WIDTH = WIDTH - 150;
export const HEIGHT = 600;

export const UpdateScores$ = new BehaviorSubject({scores: 0, lines: 0});
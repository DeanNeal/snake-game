export interface ILevel {
    id: number,
    scores: number,
    maxScores: number,
    speed: number,
    size: number,
    barrier: number,
    color: string
}

export class Levels {
    public levels: ILevel[];
    constructor() {
        this.levels = [
            {
                id: 1,
                scores: 0,
                maxScores: 4,
                speed: 600,
                size: 8,
                barrier: 2,
                color: '#00ff37'
            },
            {
                id: 2,
                scores: 0,
                maxScores: 6,
                speed: 500,
                size: 9,
                barrier: 3,
                color: '#a9ff00'
            },
            {
                id: 3,
                scores: 0,
                maxScores: 8,
                speed: 400,
                size: 10,
                barrier: 4,
                color: '#e4ff00'
            },
            {
                id: 4,
                scores: 0,
                maxScores: 10,
                speed: 300,
                size: 11,
                barrier: 5,
                color: '#ffc800'
            },
            {
                id: 5,
                scores: 0,
                maxScores: 15,
                speed: 250,
                size: 12,
                barrier: 6,
                color: '#ff8d00'
            },
            {
                id: 6,
                scores: 0,
                maxScores: 20,
                speed: 200,
                size: 13,
                barrier: 7,
                color: '#ff0000'
            }
        ]
    }
}
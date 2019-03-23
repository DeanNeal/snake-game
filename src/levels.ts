export interface ILevel {
    id: number,
    scores: number,
    maxScores: number,
    speed: number,
    size: number,
    barrier: number,
    color: string,
    title: string
}

export class Levels {
    public levels: ILevel[];
    constructor() {
        this.levels = [
            {
                id: 1,
                scores: 0,
                maxScores: 4,
                speed: 500,
                size: 8,
                barrier: 5,
                color: '#00ff37',
                title: 'Все только начинается'
            },
            {
                id: 2,
                scores: 0,
                maxScores: 6,
                speed: 450,
                size: 8,
                barrier: 6,
                color: '#a9ff00',
                title: 'Немного быстрее'
            },
            {
                id: 3,
                scores: 0,
                maxScores: 8,
                speed: 400,
                size: 9,
                barrier: 7,
                color: '#e4ff00',
                title: 'Еще быстрее'
            },
            {
                id: 4,
                scores: 0,
                maxScores: 10,
                speed: 350,
                size: 9,
                barrier: 5,
                color: '#ffc800',
                title: 'Успеваете?'
            },
            {
                id: 5,
                scores: 0,
                maxScores: 15,
                speed: 320,
                size: 10,
                barrier: 7,
                color: '#ff8d00',
                title: 'Совсем жарко'
            },
            {
                id: 6,
                scores: 0,
                maxScores: 20,
                speed: 300,
                size: 11,
                barrier: 9,
                color: '#ff0000',
                title: 'Тлен'
            }
        ]
    }
}
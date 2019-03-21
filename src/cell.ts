export class Cell {
    public root;
    public y;
    public x;
    constructor(x, y) {
        this.root = document.createElement('div');
        this.root.classList = 'cell';
        this.x = x;
        this.y = y;
    }

    removeBody() {
        this.root.classList.remove('snake-body');
    }

    addBody() {
        this.root.classList.add('snake-body');
    }

    addHead() {
        this.root.classList.add('snake-head');
    }

    removeHead() {
        this.root.classList.remove('snake-head')
    }

    removeFood() {
        this.root.classList.remove('food');
    }

    setSize(gridSize, size) {
        const cellSize = gridSize / size + 'px';
        this.root.style.width = cellSize;
        this.root.style.height = cellSize;
    }
}
export function random(min, max): number {
    return (Math.random() * (max - min) + min);
}

export function booleanRandom() {
    return Math.random() >= .5;
}

export function tripleBooleanRandom() {
    let res, random = Math.random();
    if (random < 1 / 3) {
        res = -1;
    } else if (random >= 1 / 3 && random < 2 / 3) {
        res = 0;
    } else {
        res = 1;
    }

    return res;
}
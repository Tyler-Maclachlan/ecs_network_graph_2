import { Circle } from 'pixi.js';

export function createCircle(x?: number, y?: number, radius?: number) {
    return new Circle(x, y, radius);
}
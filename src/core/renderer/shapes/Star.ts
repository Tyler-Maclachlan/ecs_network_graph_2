import { Star } from 'pixi.js';

export function createStar(x?: number, y?: number, points?: number, radius?: number, innerRadius?: number) {
    return new Star(x, y, points, radius, innerRadius);
}
import { Rectangle } from 'pixi.js';

export function createRectangle(x?: number, y?: number, width?: number, height?: number) {
    return new Rectangle(x, y, width, height);
}
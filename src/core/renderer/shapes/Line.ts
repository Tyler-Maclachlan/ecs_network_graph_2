import { Graphics, LineStyle } from 'pixi.js';
import { Vec2 } from '../../utils';

export function drawLine(graphics: Graphics, from: Vec2, to: Vec2) {
    graphics.lineStyle(1, 1, 0, .5, true);
    graphics.position.set(from.x, from.y);
    graphics.lineTo(to.x, to.y);
    graphics.lineStyle();
}

export function drawLines(graphics: Graphics, fromPoints: Vec2[], toPoints: Vec2[]) {
    const fromLength = fromPoints.length;
    if (fromLength !== toPoints.length) {
        throw new Error('Lines arrays different sizes')
    }

    graphics.lineStyle(1, 1, 0, .5, true);

    fromPoints.forEach((from, i) => {
        const to = toPoints[i];
        graphics.position.set(from.x, from.y);
        graphics.lineTo(to.x, to.y);
    });

    graphics.lineStyle();
}
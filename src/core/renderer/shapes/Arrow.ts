import { Graphics } from 'pixi.js';
import { Vec2 } from '../../utils';


export function drawArrowHead(graphics: Graphics, pos: Vec2, width: number, height: number) {
    graphics.lineStyle(0);
    graphics.beginFill(0x000);

    graphics.position.set(pos.x - width * 0.5, pos.y - height + 0.5);
    graphics.lineTo(pos.x, pos.y + height * 0.5);
    graphics.position.set(pos.x, pos.y + height * 0.5);
    graphics.lineTo(pos.x, pos.y + height * 0.5);
    graphics.position.set(pos.x, pos.y + height * 0.5);
    graphics.lineTo(pos.x - width * 0.5, pos.y - height + 0.5);

    graphics.endFill();
}
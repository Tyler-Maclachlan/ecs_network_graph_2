import { BaseComponent } from './'
import { SHAPES, Sprite } from 'pixi.js';

export class SpriteComponent extends BaseComponent {
    public shape?: SHAPES;
    public sprite?: Sprite;
}
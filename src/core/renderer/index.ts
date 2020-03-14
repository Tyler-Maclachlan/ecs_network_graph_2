import { Renderer, Container, Graphics, DisplayObject } from 'pixi.js';
import { IRenderer } from '../../types';
import { createCircle } from './shapes';

export class PixiRenderer implements IRenderer {
    private _renderer: Renderer;
    private _view: HTMLCanvasElement;
    private _glContext: WebGLRenderingContext;
    private _stage: Container;
    private _container: HTMLElement;
    private _graphics: Graphics;

    public constructor(container: HTMLElement) {
        this._renderer = new Renderer({
            height: container.clientHeight,
            width: container.clientWidth,
            autoDensity: true,
            antialias: true,
            resolution: window.devicePixelRatio,
            backgroundColor: 0x000000,
            transparent: false,
        });

        this._container = container;
        this._view = this._renderer.view;
        this._glContext = this._renderer.gl;
        this._stage = new Container();
        this._graphics = new Graphics();
        this._stage.addChild(this._graphics);

        container.appendChild(this._renderer.view);
        window.addEventListener('resize', this._resize.bind(this));
    }

    public get graphics() {
        return this._graphics;
    }

    public get renderer() {
        return this._renderer;
    }

    public render(dt: number) {
        console.log('render');
        this._graphics.clear();

        const items = [0, 1, 2, 3, 4, 6, 6].map((i) => Math.random() * i * 100);
        for (const x of items) {
            this._graphics.lineStyle(1);
            this._graphics.beginFill(0xfff);
            this._graphics.drawShape(createCircle(x * Math.random() * 10, x * Math.random() * 10, 10));
            this.graphics.endFill();
        }

        this._renderer.render(this._stage);
    }

    private _resize() {
        this._renderer.resize(this._container.clientWidth, this._container.clientHeight);
    }
}
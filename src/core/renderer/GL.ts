import { hexToRgbaArray, hexToRgbArray } from "../utils";

export class GLContext {
    private _container: HTMLElement;
    private _canvas: HTMLCanvasElement;
    private _glContext: WebGL2RenderingContext;

    public constructor(container?: string | HTMLElement, canvasID?: string) {
        if (container === undefined) {
            this._container = document.createElement('div');
        } else if (typeof container === 'string') {
            this._container = document.getElementById(container);

            if (this._container === undefined) {
                throw new Error(`Could not find container element with ID: ${container}`);
            }
        } else {
            this._container = container;
        }

        if (canvasID !== undefined) {
            this._canvas = document.getElementById(canvasID) as HTMLCanvasElement;

            if (this._canvas === undefined) {
                throw new Error(`Could not find canvas element with ID: ${canvasID}`);
            }
        } else {
            this._canvas = document.createElement('canvas');
            this._container.appendChild(this._canvas);
        }

        this._glContext = this._canvas.getContext('webgl2');
        const c = this._glContext;

        c.cullFace(c.BACK);
        c.frontFace(c.CCW);
        c.enable(c.DEPTH_TEST);
        c.enable(c.CULL_FACE);
        c.depthFunc(c.LEQUAL);
        c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA);

        if (this._glContext === undefined) {
            throw new Error('WebGL2 not supported in this browser');
        }
    }

    public get container() {
        return this._container;
    }

    public get canvas() {
        return this._canvas;
    }

    public get glContext() {
        return this._glContext;
    }

    public fit(widthPercent = 1, heightPercent = 1) {
        this.setSize(window.innerWidth * widthPercent, window.innerHeight * heightPercent);
    }

    public setSize(w = 500, h = 500) {
        this._canvas.style.width = w + 'px';
        this._canvas.style.height = h + 'px';
        this._canvas.width = w;
        this._canvas.height = h;

        this._glContext.viewport(0, 0, w, h);
    }

    public setClearColor(hex: string) {
        if (hex.length > 7) {
            const a = hexToRgbaArray(hex);
            this._glContext.clearColor(a[0], a[1], a[2], a[3]);
        } else {
            const a = hexToRgbArray(hex);
            this._glContext.clearColor(a[0], a[1], a[2], 1.0);
        }
    }
}
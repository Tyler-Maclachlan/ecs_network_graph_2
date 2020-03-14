import { ECS } from "../ecs/";
import { InputManager } from "../input/InputManager";
import { IRenderer, IVNetGraphOptions } from "../../types";
import { PixiRenderer } from "../renderer";

export default class Engine {
    private _ecs: ECS;
    private _renderer: IRenderer;

    public constructor(options: IVNetGraphOptions) {
        InputManager.initialize();
        this._ecs = new ECS();
        if (options.plugins.renderer) {
            this._renderer = options.plugins.renderer;
        } else {
            this._renderer = new PixiRenderer(options.container);
        }


    }

    public run() {
        requestAnimationFrame(() => {
            this._renderer.render(1);
            this.run();
        })
    }
}
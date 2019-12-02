import { ECS } from "../ecs/";
import { InputManager } from "../input/InputManager";
import { GLContext } from "../renderer/GL";

export default class Engine {
    private _ecs: ECS;
    private _renderer: any;
    private _systems: any;
    private gl: GLContext;

    public constructor() {
        this._ecs = new ECS();
        this._renderer = {};
        this._systems = {};
        InputManager.initialize();
        this.gl = new GLContext('canvas');
        // this.gl.fit();
        this.gl.setSize();
        this.gl.setClearColor('#ffffff');
        this.gl.fClear();
        console.log(this.gl.glContext);
    }
}
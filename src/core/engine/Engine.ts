import { ECS } from "../ecs/";
import { InputManager } from "../input/InputManager";
// import { GLContext } from "../renderer/GL";
// import { Model } from "../renderer/Model";
// import { Primitives } from "../renderer/Primitives";
import { RenderLoop } from "../renderer/RenderLoop";
import { Shader } from "../renderer/Shader";
import { shaderFromDomSrc } from "../utils";
import { Renderer } from "../renderer";

export default class Engine {
    private _ecs: ECS;
    private _renderer: Renderer;
    private _systems: any;

    public constructor() {
        this._ecs = new ECS();
        this._renderer = new Renderer();
        this._systems = {};
        InputManager.initialize();
        // this._renderer.main()
        this._renderer.load('canvas', 5000);


        const rloop = new RenderLoop((dt: number) => {
            this._renderer.render(dt)
        });

        rloop.start();
    }
}

// class TestShader extends Shader {
//     constructor(gl: WebGL2RenderingContext, aryColor: number[]) {
//         var vertSrc = shaderFromDomSrc("vertex_shader"),
//             fragSrc = shaderFromDomSrc("fragment_shader");
//         super('test');
//         this._program = super.load(gl, vertSrc, fragSrc);
//         gl.useProgram(this._program);


//         //Our shader uses custom uniforms 
//         var uColor = gl.getUniformLocation(this._program, "uColor");
//         gl.uniform3fv(uColor, aryColor);

//         gl.useProgram(null); //Done setting up shader
//     }
// }
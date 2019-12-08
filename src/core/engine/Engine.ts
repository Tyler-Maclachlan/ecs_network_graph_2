import { ECS } from "../ecs/";
import { InputManager } from "../input/InputManager";
import { GLContext } from "../renderer/GL";
import { Model } from "../renderer/Model";
import { Primitives } from "../renderer/Primitives";
import { RenderLoop } from "../renderer/RenderLoop";
import { Shader } from "../renderer/Shader";
import { shaderFromDomSrc } from "../utils";

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

        const gShader = new TestShader(this.gl.glContext, [0.8, 0.8, 0.8, 1, 0, 0, 0, 1, 0, 0, 0, 1])
        const gModel = new Model(Primitives.GridAxis(this.gl.glContext));

        const rloop = new RenderLoop(() => {
            this.gl.fClear();
            gShader.use(this.gl.glContext);
            gModel.render(this.gl.glContext);
        })
    }
}

class TestShader extends Shader {
    constructor(gl: WebGL2RenderingContext, aryColor: number[]) {
        var vertSrc = shaderFromDomSrc("vertex_shader"),
            fragSrc = shaderFromDomSrc("fragment_shader");
        super('test');
        this._program = super.load(gl, vertSrc, fragSrc);



        //Our shader uses custom uniforms 
        // var uColor = gl.getUniformLocation(this._program, "uColor");
        // gl.uniform3fv(uColor, aryColor);

        // gl.useProgram(null); //Done setting up shader
    }
}
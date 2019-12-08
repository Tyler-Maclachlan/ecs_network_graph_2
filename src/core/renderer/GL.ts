import { Color, shaderFromDomSrc } from "../utils";
import { Shader } from "./Shader";

const ATTR_POSITION_NAME = "a_position";
const ATTR_POSITION_LOC = 0;
const ATTR_NORMAL_NAME = "a_norm";
const ATTR_NORMAL_LOC = 1;
const ATTR_UV_NAME = "a_uv";
const ATTR_UV_LOC = 2;

enum ShaderType {
    VERTEX_SHADER = WebGL2RenderingContext.VERTEX_SHADER,
    FRAGMENT_SHADER = WebGL2RenderingContext.FRAGMENT_SHADER
}

export class GLContext {
    private _container: HTMLElement;
    private _canvas: HTMLCanvasElement;
    private _glContext: WebGL2RenderingContext;
    private _shaderPrograms: Map<string, Shader> = new Map();

    public constructor(container: string | HTMLElement) {
        if (typeof container === 'string') {
            this._container = document.getElementById(container);
        } else {
            this._container = container;
        }

        if (this._container === undefined) {
            throw new Error(`No container element found`);
        }

        const canvas = document.createElement('canvas');

        this._container.appendChild(canvas);
        this._canvas = canvas;
        this._glContext = this._canvas.getContext('webgl2');

        if (this._glContext === undefined) {
            throw new Error('WebGL2 not supported in this browser');
        }

        const gl = this._glContext;

        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.depthFunc(gl.LEQUAL);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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
        this.setSize(this._container.clientWidth * widthPercent, this._container.clientHeight * heightPercent);
    }

    public setSize(w = 500, h = 500) {
        this._canvas.style.width = w + 'px';
        this._canvas.style.height = h + 'px';
        this._canvas.width = w;
        this._canvas.height = h;

        this._glContext.viewport(0, 0, w, h);
    }

    public setClearColor(hex: string) {
        const c = Color.fromHex(hex);
        this._glContext.clearColor(c.r, c.g, c.b, c.a);
    }

    public fClear() {
        this._glContext.clear(this._glContext.COLOR_BUFFER_BIT | this._glContext.DEPTH_BUFFER_BIT);
    }

    public createShader(name: string, vShaderTxt: string, fShaderTxt: string, doValidate = true, transFeedbackVars: any = null, transFeedbackInterleaved = true) {
        const shader = new Shader(name);
        shader.load(this._glContext, vShaderTxt, fShaderTxt, doValidate, transFeedbackVars, transFeedbackInterleaved)
        this._shaderPrograms.set(name, shader);
        return this._shaderPrograms.get(name);
    }

    public useShader(name: string) {
        this._shaderPrograms.get(name).use(this._glContext);
    }

    // public createArrayBuffer(floatArr: number[], isStatic = true) {
    //     const gl = this._glContext;

    //     const buf = gl.createBuffer();
    //     gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    //     gl.bufferData(gl.ARRAY_BUFFER, floatArr, isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW)
    // }

    public createMeshVAO(name: string, arrInd: number[], arrVerts: number[], arrNorm: number[], arrUV: number[]) {
        const gl = this._glContext;
        const rtn: { [key: string]: any } = {
            drawMode: gl.TRIANGLES,
            vao: gl.createVertexArray(),
            bufVertices: null,
            bufNormals: null,
            bufUV: null,
            bufIndex: null,
            vertexComponentLen: 3,
            vertexCount: 0,
            indexCount: 0
        }

        gl.bindVertexArray(rtn.vao);

        if (arrVerts !== undefined && arrVerts !== null) {
            rtn.bufVertices = gl.createBuffer();
            rtn.vertexCount = arrVerts.length / rtn.vertexComponentLen;

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.bufVertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrVerts), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(ATTR_POSITION_LOC);
            gl.vertexAttribPointer(ATTR_POSITION_LOC, 3, gl.FLOAT, false, 0, 0);
        }

        if (arrNorm !== undefined && arrNorm !== null) {
            rtn.bufNormals = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.bufNormals);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrNorm), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(ATTR_NORMAL_LOC);
            gl.vertexAttribPointer(ATTR_NORMAL_LOC, 3, gl.FLOAT, false, 0, 0);
        }

        if (arrUV !== undefined && arrUV !== null) {
            rtn.bufUV = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.bufUV);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arrUV), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(ATTR_UV_LOC);
            gl.vertexAttribPointer(ATTR_UV_LOC, 2, gl.FLOAT, false, 0, 0);
        }

        if (arrInd !== undefined && arrInd !== null) {
            rtn.bufIndex = gl.createBuffer();
            rtn.indexCount = arrInd.length;

            gl.bindBuffer(gl.ARRAY_BUFFER, rtn.bufIndex);
            gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(arrInd), gl.STATIC_DRAW);
        }

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return rtn;
    }
}
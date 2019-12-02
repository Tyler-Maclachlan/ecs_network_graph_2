import { hexToRgbaArray, hexToRgbArray } from "../utils";

enum ShaderType {
    VERTEX_SHADER = WebGL2RenderingContext.VERTEX_SHADER,
    FRAGMENT_SHADER = WebGL2RenderingContext.FRAGMENT_SHADER
}

export class GLContext {
    private _container: HTMLElement;
    private _canvas: HTMLCanvasElement;
    private _glContext: WebGL2RenderingContext;

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

        const c = this._glContext;

        c.cullFace(c.BACK);
        c.frontFace(c.CCW);
        c.enable(c.DEPTH_TEST);
        c.enable(c.CULL_FACE);
        c.depthFunc(c.LEQUAL);
        c.blendFunc(c.SRC_ALPHA, c.ONE_MINUS_SRC_ALPHA);

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
        if (hex.length > 7) {
            const a = hexToRgbaArray(hex);
            this._glContext.clearColor(a[0], a[1], a[2], a[3]);
        } else {
            const a = hexToRgbArray(hex);
            this._glContext.clearColor(a[0], a[1], a[2], 1.0);
        }
    }

    public fClear() {
        this._glContext.clear(this._glContext.COLOR_BUFFER_BIT | this._glContext.DEPTH_BUFFER_BIT);
    }

    public createShader(vShaderTxt: string, fShaderTxt: string, doValidate = true, transFeedbackVars: any = null, transFeedbackInterleaved = true) {
        const vShader = this.compileShader(vShaderTxt, ShaderType.VERTEX_SHADER);
        if (!vShader) return null;

        const fShader = this.compileShader(fShaderTxt, ShaderType.FRAGMENT_SHADER);
        if (!fShader) return null;

        return this.createShaderProgram(vShader, fShader, doValidate, transFeedbackVars, transFeedbackInterleaved);
    }

    private compileShader(src: string, type: ShaderType) {
        const gl = this._glContext;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Error compiling shader: ${src}`, gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    private createShaderProgram(vShader: WebGLShader, fShader: WebGLShader, doValidate = true, transFeedbackVars: any = null, transFeedbackInterleaved = true) {
        const gl = this._glContext;
        const program = gl.createProgram();

        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);

        if (transFeedbackVars !== null) {
            gl.transformFeedbackVaryings(program, transFeedbackVars,
                ((transFeedbackInterleaved) ? gl.INTERLEAVED_ATTRIBS : gl.SEPARATE_ATTRIBS));
        }

        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(`Error creating shader program`, gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }

        if (doValidate) {
            gl.validateProgram(program);

            if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                console.error('Error validating program', gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
        }

        gl.detachShader(program, vShader);
        gl.detachShader(program, fShader);
        gl.deleteShader(fShader);
        gl.deleteShader(vShader);

        return program;
    }
}
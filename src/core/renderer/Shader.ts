export class Shader {
    private _name: string;
    protected _program: WebGLProgram;
    private _attributes: { [name: string]: number } = {};
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    public constructor(name: string) {
        this._name = name;
    }

    public get name() {
        return this._name;
    }

    public getAttributeLocation(name: string): number {
        if (this._attributes[name] === undefined) {
            throw new Error(`Unable to find attribute ${name} in shader ${this._name}`);
        }

        return this._attributes[name];
    }

    public getUniformLocation(name: string): WebGLUniformLocation {
        if (this._uniforms[name] === undefined) {
            throw new Error(`Unable to find uniform ${name} in shader ${this._name}`);
        }

        return this._uniforms[name];
    }

    public load(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string, doValidate = true, transFeedbackVars: any = null, transFeedbackInterleaved = true) {
        let vs = this.loadShader(gl, vertexSource, gl.VERTEX_SHADER);
        let fs = this.loadShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
        this.createProgram(gl, vs, fs, doValidate, transFeedbackVars, transFeedbackInterleaved);
        this.detectAttributes(gl);
        this.detectUniforms(gl);
        return this._program;
    }

    public use(gl: WebGL2RenderingContext) {
        gl.useProgram(this._program)
    }

    private loadShader(gl: WebGL2RenderingContext, source: string, type: number): WebGLShader {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Error compiling shader: ${source}`, gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    private createProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader, doValidate = true, transFeedbackVars: any = null, transFeedbackInterleaved = true): void {
        const program = gl.createProgram();

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

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

        gl.detachShader(program, vs);
        gl.detachShader(program, fs);
        gl.deleteShader(fs);
        gl.deleteShader(vs);

        this._program = program;
    }

    private detectAttributes(gl: WebGL2RenderingContext) {
        let attrCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);

        for (let i = 0; i < attrCount; ++i) {
            let attribInfo: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);

            if (!attribInfo) break;

            this._attributes[attribInfo.name] = gl.getAttribLocation(this._program, attribInfo.name);
        }
    }

    private detectUniforms(gl: WebGL2RenderingContext) {
        let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);

        for (let i = 0; i < uniformCount; ++i) {
            let info: WebGLActiveInfo = gl.getActiveUniform(this._program, i);

            if (!info) break;

            this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name);
        }
    }
}
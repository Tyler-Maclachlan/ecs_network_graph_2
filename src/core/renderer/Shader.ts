import { ProgramInfo, createProgramInfo, } from 'twgl.js';
import { Debug } from '../utils';

export class Shader {
    private _name: string;
    private _programInfo: ProgramInfo;
    private _attributes: any;
    private _uniforms: any;

    public constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public getAttributeLocation(name: string): number {
        return this._attributes[name];
    }

    private load(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string): void {
        try {
            this._programInfo = createProgramInfo(gl, [vertexSource, fragmentSource]);
        } catch (error) {
            Debug('error', error);
        }
    }

    private detectAttributes(gl: WebGL2RenderingContext) {
        const program = this._programInfo.program
        const attrCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

        for (let i = 0; i < attrCount; i++) {
            const attrInfo: WebGLActiveInfo = gl.getActiveAttrib(program, i);

            if (!attrInfo) break;

            this._attributes[attrInfo.name] = gl.getAttribLocation(program, attrInfo.name);
        }
    }
}
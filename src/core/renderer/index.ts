import * as twgl from 'twgl.js';
import * as chroma from 'chroma-js';
import { m4, primitives, v3 } from 'twgl.js';
import { rand, randElement } from '../utils';
import { Camera } from './Camera';

export class Renderer {
    public gl: WebGLRenderingContext;
    public programInfo: twgl.ProgramInfo;
    public objCount: number = 1;

    // public lightWorldPosition = [1, 8, -30];
    // public lightColor = [1, 1, 1, 1];
    // public camera: m4.Mat4 = m4.identity();
    // public view: m4.Mat4 = m4.identity();
    // public viewProjection: m4.Mat4 = m4.identity();
    // public tex: WebGLTexture;
    public uniforms: any = {
        u_lightWorldPos: [1, 8, -30],
        u_lightColor: [1, 1, 1, 1],
        u_ambient: [0, 0, 0, 1],
        u_specular: [1, 1, 1, 1],
        u_shininess: 50,
        u_specularFactor: 1,
    }

    public camera: Camera;

    // public objects: any[] = [];
    // public drawObjects: any[] = [];

    public bufferInfo: twgl.BufferInfo;
    public vertexArrayInfo: twgl.VertexArrayInfo;
    public arrays: any;

    public load(canvasID: string, objCount: number = 1) {
        const gl = (document.getElementById(canvasID) as HTMLCanvasElement).getContext("webgl2");
        if (!twgl.isWebGL2(gl)) {
            alert("Requires WebGL 2.0 to be enabled"); // eslint-disable-line
            return;
        }
        const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
        this.camera = new Camera(v3.create(), 70, gl.canvas.width / gl.canvas.height, 0.5, 500);

        const numInstances = objCount;
        const instanceWorlds = new Float32Array(numInstances * 16);
        const instanceColors = [];
        const r = 70;
        for (let i = 0; i < numInstances; ++i) {
            const mat = new Float32Array(instanceWorlds.buffer, i * 16 * 4, 16);
            m4.translation([rand(-r, r), rand(-r, r), rand(-r, r)], mat);
            m4.rotateZ(mat, rand(0, Math.PI * 2), mat);
            m4.rotateX(mat, rand(0, Math.PI * 2), mat);
            instanceColors.push(rand(1), rand(1), rand(1));
        }
        const arrays = twgl.primitives.createTruncatedConeVertices(1, 0, 2, 34, 4);
        Object.assign(arrays, {
            instanceWorld: {
                numComponents: 16,
                data: instanceWorlds,
                divisor: 1,
            },
            instanceColor: {
                numComponents: 3,
                data: instanceColors,
                divisor: 1,
            },
        });
        const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
        const vertexArrayInfo = twgl.createVertexArrayInfo(gl, programInfo, bufferInfo);

        const uniforms: any = {
            u_lightWorldPos: [1, 8, -30],
            u_lightColor: [1, 1, 1, 1],
            u_ambient: [0, 0, 0, 1],
            u_specular: [1, 1, 1, 1],
            u_shininess: 50,
            u_specularFactor: 1,
        };

        this.bufferInfo = bufferInfo;
        this.vertexArrayInfo = vertexArrayInfo;
        this.programInfo = programInfo;
        this.gl = gl;
        this.objCount = numInstances;
        this.arrays = arrays;
        this.uniforms = uniforms;
    }

    public render(time: number) {
        time *= 0.001;
        const gl = this.gl;
        const uniforms = this.uniforms;
        const programInfo = this.programInfo;
        const vertexArrayInfo = this.vertexArrayInfo;
        const numInstances = this.objCount;

        twgl.resizeCanvasToDisplaySize((gl.canvas as HTMLCanvasElement));
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const camera = this.camera;

        const fov = 30 * Math.PI / 180;
        const aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
        const zNear = 0.5;
        const zFar = 500;
        const projection = m4.perspective(fov, aspect, zNear, zFar);
        const radius = 2;
        const speed = time * .1;
        const eye = [Math.sin(speed) * radius, Math.sin(speed * .7) * 10, Math.cos(speed) * radius];
        const target = [0, 0, 0];
        const up = [0, 1, 0];

        camera.set(v3.create(Math.sin(speed) * radius, Math.sin(speed * .7) * 10, Math.cos(speed) * radius))
        // const camera = m4.lookAt(eye, target, up);
        // const view = m4.inverse(camera);
        uniforms.u_viewProjection = camera.viewProjection;
        uniforms.u_viewInverse = camera.inverse;

        // do it with drawObjectList (not you'd probably make/update the list outside the render loop
        twgl.drawObjectList(gl, [
            {
                programInfo: programInfo,
                vertexArrayInfo: vertexArrayInfo,
                uniforms: uniforms,
                instanceCount: numInstances,
            },
        ]);
    }
}
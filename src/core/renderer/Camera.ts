import { v3, m4 } from 'twgl.js';

export class Camera {
    private perspective: m4.Mat4
    private position: v3.Vec3;
    private forward: v3.Vec3;
    private up: v3.Vec3;

    public constructor(pos: v3.Vec3, fov: number, aspect: number, zNear: number, zFar: number) {
        this.position = pos;
        this.forward = [0, 0, 1];
        this.up = [0, 1, 0];
        this.perspective = m4.perspective(fov, aspect, zNear, zFar);
    }

    public move(moveBy: v3.Vec3) {
        this.position = v3.add(this.position, moveBy);
    }

    public set(pos: v3.Vec3) {
        this.position = pos;
    }

    public get viewProjection() {
        return m4.multiply(this.perspective, m4.inverse(m4.lookAt(this.position, v3.add(this.position, this.forward), this.up)));
    }

    public get inverse() {
        return m4.lookAt(this.position, v3.add(this.position, this.forward), this.up);
    }
}
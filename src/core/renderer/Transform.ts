import { Vec3, Matrix4 } from "../utils";

export class Transform {
    public position = new Vec3(0, 0, 0);
    public scale = new Vec3(1, 1, 1);
    public rotation = new Vec3(0, 0, 0);

    public matView = Matrix4.identity();
    public matNormal = new Float32Array(9);

    public forward = new Float32Array(4);
    public up = new Float32Array(4);
    public right = new Float32Array(4);

    public updateMatrix() {
        this.matView
    }
}
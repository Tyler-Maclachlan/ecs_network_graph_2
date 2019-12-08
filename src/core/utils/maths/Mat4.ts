import { Vec3 } from "./";

export interface IOrthographicMatrix4Options {
    left: number;
    right: number;
    bottom: number;
    top: number;
    nearClip: number;
    farClip: number;
}

export class Matrix4 {
    private _data: number[] = [];

    private constructor() {
        this._data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    public get data(): number[] {
        return this._data;
    }

    public static identity(): Matrix4 {
        return new Matrix4();
    }

    public static orthographic(options: IOrthographicMatrix4Options): Matrix4 {
        const m = new Matrix4();
        const { left, right, bottom, top, nearClip, farClip } = options;

        const lr = 1.0 / (left - right);
        const bt = 1.0 / (bottom - top);
        const nf = 1.0 / (nearClip - farClip);

        m._data[0] = -2.0 * lr;
        m._data[5] = -2.0 * bt;
        m._data[10] = 2.0 * nf;

        m._data[12] = (left + right) * lr;
        m._data[13] = (top + bottom) * bt;
        m._data[14] = (farClip + nearClip) * nf;

        return m;
    }

    public static perspective(fovy: number, aspect: number, near: number, far: number): Matrix4 {
        const f = 1.0 / Math.tan(fovy / 2);
        const nf = 1 / (near - far);

        const m = new Matrix4();

        m._data[0] = f / aspect;
        m._data[5] = f;
        m._data[10] = (far + near) * nf;
        m._data[11] = -1;
        m._data[14] = (2 * far * near) * nf;

        return m;
    }

    public static translate(position: Vec3): Matrix4 {
        const m = new Matrix4();

        m._data[12] = position.x;
        m._data[13] = position.y;
        m._data[14] = position.z;

        return m;
    }

    public static rotateX(angleInRadians: number): Matrix4 {
        const m = new Matrix4();

        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);

        m._data[5] = c;
        m._data[6] = s;
        m._data[9] = -s;
        m._data[10] = c;

        return m;
    }

    public static rotateY(angleInRadians: number): Matrix4 {
        const m = new Matrix4();

        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);

        m._data[0] = c;
        m._data[2] = -s
        m._data[8] = s;
        m._data[10] = c;

        return m;
    }

    public static rotateZ(angleInRadians: number): Matrix4 {
        const m = new Matrix4();

        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);

        m._data[0] = c;
        m._data[1] = s;
        m._data[4] = -s;
        m._data[5] = c;

        return m;
    }

    public static rotateXYZ(xRadians: number, yRadians: number, zRadians: number): Matrix4 {
        const rx = Matrix4.rotateX(xRadians);
        const ry = Matrix4.rotateY(yRadians);
        const rz = Matrix4.rotateZ(zRadians);

        return Matrix4.multiply(Matrix4.multiply(rz, ry), rx);
    }

    public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        const m = new Matrix4();

        const b00 = b._data[0 * 4 + 0];
        const b01 = b._data[0 * 4 + 1];
        const b02 = b._data[0 * 4 + 2];
        const b03 = b._data[0 * 4 + 3];
        const b10 = b._data[1 * 4 + 0];
        const b11 = b._data[1 * 4 + 1];
        const b12 = b._data[1 * 4 + 2];
        const b13 = b._data[1 * 4 + 3];
        const b20 = b._data[2 * 4 + 0];
        const b21 = b._data[2 * 4 + 1];
        const b22 = b._data[2 * 4 + 2];
        const b23 = b._data[2 * 4 + 3];
        const b30 = b._data[3 * 4 + 0];
        const b31 = b._data[3 * 4 + 1];
        const b32 = b._data[3 * 4 + 2];
        const b33 = b._data[3 * 4 + 3];
        const a00 = a._data[0 * 4 + 0];
        const a01 = a._data[0 * 4 + 1];
        const a02 = a._data[0 * 4 + 2];
        const a03 = a._data[0 * 4 + 3];
        const a10 = a._data[1 * 4 + 0];
        const a11 = a._data[1 * 4 + 1];
        const a12 = a._data[1 * 4 + 2];
        const a13 = a._data[1 * 4 + 3];
        const a20 = a._data[2 * 4 + 0];
        const a21 = a._data[2 * 4 + 1];
        const a22 = a._data[2 * 4 + 2];
        const a23 = a._data[2 * 4 + 3];
        const a30 = a._data[3 * 4 + 0];
        const a31 = a._data[3 * 4 + 1];
        const a32 = a._data[3 * 4 + 2];
        const a33 = a._data[3 * 4 + 3];

        m._data[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        m._data[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        m._data[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        m._data[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        m._data[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        m._data[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        m._data[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        m._data[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        m._data[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        m._data[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        m._data[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        m._data[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        m._data[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        m._data[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        m._data[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        m._data[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return m;
    }

    public static scale(scale: Vec3): Matrix4 {
        const m = new Matrix4;

        m._data[0] = scale.x;
        m._data[5] = scale.y;
        m._data[10] = scale.z;

        return m;
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this._data);
    }

    public copyFrom(m: Matrix4): void {
        for (let i = 0; i < 16; i++) {
            this._data[i] = m._data[i];
        }
    }
}
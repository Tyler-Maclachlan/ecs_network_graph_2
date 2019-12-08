export class Vec3 {

    private _x: number;
    private _y: number;
    private _z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
    }

    public get z(): number {
        return this._z;
    }

    public set z(value: number) {
        this._z = value;
    }

    public static get zero(): Vec3 {
        return new Vec3();
    }

    public static get one(): Vec3 {
        return new Vec3(1, 1, 1);
    }

    public toArray(): number[] {
        return [this._x, this._y, this._z];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }

    public copyFrom(vector: Vec3): void {
        this._x = vector._x;
        this._y = vector._y;
        this._z = vector._z;
    }

    public setFromJson(json: any): void {
        if (json.x !== undefined) {
            this._x = Number(json.x);
        }
        if (json.y !== undefined) {
            this._y = Number(json.y);
        }
        if (json.z !== undefined) {
            this._z = Number(json.z);
        }
    }

    public add(v: Vec3): Vec3 {
        this._x += v._x;
        this._y += v._y;
        this._z += v._z;

        return this;
    }

    public subtract(v: Vec3): Vec3 {
        this._x -= v._x;
        this._y -= v._y;
        this._z -= v._z;

        return this;
    }

    public multiply(v: Vec3): Vec3 {
        this._x *= v._x;
        this._y *= v._y;
        this._z *= v._z;

        return this;
    }

    public divide(v: Vec3): Vec3 {
        this._x /= v._x;
        this._y /= v._y;
        this._z /= v._z;

        return this;
    }
}
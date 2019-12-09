export class Color {

    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;


    public constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    public static fromHex(hex: string) {
        hex = hex.replace('#', '');
        let rgba: number[] = [];
        if (hex.length >= 6) {
            rgba[0] = parseInt(hex.slice(0, 2), 16) / 255.0;
            rgba[1] = parseInt(hex.slice(2, 4), 16) / 255.0;
            rgba[2] = parseInt(hex.slice(4, 6), 16) / 255.0;

            if (hex.length === 8) {
                rgba[3] = parseInt(hex.slice(6, 8), 16) / 255.0;
            } else {
                rgba[3] = 1.0;
            }

            return new Color(rgba[0], rgba[1], rgba[2], rgba[3]);
        } else {
            throw new Error(`Invalid hex string for rgb(a) found: ${hex}`);
        }
    }

    public get r(): number {
        return this._r;
    }

    public set r(value: number) {
        this._r = value;
    }

    public get rFloat(): number {
        return this._r / 255.0
    }

    public get g(): number {
        return this._g;
    }

    public set g(value: number) {
        this._g = value;
    }

    public get gFloat(): number {
        return this._g / 255.0
    }

    public get b(): number {
        return this._b;
    }

    public set b(value: number) {
        this._b = value;
    }

    public get bFloat(): number {
        return this._b / 255.0
    }

    public get a(): number {
        return this._a;
    }

    public set a(value: number) {
        this._a = value;
    }

    public get aFloat(): number {
        return this._a / 255.0
    }

    public toArray(): number[] {
        return [this._r, this._g, this._b, this._a];
    }

    public toFloatArray(): number[] {
        return [this._r / 255.0, this._g / 255.0, this._b / 255.0, this._a / 255.0];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toFloatArray());
    }

    public static white(): Color {
        return new Color(255, 255, 255, 255);
    }

    public static black(): Color {
        return new Color(0, 0, 0, 255);
    }

    public static red(): Color {
        return new Color(255, 0, 0, 255);
    }

    public static green(): Color {
        return new Color(0, 255, 0, 255);
    }

    public static blue(): Color {
        return new Color(0, 0, 255, 255);
    }
}
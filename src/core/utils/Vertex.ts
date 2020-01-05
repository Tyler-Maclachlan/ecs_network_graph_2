import { Vec2 } from './';
import { v3 } from 'twgl.js';

type Vec3 = v3.Vec3;

export class Vertex {
    public position: Vec3 = v3.create();
    public texCoords: Vec2 = Vec2.zero;

    public constructor(x: number = 0, y: number = 0, z: number = 0, tu: number = 0, tv: number = 0) {
        this.position = v3.create(x, y, z);

        this.texCoords.x = tu;
        this.texCoords.y = tv;
    }

    public toArray(): number[] {
        let array: number[] = [];

        array = array.concat(this.position.slice() as number[]);
        array = array.concat(this.texCoords.toArray());

        return array;
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}
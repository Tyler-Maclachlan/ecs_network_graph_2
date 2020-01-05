export * from './maths';
export * from './Vertex';
export * from './Color';
export * from './Shader';
export * from './Debug';

export function rand(min: number, max?: number) {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    return min + Math.random() * (max - min);
}

export function randElement(array: any[]) {
    return array[rand(array.length) | 0];
}
import { Entity } from "./";

export class EntityMap<T> implements IterableIterator<T> {
    private _indices: Array<Entity>;
    private _elements: Array<Option<ArrayElement<T>>>;
    private _iter: number;

    public get length(): number {
        return this._elements.length;
    }

    public get elements(): Array<Option<ArrayElement<T>>> {
        return this._elements;
    }

    public get indices(): Array<Entity> {
        return this._indices;
    }

    constructor() {
        this._indices = [];
        this._elements = [];
        this._iter = 0;
    }

    public has(gi: Entity): boolean {
        const { index, generation } = gi;
        return (
            this._indices[index] && generation === this._indices[index].generation
        );
    }

    public get({ index, generation }: Entity): T {
        const entry = this._elements[index];

        if (!entry) {
            throw Error("Index to null element or out of bounds");
        }

        if (generation !== entry.generation) {
            throw Error("Generation mismatch");
        }

        return entry.value;
    }

    public set(gi: Entity, value: T): void {
        const { index, generation } = gi;

        this._indices[index] = gi;
        this._elements[index] = { generation, value };
    }

    public delete(gi: Entity): void {
        const { index } = gi;

        this._indices.splice(index, 1);
        this._elements[index] = undefined;
    }

    public clear(): void {
        this._indices = [];
        this._elements = [];
        this._iter = 0;
    }

    public next(): IteratorResult<T> {
        let entry: Option<ArrayElement<T>>;

        while (!entry && this._iter < this._elements.length) {
            entry = this._elements[this._iter++];
        }

        if (!entry) {
            this._iter = 0;
            return ({
                done: true,
                value: null
            } as any) as IteratorResult<T>;
        }

        return {
            done: false,
            value: entry.value
        };
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this;
    }
}

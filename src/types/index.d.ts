import { Entity, ECS } from "../core/ecs";

type Option<T> = T | undefined | null;
type Newable<T> = { new(...args: any[]): T };

type VAlign = 'top' | 'middle' | 'bottom';
type HAlign = 'left' | 'middle' | 'right';

type Vec2 = {
    x: number,
    y: number
}

type TShape = 'image' | 'square' | 'circle' | 'rectangle';

interface ArrayElement<T> {
    value: T;
    generation: number;
}

interface System {
    active: boolean;
    update(dt?: number): void;
    onRegister(ecs: ECS): void;
}

interface Time {
    startTime: Date;
    endTime: Date;
}

interface IRenderer {
    render(dt: number): void;
}

interface INode {
    id: string;
    data?: {
        [key: string]: any;
    };
    classes?: string[];
    position?: {
        x: number;
        y: number;
    };
    shape?: TShape;
    fixed?: boolean | {
        x: boolean;
        y: boolean;
    };
    parent?: INode;
    children?: INode[];
}

interface IEdge {
    id: string;
    source: string;
    target: string;
    data?: {
        [key: string]: any
    };
    classes?: string[];
}

interface IVNetGraphOptions {
    container: HTMLElement;
    data: {
        nodes: INode[];
        edges: IEdge[];
    };
    styles: {
        [key: string]: any;
    };
    layout?: {
        name: string;
        options: {
            [key: string]: any;
        };
    };
    interaction: {
        zoom: boolean | {
            enabled: boolean;
            minZoom: number;
            maxZoom: number;
        };

    };
    plugins: {
        layouts?: [];
        renderer?: IRenderer;
    },

}

interface VNetGraph {

}
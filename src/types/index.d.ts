type Option<T> = T | undefined | null;
type Newable<T> = { new(...args: any[]): T };

type VAlign = 'top' | 'middle' | 'bottom';
type HAlign = 'left' | 'middle' | 'right';

type Vec2 = {
    x: number,
    y: number
}

interface ArrayElement<T> {
    value: T;
    generation: number;
}

interface System {
    active: boolean;
    update(dt?: number): void;
}

interface Time {
    startTime: Date;
    endTime: Date;
}
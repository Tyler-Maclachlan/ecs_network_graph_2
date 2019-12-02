import { BaseComponent } from "./";
import { Vec2 } from "../utils";

export class PhysicsComponent extends BaseComponent {
    public velocity: Vec2;
    public acceleration: Vec2;
    public force: Vec2;
    public fixed: boolean;
}
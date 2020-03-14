import { BaseComponent } from "./";
import { Vec2 } from "../utils";

export class TransformComponent extends BaseComponent {
    public scale: Vec2;
    public rotation: Vec2;
    public position: Vec2;
}
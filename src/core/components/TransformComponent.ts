import { BaseComponent } from "./";
import { v3 } from "twgl.js";

export class TransformComponent extends BaseComponent {
    public scale: v3.Vec3;
    public rotation: v3.Vec3;
    public position: v3.Vec3;
}
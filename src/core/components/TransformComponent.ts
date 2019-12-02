import { BaseComponent } from "./";
import { Vec3 } from "../utils";

export class TransformComponent extends BaseComponent {
    public scale: Vec3;
    public rotation: Vec3;
    public position: Vec3;
}
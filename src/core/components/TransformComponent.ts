import BaseComponent from "./BaseComponent";
import { Vec3 } from "../utils";

export default class TransformComponent extends BaseComponent {
    public scale: Vec3;
    public rotation: Vec3;
    public position: Vec3;
}
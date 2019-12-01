import BaseComponent from "./BaseComponent";
import { Vec2 } from "../utils";

export default class PhysicsComponent extends BaseComponent {
    public velocity: Vec2;
    public acceleration: Vec2;
    public force: Vec2;
    public fixed: boolean;
}
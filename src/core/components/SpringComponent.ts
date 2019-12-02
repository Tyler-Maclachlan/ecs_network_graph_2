import { BaseComponent } from "./";
import { Entity } from "../ecs/";

export class SpringComponent extends BaseComponent {
    public from: Entity;
    public to: Entity;
}
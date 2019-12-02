import { BaseComponent } from "./";
import { Entity } from "../ecs/";

export class ClusteredComponent extends BaseComponent {
    public cluster: Entity;
}
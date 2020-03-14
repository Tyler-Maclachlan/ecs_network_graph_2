import { BaseComponent } from "./";
import { Entity } from "../ecs/";

export class ClusterComponent extends BaseComponent {
    public children: Entity[];
}
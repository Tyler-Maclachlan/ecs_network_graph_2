import BaseComponent from "./BaseComponent";
import Entity from "../ecs/Entity";

export default class ClusteredComponent extends BaseComponent {
    public cluster: Entity;
}
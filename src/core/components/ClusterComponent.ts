import BaseComponent from "./BaseComponent";
import Entity from "../ecs/Entity";

export default class ClusterComponent extends BaseComponent {
    public inCluster: Entity[];
}
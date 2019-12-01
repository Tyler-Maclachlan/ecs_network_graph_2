import BaseComponent from "./BaseComponent";
import Entity from "../ecs/Entity";

export default class SpringComponent extends BaseComponent {
    from: Entity;
    to: Entity;
}
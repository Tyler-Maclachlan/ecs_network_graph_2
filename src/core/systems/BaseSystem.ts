import { System } from "../../types";
import { ECS } from "../ecs";

export default class BaseSystem implements System {
    public active = true;

    public update(dt?: number) { }

    public onRegister(ecs: ECS) {

    }
}
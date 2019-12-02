import EntityManager from "../ecs/EntityManager";
import { InputManager } from "../input/InputManager";

export default class Engine {
    private _entityManager: EntityManager;
    private _renderer: any;
    private _systems: any;

    public constructor() {
        this._entityManager = new EntityManager();
        this._renderer = {};
        this._systems = {};
        InputManager.initialize();
    }
}
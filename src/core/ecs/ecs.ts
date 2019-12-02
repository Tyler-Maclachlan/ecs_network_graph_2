import { Entity, EntityManager } from "./";
import { BaseComponent } from "../components";

export class ECS {
    private _entityManager: EntityManager;
    private _systems: System[];
    private _queryCache: Map<string, any>;

    public constructor() {
        this._entityManager = new EntityManager();
        this._systems = [];
        this._queryCache = new Map();
    }

    public createEntity() {
        return this._entityManager.createEntity();
    }

    public removeEntity(e: Entity) {
        this._entityManager.deleteEntity(e);
    }

    public queryEntities(components: Newable<BaseComponent>[]) {
        return this._entityManager.getEntitiesWithComponents(components);
    }
}
import Entity from './Entity';
import EntityAllocator from './EntityAllocator';
import EntityMap from './EntityMap';
import BaseComponent from '../components/BaseComponent';

export default class EntityManager {
    private _allocator: EntityAllocator;
    private _entities: Entity[];
    private _componentStores: Map<string, EntityMap<BaseComponent>>;

    public constructor() {
        this._allocator = new EntityAllocator();
        this._entities = [];
        this._componentStores = new Map<string, EntityMap<BaseComponent>>();
    }

    public get entities(): Entity[] {
        return this._entities;
    }

    public addComponent<T extends BaseComponent>(entity: Entity, component: T) {
        const componentName = component.constructor.name;

        let store = this._componentStores.get(componentName);

        if (store === undefined) {
            store = new EntityMap<T>();
            this._componentStores.set(componentName, store);
        }

        store.set(entity, component);

        return component;
    }

    public removeComponent<T extends BaseComponent>(entity: Entity, component: Newable<T>) {
        const store = this._componentStores.get(component.name);

        if (store && store.has(entity)) {
            store.delete(entity);
            return true;
        }

        return false;
    }

    public getComponent<T extends BaseComponent>(entity: Entity, component: Newable<T>) {
        const store = this._componentStores.get(component.name);

        if (!store) {
            throw new Error(`No entities with attached component: ${component.name}`);
        }

        const instance = store.get(entity) as T;

        if (!instance) {
            throw new Error(`Entity ${JSON.stringify(entity)} does not have component: ${component.name}`);
        }

        return instance;
    }

    public getComponentsOfType<T extends BaseComponent>(component: Newable<T>): ArrayElement<T>[] {
        const store = this._componentStores.get(component.name) as EntityMap<T>;

        if (store === undefined) {
            return [];
        }

        return store.elements;
    }

    public deleteEntity(entity: Entity) {
        if (this._allocator.deallocate(entity)) {
            this._componentStores.forEach(store => {
                if (store.has(entity)) {
                    store.delete(entity);
                }
            });
        }
    }

    public getEntitiesWithComponent<T extends BaseComponent>(component: Newable<T>): Array<Entity> {
        const store = this._componentStores.get(component.name);

        if (store === undefined) {
            throw new Error(`No entities have been assigned component: ${component.name}`);
        }

        return store.indices;
    }

    public getEntitiesWithComponents(components: [Newable<BaseComponent>]): Array<Entity> {
        const componentNames = components.map(c => c.name);
        let entities = this._entities;

        for (const componentName in componentNames) {
            const store = this._componentStores.get(componentName);

            if (store === undefined) {
                throw new Error(`No entities have been assigned component: ${componentName}`);
            }

            entities = entities.filter(entity => store.has(entity));
        }

        return entities;
    }
}
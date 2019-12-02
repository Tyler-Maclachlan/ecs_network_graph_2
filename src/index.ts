import Engine from "./core/engine/Engine";

export const VNetwork = new Engine();

if (window && !(window as any).VNetwork) {
    (window as any).VNetwork = VNetwork;
}
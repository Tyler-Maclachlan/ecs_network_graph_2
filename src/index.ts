import Engine from "./core/engine/Engine";

let network: any;

window.addEventListener('load', () => {
    network = new Engine();
});
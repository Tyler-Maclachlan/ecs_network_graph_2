import Engine from "./core/engine/Engine";

window.addEventListener('load', () => {
    const network = new Engine({
        container: document.getElementById('canvas')!,
        data: {
            nodes: [],
            edges: []
        },
        interaction: {
            zoom: true
        },
        plugins: {
            layouts: null,
            renderer: null
        },
        styles: {},
    });

    network.run();
});
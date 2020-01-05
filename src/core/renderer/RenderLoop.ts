export class RenderLoop {
    public isActive = false;

    private _msLastFrame = 0;
    private _callback: any;
    private _fps = 0;
    private _msFpsLimit = 0;

    public constructor(callback: any, fps = 0) {
        this._callback = callback;
        if (fps > 0) {
            this._msFpsLimit = 1000 / fps;
        }
    }

    public start() {
        this.isActive = true;
        this._msLastFrame = performance.now();
        window.requestAnimationFrame(this.run.bind(this));
    }

    public stop() {
        this.isActive = false;
    }

    private run() {
        const msCurrent = performance.now();
        const msDelta = msCurrent - this._msLastFrame;
        const deltaTime = msDelta / 1000.0;

        if (msDelta > this._msFpsLimit) {
            this._fps = Math.floor(1 / deltaTime);
            this._msLastFrame = msCurrent;
            this._callback(msCurrent);
        }

        if (this.isActive) window.requestAnimationFrame(this.run.bind(this));
    }
}
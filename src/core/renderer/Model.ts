export class Model {
    public mesh: any;

    public constructor(meshData: any) {
        this.mesh = meshData;
    }

    public preRender() {
        // TODO:
    }

    public render(gl: WebGL2RenderingContext) {
        gl.bindVertexArray(this.mesh.vao);

        if (this.mesh.indexCount) {
            gl.drawElements(this.mesh.drawMode, this.mesh.indexLength, gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawArrays(this.mesh.drawMode, 0, this.mesh.vertexCount);
        }

        gl.bindVertexArray(null);
    }
}
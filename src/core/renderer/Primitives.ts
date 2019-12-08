const ATTR_POSITION_NAME = "a_position";
const ATTR_POSITION_LOC = 0;
const ATTR_NORMAL_NAME = "a_norm";
const ATTR_NORMAL_LOC = 1;
const ATTR_UV_NAME = "a_uv";
const ATTR_UV_LOC = 2;

export class Primitives {
    public static GridAxis(gl: WebGL2RenderingContext) {
        let verts: number[] = [];
        let size = 1.8;
        let div = 10.0;
        let step = size / div;
        let half = size / 2;

        let p: number;

        for (let i = 0; i <= div; i++) {
            p = -half + (i * step);
            verts.push(p);
            verts.push(half);
            verts.push(0);
            verts.push(0);

            verts.push(p);
            verts.push(-half);
            verts.push(0);
            verts.push(1);

            p = half - (i * step);
            verts.push(-half);
            verts.push(p);
            verts.push(0);
            verts.push(0);

            verts.push(half);
            verts.push(p);
            verts.push(0);
            verts.push(1);
        }

        let attrColorLoc = 4;
        let strideLen: number;
        let mesh = {
            drawMode: gl.LINES,
            vao: gl.createVertexArray(),
            vertexComponentLen: 4,
            vertexCount: verts.length / 4,
            bufVertices: gl.createBuffer()
        };
        strideLen = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentLen;

        gl.bindVertexArray(mesh.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(ATTR_POSITION_LOC);
        gl.enableVertexAttribArray(attrColorLoc);

        gl.vertexAttribPointer(
            ATTR_POSITION_LOC						//Attribute Location
            , 3										//How big is the vector by number count
            , gl.FLOAT 								//What type of number we passing in
            , false									//Does it need to be normalized?
            , strideLen								//How big is a vertex chunk of data.
            , 0										//Offset by how much
        );

        gl.vertexAttribPointer(
            attrColorLoc							//new shader has "in float a_color" as the second attrib
            , 1										//This atttrib is just a single float
            , gl.FLOAT
            , false
            , strideLen								//Each vertex chunk is 4 floats long
            , Float32Array.BYTES_PER_ELEMENT * 3		//skip first 3 floats in our vertex chunk, its like str.substr(3,1) in theory.
        );

        //Cleanup and Finalize
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return mesh;
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Canvas3D;
var fiber_1 = require("@react-three/fiber");
var drei_1 = require("@react-three/drei");
var PaintableObject_1 = require("./PaintableObject");
function Canvas3D() {
    return (<div className="canvas-container">
      <fiber_1.Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
        <PaintableObject_1.default />
        <drei_1.OrbitControls enableDamping dampingFactor={0.1}/>
        <drei_1.Environment preset="night"/>
        <drei_1.Stars radius={300} count={1200}/>
      </fiber_1.Canvas>
    </div>);
}

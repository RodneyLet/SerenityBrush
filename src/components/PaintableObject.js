"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaintableObject;
var react_1 = require("react");
var fiber_1 = require("@react-three/fiber");
function PaintableObject() {
    var pointsRef = (0, react_1.useRef)([]);
    var isDragging = (0, react_1.useRef)(false);
    var lastPoint = (0, react_1.useRef)(null);
    var scene = (0, fiber_1.useThree)().scene;
    var playSound = function () {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 700 + Math.random() * 500;
            gain.gain.value = 0.2;
            osc.connect(gain).connect(ctx.destination);
            osc.start();
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.stop(ctx.currentTime + 0.22);
        }
        catch (_) { }
    };
    var addPoint = function (point) {
        pointsRef.current.push({ pos: point });
        playSound();
    };
    // Pointer handlers (simplified for brevity)
    var handleDown = function (e) { isDragging.current = true; addPoint(e.point); };
    var handleMove = function (e) {
        if (!isDragging.current)
            return;
        var curr = e.point;
        if (lastPoint.current)
            addPoint(curr);
        lastPoint.current = curr;
    };
    var handleUp = function () { isDragging.current = false; lastPoint.current = null; };
    return (<group>
      <mesh onPointerDown={handleDown} onPointerMove={handleMove} onPointerUp={handleUp} onPointerLeave={handleUp}>
        <sphereGeometry args={[2.2, 72, 72]}/>
        <meshStandardMaterial color="#eeeeee" metalness={0.2} roughness={0.4}/>
      </mesh>

      {pointsRef.current.map(function (p, i) { return (<mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.085]}/>
          <meshStandardMaterial color="#ff6b6b" emissive="#ff3366" emissiveIntensity={0.2}/>
        </mesh>); })}
    </group>);
}

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface PaintPoint {
  position: THREE.Vector3;
  color: string;
  size: number;
}

function PaintableSphere({ color, size, onPaint }: { 
  color: string; 
  size: number; 
  onPaint: (p: PaintPoint) => void;
}) {
  const { camera } = useThree();

  const handlePointerMove = (e: any) => {
    if (e.buttons === 1) { // left mouse down
      e.stopPropagation();
      onPaint({
        position: e.point.clone(),
        color,
        size
      });
    }
  };

  return (
    <mesh onPointerMove={handlePointerMove} onPointerDown={handlePointerMove}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial color="#eeeeee" metalness={0.2} roughness={0.4} />
    </mesh>
  );
}

function App() {
  const [points, setPoints] = useState<PaintPoint[]>([]);
  const [currentColor, setCurrentColor] = useState('#ff3366');
  const [brushSize, setBrushSize] = useState(0.12);

  const addPoint = (p: PaintPoint) => {
    setPoints(prev => [...prev, p]);
  };

  const undo = () => setPoints(prev => prev.slice(0, -1));
  const clear = () => setPoints([]);

  const savePainting = () => {
    console.log('Painting saved with', points.length, 'strokes');
    // TODO: export as image or JSON
    alert('Painting saved! (check console)');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        
        <PaintableSphere color={currentColor} size={brushSize} onPaint={addPoint} />
        
        {points.map((p, i) => (
          <mesh key={i} position={p.position}>
            <sphereGeometry args={[p.size]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.5} />
          </mesh>
        ))}

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <Stars radius={300} depth={60} count={800} factor={7} fade />
      </Canvas>

      {/* UI Controls */}
      <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '8px', color: 'white' }}>
        <h3>SerenityBrush</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Color: </label>
          <input 
            type="color" 
            value={currentColor} 
            onChange={(e) => setCurrentColor(e.target.value)} 
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Brush Size: {brushSize.toFixed(2)}</label>
          <input 
            type="range" 
            min="0.05" 
            max="0.4" 
            step="0.01" 
            value={brushSize} 
            onChange={(e) => setBrushSize(parseFloat(e.target.value))} 
          />
        </div>

        <div>
          <button onClick={undo} style={{ marginRight: '8px' }}>Undo</button>
          <button onClick={clear} style={{ marginRight: '8px' }}>Clear</button>
          <button onClick={savePainting}>Save Painting</button>
        </div>
      </div>
    </div>
  );
}

export default App;
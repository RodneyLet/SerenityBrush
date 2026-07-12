import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars } from '@react-three/drei';
import PaintableObject from './PaintableObject';

export default function Canvas3D() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
        <PaintableObject />
        <OrbitControls enableDamping dampingFactor={0.1} />
        <Environment preset="night" />
        <Stars radius={300} count={1200} />
      </Canvas>
    </div>
  );
}
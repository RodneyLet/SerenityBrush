import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PaintableObject() {
  const pointsRef = useRef<any[]>([]);
  const isDragging = useRef(false);
  const lastPoint = useRef<THREE.Vector3 | null>(null);

  const { scene } = useThree();

  const playSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 700 + Math.random() * 500;
      gain.gain.value = 0.2;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.22);
    } catch (_) {}
  };

  const addPoint = (point: THREE.Vector3) => {
    pointsRef.current.push({ pos: point });
    playSound();
  };

  // Pointer handlers (simplified for brevity)
  const handleDown = (e: any) => { isDragging.current = true; addPoint(e.point); };
  const handleMove = (e: any) => {
    if (!isDragging.current) return;
    const curr = e.point;
    if (lastPoint.current) addPoint(curr);
    lastPoint.current = curr;
  };
  const handleUp = () => { isDragging.current = false; lastPoint.current = null; };

  return (
    <group>
      <mesh onPointerDown={handleDown} onPointerMove={handleMove} onPointerUp={handleUp} onPointerLeave={handleUp}>
        <sphereGeometry args={[2.2, 72, 72]} />
        <meshStandardMaterial color="#eeeeee" metalness={0.2} roughness={0.4} />
      </mesh>

      {pointsRef.current.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.085]} />
          <meshStandardMaterial color="#ff6b6b" emissive="#ff3366" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}
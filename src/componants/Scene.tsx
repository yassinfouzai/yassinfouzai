import { Canvas } from '@react-three/fiber';

function Scene() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}

export default Scene;

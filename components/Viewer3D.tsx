'use client'

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Item, Cabinet } from '@/lib/types';
import CabinetWireframe from './3d/CabinetWireframe';
import ItemBox from './3d/ItemBox';

type Viewer3DProps = {
  items: Item[];
  cabinet: Cabinet;
};

export default function Viewer3D({ items, cabinet }: Viewer3DProps) {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 bg-white/90 p-3 rounded shadow-md text-sm z-10">
        <h3 className="font-bold mb-1">3D Preview</h3>
        <p className="text-xs text-gray-600">Drag to rotate • Scroll to zoom</p>
      </div>
      <Canvas
        camera={{
          position: [30, 25, 30],
          fov: 50,
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, 10, -5]} intensity={0.5} />

        {/* Cabinet */}
        <CabinetWireframe dimensions={cabinet.innerDimensions} />

        {/* Items */}
        {items.map(item => (
          <ItemBox
            key={item.id}
            item={item}
            cabinetDimensions={cabinet.innerDimensions}
          />
        ))}

        {/* Grid helper */}
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#374151"
          fadeDistance={100}
          fadeStrength={1}
          followCamera={false}
        />

        {/* Axes helper for debugging (optional) */}
        <axesHelper args={[10]} />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
        />
      </Canvas>
    </div>
  );
}

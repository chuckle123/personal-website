'use client'

import { Dimensions } from '@/lib/types';
import { Box } from '@react-three/drei';

type CabinetWireframeProps = {
  dimensions: Dimensions;
};

export default function CabinetWireframe({ dimensions }: CabinetWireframeProps) {
  // Position the cabinet centered at origin
  // The cabinet's origin is at (0, 0, 0) which is the bottom-front-left corner
  // We offset it so it's centered for better viewing
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const centerZ = dimensions.depth / 2;

  return (
    <group position={[-centerX, 0, -centerZ]}>
      <Box
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        position={[centerX, centerY, centerZ]}
      >
        <meshBasicMaterial color="#666666" wireframe />
      </Box>

      {/* Ground plane for reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[centerX, 0, centerZ]}>
        <planeGeometry args={[dimensions.width, dimensions.depth]} />
        <meshBasicMaterial color="#888888" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

'use client'

import { Item, Dimensions } from '@/lib/types';
import { Box } from '@react-three/drei';

type ItemBoxProps = {
  item: Item;
  cabinetDimensions: Dimensions;
};

export default function ItemBox({ item, cabinetDimensions }: ItemBoxProps) {
  // Calculate position
  // Cabinet is centered, so we need to offset items accordingly
  const centerX = cabinetDimensions.width / 2;
  const centerZ = cabinetDimensions.depth / 2;

  // Item position relative to cabinet origin (bottom-front-left corner)
  // Then offset by cabinet center
  const x = item.position.x + item.dimensions.width / 2 - centerX;
  const y = item.position.y + item.dimensions.height / 2;
  const z = item.position.z + item.dimensions.depth / 2 - centerZ;

  return (
    <Box
      args={[item.dimensions.width, item.dimensions.height, item.dimensions.depth]}
      position={[x, y, z]}
    >
      <meshStandardMaterial color={item.color} />
    </Box>
  );
}

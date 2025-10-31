import { Item, Cabinet } from './types';

/**
 * Check if two 3D bounding boxes (AABB) overlap
 */
export function checkItemCollision(item1: Item, item2: Item): boolean {
  // Calculate bounds for item1
  const item1MinX = item1.position.x;
  const item1MaxX = item1.position.x + item1.dimensions.width;
  const item1MinY = item1.position.y;
  const item1MaxY = item1.position.y + item1.dimensions.height;
  const item1MinZ = item1.position.z;
  const item1MaxZ = item1.position.z + item1.dimensions.depth;

  // Calculate bounds for item2
  const item2MinX = item2.position.x;
  const item2MaxX = item2.position.x + item2.dimensions.width;
  const item2MinY = item2.position.y;
  const item2MaxY = item2.position.y + item2.dimensions.height;
  const item2MinZ = item2.position.z;
  const item2MaxZ = item2.position.z + item2.dimensions.depth;

  // Check for overlap on all three axes
  const overlapX = item1MinX < item2MaxX && item1MaxX > item2MinX;
  const overlapY = item1MinY < item2MaxY && item1MaxY > item2MinY;
  const overlapZ = item1MinZ < item2MaxZ && item1MaxZ > item2MinZ;

  return overlapX && overlapY && overlapZ;
}

/**
 * Check if an item is outside the cabinet bounds
 */
export function checkCabinetBounds(item: Item, cabinet: Cabinet): boolean {
  const { innerDimensions } = cabinet;

  // Check if item extends beyond cabinet boundaries
  const exceedsMinX = item.position.x < 0;
  const exceedsMaxX = item.position.x + item.dimensions.width > innerDimensions.width;
  const exceedsMinY = item.position.y < 0;
  const exceedsMaxY = item.position.y + item.dimensions.height > innerDimensions.height;
  const exceedsMinZ = item.position.z < 0;
  const exceedsMaxZ = item.position.z + item.dimensions.depth > innerDimensions.depth;

  return exceedsMinX || exceedsMaxX || exceedsMinY || exceedsMaxY || exceedsMinZ || exceedsMaxZ;
}

/**
 * Get all items that have collisions (either with other items or cabinet bounds)
 */
export function getCollidingItems(items: Item[], cabinet: Cabinet): Set<string> {
  const collidingIds = new Set<string>();

  items.forEach((item, index) => {
    // Check cabinet bounds
    if (checkCabinetBounds(item, cabinet)) {
      collidingIds.add(item.id);
    }

    // Check collisions with other items
    items.forEach((otherItem, otherIndex) => {
      if (index !== otherIndex && checkItemCollision(item, otherItem)) {
        collidingIds.add(item.id);
        collidingIds.add(otherItem.id);
      }
    });
  });

  return collidingIds;
}

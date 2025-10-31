import { Cabinet } from './types';

/**
 * Calculate scale factor to fit cabinet dimensions to canvas size
 * Returns pixels per inch
 */
export function calculateScale(
  cabinetWidth: number,
  cabinetDepth: number,
  canvasWidth: number,
  canvasHeight: number,
  padding: number = 40
): number {
  const availableWidth = canvasWidth - padding * 2;
  const availableHeight = canvasHeight - padding * 2;

  const scaleX = availableWidth / cabinetWidth;
  const scaleY = availableHeight / cabinetDepth;

  // Use the smaller scale to ensure cabinet fits in both dimensions
  return Math.min(scaleX, scaleY);
}

/**
 * Convert inches to pixels using scale factor
 */
export function inchesToPixels(inches: number, scale: number): number {
  return inches * scale;
}

/**
 * Convert pixels to inches using scale factor
 */
export function pixelsToInches(pixels: number, scale: number): number {
  return pixels / scale;
}

/**
 * Calculate cabinet inner dimensions from outer dimensions and wall thickness
 */
export function calculateInnerDimensions(
  outerWidth: number,
  outerHeight: number,
  outerDepth: number,
  wallThickness: number
) {
  return {
    width: outerWidth - wallThickness * 2,
    height: outerHeight - wallThickness * 2,
    depth: outerDepth - wallThickness * 2,
  };
}

/**
 * Generate a unique ID for items
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

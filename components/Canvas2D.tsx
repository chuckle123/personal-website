'use client'

import { useEffect, useRef, useState } from 'react';
import { Item, Cabinet, Position } from '@/lib/types';
import { calculateScale, inchesToPixels, pixelsToInches, clamp } from '@/lib/utils';
import { getCollidingItems } from '@/lib/collision';

type Canvas2DProps = {
  items: Item[];
  cabinet: Cabinet;
  selectedItemId: string | null;
  onSelectItem: (itemId: string | null) => void;
  onUpdateItem: (itemId: string, updates: Partial<Item>) => void;
};

export default function Canvas2D({
  items,
  cabinet,
  selectedItemId,
  onSelectItem,
  onUpdateItem,
}: Canvas2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    itemId: string | null;
    startMouseX: number;
    startMouseY: number;
    startItemX: number;
    startItemZ: number;
  }>({
    isDragging: false,
    itemId: null,
    startMouseX: 0,
    startMouseY: 0,
    startItemX: 0,
    startItemZ: 0,
  });

  // Calculate scale and offsets
  const padding = 40;
  const scale = calculateScale(
    cabinet.innerDimensions.width,
    cabinet.innerDimensions.depth,
    canvasSize.width,
    canvasSize.height,
    padding
  );
  const offsetX = padding;
  const offsetY = padding;

  // Get colliding items
  const collidingItemIds = getCollidingItems(items, cabinet);

  // Handle canvas resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw grid
    drawGrid(ctx);

    // Draw cabinet outline
    drawCabinet(ctx);

    // Draw items
    items.forEach(item => {
      const isSelected = item.id === selectedItemId;
      const isColliding = collidingItemIds.has(item.id);
      drawItem(ctx, item, isSelected, isColliding);
    });
  }, [items, cabinet, selectedItemId, canvasSize, scale, collidingItemIds]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    const gridSpacing = 1; // 1 inch grid
    const cabinetWidth = cabinet.innerDimensions.width;
    const cabinetDepth = cabinet.innerDimensions.depth;

    // Vertical lines
    for (let x = 0; x <= cabinetWidth; x += gridSpacing) {
      const px = offsetX + inchesToPixels(x, scale);
      const py1 = offsetY;
      const py2 = offsetY + inchesToPixels(cabinetDepth, scale);

      ctx.beginPath();
      ctx.moveTo(px, py1);
      ctx.lineTo(px, py2);
      ctx.stroke();
    }

    // Horizontal lines
    for (let z = 0; z <= cabinetDepth; z += gridSpacing) {
      const py = offsetY + inchesToPixels(z, scale);
      const px1 = offsetX;
      const px2 = offsetX + inchesToPixels(cabinetWidth, scale);

      ctx.beginPath();
      ctx.moveTo(px1, py);
      ctx.lineTo(px2, py);
      ctx.stroke();
    }
  };

  const drawCabinet = (ctx: CanvasRenderingContext2D) => {
    const width = inchesToPixels(cabinet.innerDimensions.width, scale);
    const depth = inchesToPixels(cabinet.innerDimensions.depth, scale);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(offsetX, offsetY, width, depth);

    // Add label
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Cabinet Top View', offsetX, offsetY - 10);
  };

  const drawItem = (
    ctx: CanvasRenderingContext2D,
    item: Item,
    isSelected: boolean,
    isColliding: boolean
  ) => {
    const x = offsetX + inchesToPixels(item.position.x, scale);
    const z = offsetY + inchesToPixels(item.position.z, scale);
    const w = inchesToPixels(item.dimensions.width, scale);
    const d = inchesToPixels(item.dimensions.depth, scale);

    // Fill with item color
    ctx.fillStyle = item.color;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(x, z, w, d);
    ctx.globalAlpha = 1.0;

    // Border
    if (isColliding) {
      ctx.strokeStyle = '#dc2626'; // Red for collision
      ctx.lineWidth = 3;
    } else if (isSelected) {
      ctx.strokeStyle = '#3b82f6'; // Blue for selected
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
    }
    ctx.strokeRect(x, z, w, d);

    // Item name
    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(item.name, x + w / 2, z + d / 2 - 5);

    // Dimensions
    ctx.font = '10px Arial';
    ctx.fillText(
      `${item.dimensions.width}" × ${item.dimensions.depth}"`,
      x + w / 2,
      z + d / 2 + 8
    );

    // Height indicator
    ctx.font = '9px Arial';
    ctx.fillStyle = '#555';
    ctx.fillText(`Y: ${item.position.y.toFixed(1)}"`, x + w / 2, z + d / 2 + 20);
  };

  const getItemAtPosition = (mouseX: number, mouseY: number): Item | null => {
    // Check items in reverse order (top to bottom in render order)
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const x = offsetX + inchesToPixels(item.position.x, scale);
      const z = offsetY + inchesToPixels(item.position.z, scale);
      const w = inchesToPixels(item.dimensions.width, scale);
      const d = inchesToPixels(item.dimensions.depth, scale);

      if (mouseX >= x && mouseX <= x + w && mouseY >= z && mouseY <= z + d) {
        return item;
      }
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedItem = getItemAtPosition(mouseX, mouseY);

    if (clickedItem) {
      onSelectItem(clickedItem.id);
      setDragState({
        isDragging: true,
        itemId: clickedItem.id,
        startMouseX: mouseX,
        startMouseY: mouseY,
        startItemX: clickedItem.position.x,
        startItemZ: clickedItem.position.z,
      });
    } else {
      onSelectItem(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragState.isDragging || !dragState.itemId) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const deltaX = mouseX - dragState.startMouseX;
    const deltaY = mouseY - dragState.startMouseY;

    const deltaInchesX = pixelsToInches(deltaX, scale);
    const deltaInchesZ = pixelsToInches(deltaY, scale);

    const item = items.find(i => i.id === dragState.itemId);
    if (!item) return;

    const newX = dragState.startItemX + deltaInchesX;
    const newZ = dragState.startItemZ + deltaInchesZ;

    // Clamp to cabinet bounds
    const clampedX = clamp(
      newX,
      0,
      cabinet.innerDimensions.width - item.dimensions.width
    );
    const clampedZ = clamp(
      newZ,
      0,
      cabinet.innerDimensions.depth - item.dimensions.depth
    );

    onUpdateItem(dragState.itemId, {
      position: {
        x: clampedX,
        y: item.position.y,
        z: clampedZ,
      },
    });
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      itemId: null,
      startMouseX: 0,
      startMouseY: 0,
      startItemX: 0,
      startItemZ: 0,
    });
  };

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <div className="absolute top-4 left-4 bg-white/90 p-3 rounded shadow-md text-sm">
        <h3 className="font-bold mb-1">2D Top-Down View (X-Z Plane)</h3>
        <p className="text-xs text-gray-600">Click and drag items to position them</p>
        <p className="text-xs text-gray-600">Red border = collision detected</p>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-pointer"
      />
    </div>
  );
}

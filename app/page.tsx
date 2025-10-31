'use client'

import { useState } from 'react';
import { Item, Cabinet } from '@/lib/types';
import { calculateInnerDimensions } from '@/lib/utils';
import ItemLibrary from '@/components/ItemLibrary';
import Canvas2D from '@/components/Canvas2D';
import PropertiesPanel from '@/components/PropertiesPanel';
import Viewer3D from '@/components/Viewer3D';

export default function Home() {
  // Cabinet configuration with provided dimensions
  const [cabinet] = useState<Cabinet>({
    outerDimensions: { width: 18, height: 30, depth: 30 },
    wallThickness: 0.75,
    innerDimensions: calculateInnerDimensions(18, 30, 30, 0.75),
  });

  // Items placed in the cabinet
  const [items, setItems] = useState<Item[]>([]);

  // Currently selected item ID
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Get selected item
  const selectedItem = items.find(item => item.id === selectedItemId) || null;

  // Add a new item to the cabinet
  const handleAddItem = (newItem: Item) => {
    setItems(prev => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  // Update an existing item
  const handleUpdateItem = (itemId: string, updates: Partial<Item>) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  };

  // Remove an item
  const handleRemoveItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Cabinet Designer</h1>
        <p className="text-sm text-gray-300">
          Cabinet: {cabinet.innerDimensions.width}" × {cabinet.innerDimensions.height}" × {cabinet.innerDimensions.depth}" (W×H×D)
        </p>
      </header>

      {/* Main Content Area - 3 Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Item Library */}
        <aside className="w-[200px] bg-white border-r border-gray-300 overflow-y-auto">
          <ItemLibrary
            onAddItem={handleAddItem}
            cabinet={cabinet}
          />
        </aside>

        {/* Center Panel - 2D Top-Down View */}
        <main className="flex-1 bg-gray-50 overflow-hidden">
          <Canvas2D
            items={items}
            cabinet={cabinet}
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
            onUpdateItem={handleUpdateItem}
          />
        </main>

        {/* Right Sidebar - Properties Panel */}
        <aside className="w-[250px] bg-white border-l border-gray-300 overflow-y-auto">
          <PropertiesPanel
            selectedItem={selectedItem}
            cabinet={cabinet}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
            onClearSelection={() => setSelectedItemId(null)}
          />
        </aside>
      </div>

      {/* Bottom Panel - 3D Preview */}
      <div className="h-[400px] border-t border-gray-300 bg-black">
        <Viewer3D items={items} cabinet={cabinet} />
      </div>
    </div>
  );
}

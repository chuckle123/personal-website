import { Item, Cabinet } from '@/lib/types';
import { clamp } from '@/lib/utils';

type PropertiesPanelProps = {
  selectedItem: Item | null;
  cabinet: Cabinet;
  onUpdateItem: (itemId: string, updates: Partial<Item>) => void;
  onRemoveItem: (itemId: string) => void;
  onClearSelection: () => void;
};

export default function PropertiesPanel({
  selectedItem,
  cabinet,
  onUpdateItem,
  onRemoveItem,
  onClearSelection,
}: PropertiesPanelProps) {
  if (!selectedItem) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Properties</h2>
        <p className="text-sm text-gray-500">No item selected</p>
        <p className="text-xs text-gray-400 mt-2">
          Click an item in the 2D view to select it
        </p>
      </div>
    );
  }

  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const newPosition = { ...selectedItem.position };

    switch (axis) {
      case 'x':
        newPosition.x = clamp(
          value,
          0,
          cabinet.innerDimensions.width - selectedItem.dimensions.width
        );
        break;
      case 'y':
        newPosition.y = clamp(
          value,
          0,
          cabinet.innerDimensions.height - selectedItem.dimensions.height
        );
        break;
      case 'z':
        newPosition.z = clamp(
          value,
          0,
          cabinet.innerDimensions.depth - selectedItem.dimensions.depth
        );
        break;
    }

    onUpdateItem(selectedItem.id, { position: newPosition });
  };

  const handleDimensionChange = (axis: 'width' | 'height' | 'depth', value: number) => {
    // Ensure minimum dimension of 0.1 inches
    const clampedValue = Math.max(0.1, value);

    const newDimensions = { ...selectedItem.dimensions };
    newDimensions[axis] = clampedValue;

    // Adjust position if new dimensions would push item outside cabinet
    const newPosition = { ...selectedItem.position };

    if (axis === 'width') {
      const maxX = cabinet.innerDimensions.width - clampedValue;
      newPosition.x = clamp(newPosition.x, 0, Math.max(0, maxX));
    } else if (axis === 'height') {
      const maxY = cabinet.innerDimensions.height - clampedValue;
      newPosition.y = clamp(newPosition.y, 0, Math.max(0, maxY));
    } else if (axis === 'depth') {
      const maxZ = cabinet.innerDimensions.depth - clampedValue;
      newPosition.z = clamp(newPosition.z, 0, Math.max(0, maxZ));
    }

    onUpdateItem(selectedItem.id, {
      dimensions: newDimensions,
      position: newPosition
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Properties</h2>
        <button
          onClick={onClearSelection}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Clear
        </button>
      </div>

      {/* Item Info */}
      <div className="mb-6">
        <div
          className="w-full h-12 rounded mb-3"
          style={{ backgroundColor: selectedItem.color }}
        />
        <h3 className="font-bold text-gray-800 mb-1">{selectedItem.name}</h3>
        <p className="text-xs text-gray-500">ID: {selectedItem.id.slice(0, 8)}...</p>
      </div>

      {/* Dimensions (Editable) */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Dimensions</h4>

        {/* Width */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Width
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              max={cabinet.innerDimensions.width}
              step="0.1"
              value={selectedItem.dimensions.width.toFixed(1)}
              onChange={e => handleDimensionChange('width', parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 w-8">in</span>
          </div>
        </div>

        {/* Height */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Height
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              max={cabinet.innerDimensions.height}
              step="0.1"
              value={selectedItem.dimensions.height.toFixed(1)}
              onChange={e => handleDimensionChange('height', parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 w-8">in</span>
          </div>
        </div>

        {/* Depth */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Depth
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.1"
              max={cabinet.innerDimensions.depth}
              step="0.1"
              value={selectedItem.dimensions.depth.toFixed(1)}
              onChange={e => handleDimensionChange('depth', parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 w-8">in</span>
          </div>
        </div>
      </div>

      {/* Position Controls */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Position</h4>

        {/* X Position */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            X Position (Horizontal)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max={cabinet.innerDimensions.width - selectedItem.dimensions.width}
              step="0.1"
              value={selectedItem.position.x.toFixed(1)}
              onChange={e => handlePositionChange('x', parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 w-8">in</span>
          </div>
        </div>

        {/* Y Position (Height) - Slider */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Y Position (Height Above Floor)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={cabinet.innerDimensions.height - selectedItem.dimensions.height}
              step="0.5"
              value={selectedItem.position.y}
              onChange={e => handlePositionChange('y', parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs font-semibold text-gray-700 w-12 text-right">
              {selectedItem.position.y.toFixed(1)}"
            </span>
          </div>
        </div>

        {/* Z Position */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Z Position (Depth)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max={cabinet.innerDimensions.depth - selectedItem.dimensions.depth}
              step="0.1"
              value={selectedItem.position.z.toFixed(1)}
              onChange={e => handlePositionChange('z', parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-xs text-gray-500 w-8">in</span>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => {
          onRemoveItem(selectedItem.id);
          onClearSelection();
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        Remove Item
      </button>
    </div>
  );
}

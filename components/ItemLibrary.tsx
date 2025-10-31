import { Item, Cabinet, ItemType } from '@/lib/types';
import { ITEM_TEMPLATES } from '@/lib/items';
import { generateId } from '@/lib/utils';

type ItemLibraryProps = {
  onAddItem: (item: Item) => void;
  cabinet: Cabinet;
};

export default function ItemLibrary({ onAddItem, cabinet }: ItemLibraryProps) {
  const handleAddItem = (type: ItemType) => {
    const template = ITEM_TEMPLATES[type];
    const { innerDimensions } = cabinet;

    // Center the item in the cabinet (X-Z plane), on the floor (Y=0)
    const centerX = (innerDimensions.width - template.dimensions.width) / 2;
    const centerZ = (innerDimensions.depth - template.dimensions.depth) / 2;

    const newItem: Item = {
      id: generateId(),
      type,
      name: template.name,
      position: {
        x: Math.max(0, centerX),
        y: 0, // On the floor
        z: Math.max(0, centerZ),
      },
      dimensions: template.dimensions,
      color: template.color,
    };

    onAddItem(newItem);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Item Library</h2>
      <div className="space-y-3">
        {(Object.keys(ITEM_TEMPLATES) as ItemType[]).map(type => {
          const template = ITEM_TEMPLATES[type];
          return (
            <div
              key={type}
              className="border border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div
                className="w-8 h-8 rounded mb-2"
                style={{ backgroundColor: template.color }}
              />
              <h3 className="font-semibold text-sm text-gray-800 mb-1">
                {template.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {template.dimensions.width}" × {template.dimensions.height}" × {template.dimensions.depth}"
              </p>
              <p className="text-xs text-gray-500 mb-3">W × H × D</p>
              <button
                onClick={() => handleAddItem(type)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
              >
                Add to Cabinet
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

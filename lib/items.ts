import { ItemType, ItemTemplate } from './types';

export const ITEM_TEMPLATES: Record<ItemType, ItemTemplate> = {
  'cutting-board': {
    name: 'Cutting Board',
    dimensions: { width: 15, height: 20, depth: 2 },
    color: '#8B4513' // Brown
  },
  'water-filter': {
    name: 'Water Filter',
    dimensions: { width: 10, height: 14, depth: 10 },
    color: '#4169E1' // Blue
  },
  'coffee-machine': {
    name: 'Coffee Machine',
    dimensions: { width: 14, height: 16, depth: 12 },
    color: '#2F4F4F' // Dark slate gray
  },
  'kettle': {
    name: 'Kettle',
    dimensions: { width: 8, height: 10, depth: 8 },
    color: '#DC143C' // Crimson
  }
};

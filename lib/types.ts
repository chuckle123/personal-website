export type ItemType = 'cutting-board' | 'water-filter' | 'coffee-machine' | 'kettle';

export type Dimensions = {
  width: number;   // X axis (left-right) in inches
  height: number;  // Y axis (up-down) in inches
  depth: number;   // Z axis (front-back) in inches
};

export type Position = {
  x: number;  // Horizontal position in inches (left-right)
  y: number;  // Vertical position in inches (height above floor)
  z: number;  // Depth position in inches (front-back)
};

export type Item = {
  id: string;
  type: ItemType;
  name: string;
  position: Position;
  dimensions: Dimensions;
  color: string;
};

export type Cabinet = {
  outerDimensions: Dimensions;
  wallThickness: number;
  innerDimensions: Dimensions;
};

export type ItemTemplate = {
  name: string;
  dimensions: Dimensions;
  color: string;
};

# Cabinet Design Tool

A Next.js web application for designing wooden cabinets with 2D drag-and-drop positioning and 3D visualization.

## Features

- **2D Top-Down View**: Primary interaction area for positioning items
  - Drag and drop items to reposition them
  - Real-time collision detection with red borders
  - Grid overlay for precise positioning
  - Visual feedback for selected items

- **3D Preview**: Read-only 3D visualization
  - Orbit controls for viewing from any angle
  - Real-time updates as items are moved in 2D view
  - Wireframe cabinet outline
  - Solid colored item representations

- **Item Library**: Pre-configured items ready to add
  - Cutting Board (15" × 20" × 2")
  - Water Filter (10" × 14" × 10")
  - Coffee Machine (14" × 16" × 12")
  - Kettle (8" × 10" × 8")

- **Properties Panel**: Precise control over item positioning
  - X Position: Horizontal placement (number input)
  - Y Position: Height above floor (range slider)
  - Z Position: Depth placement (number input)
  - Remove items functionality

## Cabinet Specifications

- **Outer Dimensions**: 18" W × 30" H × 30" D
- **Wall Thickness**: 0.75"
- **Inner Dimensions**: 16.5" W × 28.5" H × 28.5" D

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Three Fiber** - 3D rendering
- **@react-three/drei** - 3D helpers and controls

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

1. **Adding Items**
   - Click "Add to Cabinet" in the Item Library (left sidebar)
   - Items spawn at the center of the cabinet

2. **Positioning Items (2D View)**
   - Click and drag items in the 2D top-down view
   - Items automatically stay within cabinet bounds
   - Red borders indicate collisions with other items or walls

3. **Fine-Tuning Position (Properties Panel)**
   - Click an item to select it
   - Use number inputs for precise X/Z positioning
   - Use the slider for Y position (height)
   - View item dimensions (read-only)

4. **3D Visualization**
   - Drag to rotate the view
   - Scroll to zoom in/out
   - Pan by holding right-click and dragging
   - Automatically updates when items move

5. **Removing Items**
   - Select an item
   - Click "Remove Item" in the Properties Panel

## Project Structure

```
cabinet-app/
├── app/
│   ├── page.tsx           # Main application with state management
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ItemLibrary.tsx    # Left sidebar - available items
│   ├── Canvas2D.tsx       # Center panel - drag & drop canvas
│   ├── PropertiesPanel.tsx # Right sidebar - item properties
│   ├── Viewer3D.tsx       # Bottom panel - 3D visualization
│   └── 3d/
│       ├── CabinetWireframe.tsx  # 3D cabinet outline
│       └── ItemBox.tsx           # 3D item representation
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   ├── items.ts           # Item templates and configurations
│   ├── collision.ts       # Collision detection logic
│   └── utils.ts           # Utility functions
└── next.config.js         # Next.js configuration
```

## Key Implementation Details

### Coordinate System

- **2D Canvas**: X-Z plane (top-down view)
  - X axis: Left to right (width)
  - Z axis: Front to back (depth)

- **3D View**: Standard 3D coordinates
  - X axis: Left to right (width)
  - Y axis: Bottom to top (height)
  - Z axis: Front to back (depth)

### Collision Detection

Uses Axis-Aligned Bounding Box (AABB) collision detection:
- Item-to-item collisions
- Item-to-cabinet boundary collisions
- Real-time detection during drag operations

### State Management

Simple React useState hooks:
- `items`: Array of placed items with positions and dimensions
- `selectedItemId`: Currently selected item for editing
- `cabinet`: Cabinet configuration (dimensions, wall thickness)

## Success Criteria

✅ Click "Add" buttons to place items in the cabinet
✅ Drag items around in the 2D top-down view
✅ Adjust item height with a slider
✅ See collision detection (red borders) in real-time
✅ Select items and edit exact X/Y/Z positions
✅ View the design in 3D with orbit controls
✅ Remove items from the cabinet

## Browser Compatibility

- Modern browsers with WebGL support required for 3D visualization
- Tested on Chrome, Firefox, Safari, and Edge

## License

MIT

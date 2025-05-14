# Drift Phase Visualizer Integration

## Overview

The Drift Phase Visualizer is a React-based UI component that provides a dynamic, interactive visualization of CodexNodes and their relationships within the WisdomNET Template Drafter system. It serves as an intelligence map for monitoring recursive activity, inspecting CodexNode relationships, and triggering actions via UI interactions.

## Features

- **Symbolic Visualization**: Nodes displayed as glyphs with color-coding based on drift phase
- **Relationship Mapping**: Visual representation of lineage, symbolic links, and pattern connections
- **Interactive Interface**: Node hover for metadata, click for detailed information and actions
- **Deep Learning Integration**: Visualizes pattern connections identified by the neural pattern detector
- **Live Updates**: Real-time monitoring of changes in the CodexNode ecosystem

## Architecture

The visualization system consists of several interconnected components:

### Component Structure

- **DriftVisualizer.jsx**: Core React component using react-d3-graph
- **App.jsx**: Main application integrating the visualizer with routing
- **API Integration**: Connects to CodexNode API for data retrieval and actions

### Integration Points

1. **Deep Learning Pattern Recognition**
   - Visualizes pattern connections detected by NeuralPatternDetector
   - Line thickness indicates pattern similarity strength
   - Color-coding differentiates pattern types

2. **CodexNode API**
   - Fetches node data with `/api/codex_nodes/list` endpoint
   - Performs actions through API endpoints (fork, invoke)
   - Updates visualization based on node changes

3. **Template Drafter System**
   - Provides an interface for the entire Template Drafter system
   - Enables monitoring of drift phases across all nodes
   - Visualizes the recursive agent activity

## Implementation Details

### Graph Visualization

The visualization uses D3.js through the react-d3-graph library to create an interactive, force-directed graph:

- Nodes represent CodexNodes with emoji-based glyphs
- Edges represent different types of relationships (lineage, symbolic, pattern matches)
- Force layout creates natural clustering based on relationships
- Interactive features allow exploration of complex relationships

### Symbolic Mapping

The visualizer maps symbolic representations to visual elements:

- Glyphs are mapped to emojis for visual representation (⬡→🌀, ◯→💠, etc.)
- Drift phases are mapped to colors (emergence→blue, resonance→orange, etc.)
- Relationship types are distinguished by line styles and colors

### User Interactions

The component supports several user interactions:

- **Node Hover**: Displays basic node information
- **Node Click**: Shows detailed node information
- **Action Buttons**: Trigger operations like View JSON, Edit, Fork, and Invoke
- **Live Updates**: Manual refresh or automatic polling for changes

## Deployment

To use the Drift Phase Visualizer:

1. Ensure React dependencies are installed (`npm install`)
2. Start the React development server (`npm start`)
3. Ensure the CodexNode API is running on port 8000 (or update proxy in package.json)
4. Access the visualizer through the "/visualizer" route

## Future Extensions

Planned enhancements to the visualization system:

- **Ghost Agent Trails**: Visualizing the paths of recursive agent invocations
- **Drift Metrics Overlay**: Adding visual indicators for overall drift and semantic density
- **Template Evolution Playback**: Time-based visualization of template evolution
- **Interactive Editing**: Direct manipulation of node properties through the visualization
- **Collaborative Visualization**: Multi-user viewing and editing capabilities

## API Reference

The visualizer interacts with the following API endpoints:

- `GET /api/codex_nodes/list` - Retrieve all CodexNodes
- `GET /api/codex_nodes/{id}/view` - Get detailed view of a specific node
- `POST /api/codex_nodes/{id}/fork` - Create a fork of a node
- `POST /api/codex_nodes/{id}/invoke` - Invoke a node (trigger associated action) 
/**
 * DriftVisualizer.jsx
 * 
 * README:
 * -------
 * This component visualizes CodexNodes and their relationships as an interactive graph.
 * It serves as the primary visual interface for monitoring, inspecting, and interacting
 * with the CodexNode ecosystem within the WisdomNET Template Drafter.
 * 
 * System Integration:
 * - Provides a UI layer on top of the CodexNode API
 * - Visualizes the results of deep learning pattern detection
 * - Displays the relationships and lineage between templates
 * - Supports interactive manipulation of CodexNodes (invocation, forking)
 * - Shows drift phases and status changes in real-time
 * 
 * @version 1.0.0
 * @date 2025-05-13
 */

// =============================================================================
// SCRIPT VERSION CONTROL
// =============================================================================
// ACTIVE VERSION: 1.0.0
// VERSION HISTORY: See bottom of file
// =============================================================================

import React, { useEffect, useState, useCallback } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";

// Import styles
import "./styles/DriftVisualizer.css";

/**
 * Drift Phase Visualizer Component
 * 
 * A symbolic UI module that displays the state, lineage, glyphs,
 * and drift phases of CodexNodes.
 * 
 * Provides a dynamic intelligence map for monitoring recursive
 * activity across Ghost Agents, inspecting CodexNode relationships,
 * and triggering symbolic operations.
 */

// Symbolic glyph mapping to emoji for visual representation
const glyphToEmoji = {
  "⬡": "🌀", // Spiral drift
  "◯": "💠", // Entropy / Invocation
  "◉": "🔆", // Stabilizer
  "⬣": "🧩", // Complex structure
  "⟠": "🔐", // Ghost/Agent marker
  "∴": "🗂️"  // Organization
};

// Drift phase mapping to colors
const driftColors = {
  "emergence": "#61dafb", // Light blue
  "resonance": "#ff9933", // Orange
  "drift": "#9966cc",     // Purple
  "lock": "#66cc66",      // Green
  "sealed": "#999999",    // Gray
  "unknown": "#ffffff"    // White
};

/**
 * DriftVisualizer Component
 * 
 * A React component that provides a visual representation of CodexNodes
 * and their relationships using D3 graph visualization.
 * 
 * @param {Array} initialNodes - Initial nodes to display (optional)
 * @param {boolean} liveUpdate - Whether to poll for updates
 * @param {function} onNodeSelect - Callback for node selection
 */
const DriftVisualizer = ({ initialNodes = [], liveUpdate = false, onNodeSelect }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Process raw CodexNode data into graph-compatible format
   */
  const processNodes = useCallback((nodes) => {
    const processed = { nodes: [], links: [] };
    
    nodes.forEach((n) => {
      processed.nodes.push({
        id: n.true_name,
        label: `${glyphToEmoji[n.glyphs?.[0] || "⬡"]} ${n.structure?.title || "Untitled"}`,
        color: driftColor(n.drift_phase),
        symbolType: "circle",
        size: 600,
        _rawData: n // Store raw data for detailed view
      });

      // Add lineage connections
      if (n.ghost_of) {
        processed.links.push({ 
          source: n.ghost_of, 
          target: n.true_name,
          color: "rgba(100, 100, 255, 0.6)",
          type: "CURVE_SMOOTH"
        });
      }

      // Add relationship connections
      (n.relationships || []).forEach(rel => {
        processed.links.push({ 
          source: n.true_name, 
          target: rel,
          color: "rgba(255, 100, 100, 0.4)",
          type: "STRAIGHT"
        });
      });
      
      // Add connections based on deep learning pattern detection
      (n.pattern_matches || []).forEach(match => {
        processed.links.push({
          source: n.true_name,
          target: match.node_id,
          color: "rgba(100, 255, 100, 0.3)", 
          type: "CURVE_SMOOTH",
          strokeWidth: Math.min(5, match.similarity * 5) // Line thickness based on similarity
        });
      });
    });
    
    return processed;
  }, []);

  /**
   * Get color based on drift phase
   */
  const driftColor = (phase) => {
    switch (phase) {
      case "emergence": return "#4FC3F7"; // light blue
      case "resonance": return "#FFA726"; // orange
      case "drift": return "#9575CD";     // purple
      case "lock": return "#66BB6A";      // green
      case "sealed": return "#BDBDBD";    // gray
      default: return "#FFFFFF";          // white
    }
  };

  /**
   * Fetch nodes from API
   */
  const fetchNodes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/codex_nodes/list?include_patterns=true');
      if (response.data && response.data.nodes) {
        setGraphData(processNodes(response.data.nodes));
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching nodes:", err);
      setError("Failed to fetch nodes");
    } finally {
      setIsLoading(false);
    }
  }, [processNodes]);

  /**
   * Initialize graph data
   */
  useEffect(() => {
    if (initialNodes && initialNodes.length > 0) {
      setGraphData(processNodes(initialNodes));
    } else if (liveUpdate) {
      fetchNodes();
    }
  }, [initialNodes, liveUpdate, processNodes, fetchNodes]);

  /**
   * Set up polling for updates if liveUpdate is enabled
   */
  useEffect(() => {
    let interval;
    if (liveUpdate) {
      interval = setInterval(fetchNodes, 30000); // Poll every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [liveUpdate, fetchNodes]);

  /**
   * Handle node click
   */
  const onClickNode = (nodeId) => {
    const node = graphData.nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node._rawData);
      if (onNodeSelect) {
        onNodeSelect(node._rawData);
      }
    }
  };

  /**
   * D3 graph configuration
   */
  const config = {
    nodeHighlightBehavior: true,
    directed: true,
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 1
    },
    node: {
      color: "lightgray",
      size: 300,
      highlightStrokeColor: "blue",
      fontSize: 12,
      fontWeight: "bold",
      highlightFontSize: 14,
      highlightFontWeight: "bold",
      symbolType: "circle",
      renderLabel: true,
      labelPosition: "bottom",
      labelProperty: "label"
    },
    link: {
      highlightColor: "lightblue",
      semanticStrokeWidth: true,
      strokeWidth: 1.5,
      type: "CURVE_SMOOTH"
    }
  };

  return (
    <div className="drift-visualizer-container">
      <div className="drift-visualizer-header">
        <h2>CodexNode Drift Visualizer</h2>
        {liveUpdate && (
          <button onClick={fetchNodes} disabled={isLoading}>
            {isLoading ? "Updating..." : "Refresh"}
          </button>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="graph-container" style={{ height: "70vh", border: "1px solid #ddd" }}>
        {graphData.nodes.length > 0 ? (
          <Graph
            id="codex-graph"
            data={graphData}
            config={config}
            onClickNode={onClickNode}
          />
        ) : (
          <div className="no-data-message">
            {isLoading ? "Loading graph data..." : "No CodexNodes available for visualization"}
          </div>
        )}
      </div>
      
      {selectedNode && (
        <div className="node-details-panel">
          <h3>{selectedNode.structure?.title || "Untitled Node"}</h3>
          <p><strong>True Name:</strong> {selectedNode.true_name}</p>
          <p><strong>Drift Phase:</strong> {selectedNode.drift_phase}</p>
          <p><strong>Glyphs:</strong> {selectedNode.glyphs?.join(" ") || "None"}</p>
          
          <div className="action-buttons">
            <button onClick={() => window.open(`/api/codex_nodes/${selectedNode.true_name}/view`, '_blank')}>
              View JSON
            </button>
            <button onClick={() => window.location.href = `/editor/${selectedNode.true_name}`}>
              Edit
            </button>
            <button onClick={async () => {
              try {
                await axios.post(`/api/codex_nodes/${selectedNode.true_name}/fork`);
                fetchNodes(); // Refresh after forking
              } catch (err) {
                setError("Failed to fork node");
              }
            }}>
              Fork
            </button>
            <button onClick={async () => {
              try {
                await axios.post(`/api/codex_nodes/${selectedNode.true_name}/invoke`);
                fetchNodes(); // Refresh after invocation
              } catch (err) {
                setError("Failed to invoke node");
              }
            }}>
              Invoke
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriftVisualizer;

// =============================================================================
// VERSION HISTORY
// =============================================================================
/**
 * VERSION: 1.0.0
 * DATE: 2025-05-13
 * AUTHOR: System Developer
 * CHANGES:
 * - Initial implementation with graph visualization
 * - Node interaction with detailed view panel
 * - Integration with CodexNode API
 * - Deep learning pattern connections visualization
 */

/* 
// Keep this older version for reference if needed in the future
// VERSION: 0.9.0
// DATE: 2025-05-12
// AUTHOR: System Developer
// NOTES: This was a prototype version without API integration

const DriftVisualizer_v0_9_0 = ({ nodes = [] }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  
  useEffect(() => {
    // Basic processing without API integration
    const processed = { nodes: [], links: [] };
    nodes.forEach((n) => {
      processed.nodes.push({
        id: n.true_name,
        label: n.structure?.title || "Untitled",
        color: n.drift_phase === "lock" ? "green" : 
               n.drift_phase === "drift" ? "purple" : "lightblue"
      });
      
      if (n.ghost_of) {
        processed.links.push({ 
          source: n.ghost_of, 
          target: n.true_name
        });
      }
    });
    setGraphData(processed);
  }, [nodes]);
  
  return (
    <div>
      <h2>CodexNode Prototype Visualizer</h2>
      <div style={{ height: "500px", border: "1px solid #ddd" }}>
        <Graph
          id="prototype-graph"
          data={graphData}
          config={{
            nodeHighlightBehavior: true,
            node: {
              color: "lightgray",
              size: 300,
              highlightStrokeColor: "blue"
            }
          }}
        />
      </div>
    </div>
  );
};
*/ 
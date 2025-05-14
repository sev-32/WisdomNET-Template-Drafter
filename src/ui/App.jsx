import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import DriftVisualizer from './components/DriftVisualizer';

/**
 * Main application component for the Drift Phase Visualizer
 * 
 * Provides API integration to fetch CodexNodes and display them
 * in the DriftVisualizer component.
 */
const App = () => {
  const [codexNodes, setCodexNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch CodexNodes on component mount
  useEffect(() => {
    const fetchNodes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/codex_nodes/list');
        if (response.data && response.data.nodes) {
          setCodexNodes(response.data.nodes);
        }
      } catch (error) {
        console.error('Error fetching CodexNodes:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNodes();
  }, []);

  // Handle node click
  const handleNodeClick = (node) => {
    console.log('Node clicked:', node);
    // Additional logic for node actions
  };
  
  // Handle node hover
  const handleNodeHover = (node) => {
    if (node) {
      console.log('Node hover:', node.true_name);
    }
  };

  return (
    <Router>
      <div className="wisdomnet-app">
        <header className="app-header">
          <h1>WisdomNET Template Drafter</h1>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/visualizer">Drift Visualizer</Link></li>
              <li><Link to="/editor">Template Editor</Link></li>
              <li><Link to="/patterns">Pattern Explorer</Link></li>
            </ul>
          </nav>
        </header>
        
        <main className="app-content">
          <Switch>
            <Route exact path="/">
              <div className="dashboard">
                <h2>System Dashboard</h2>
                {isLoading ? (
                  <p>Loading dashboard...</p>
                ) : error ? (
                  <div className="error">Error: {error}</div>
                ) : (
                  <div className="stats-grid">
                    <div className="stat-card">
                      <h3>Active Templates</h3>
                      <p className="stat-number">{codexNodes.length}</p>
                    </div>
                    <div className="stat-card">
                      <h3>Recent Activity</h3>
                      {/* Recent activity content */}
                    </div>
                    <div className="stat-card">
                      <h3>System Status</h3>
                      <p className="status-indicator online">Online</p>
                    </div>
                  </div>
                )}
              </div>
            </Route>
            
            <Route path="/visualizer">
              <div className="visualizer-page">
                <h2>CodexNode Drift Visualizer</h2>
                <DriftVisualizer 
                  initialNodes={codexNodes}
                  liveUpdate={true}
                  onNodeSelect={(node) => console.log('Selected node:', node)}
                />
              </div>
            </Route>
            
            <Route path="/editor/:nodeId?">
              {/* Template Editor component */}
            </Route>
            
            <Route path="/patterns">
              {/* Pattern Explorer component */}
            </Route>
          </Switch>
        </main>
        
        <footer className="app-footer">
          <p>WisdomNET Template Drafter &copy; 2025</p>
        </footer>
      </div>
    </Router>
  );
};

export default App; 
# WisdomNET Template Drafter

A recursive, editable, and expandable metastructure for designing CodexNodes and all related entities within the LOG.OS framework.

## Overview

The Template Drafter serves as the "codex that writes the codex" - a template of template builders that allows for the iterative evolution of structures for symbolic memory, invocation, drift, lineage, logging, and agent contracts.

This system enables the collaborative development of the LOG.OS template layer through:

- **Idea capture**: Store unstructured symbolic ideas with agent attribution
- **Conceptual clustering**: Group related ideas into semantic clusters
- **Proto-field synthesis**: Generate structured fields from idea clusters
- **Structural evolution**: Track the changes of template components over time
- **Feedback reinforcement**: Record the effectiveness of evolving template structures
- **Deep learning integration**: Enhance pattern recognition and drift prediction through neural networks
- **Interactive visualization**: Monitor and manipulate CodexNodes through a dynamic graph interface

## Components

The Template Drafter consists of several interrelated components:

1. **Core Libraries**
   - Template validation and processing
   - Symbolic signature extraction
   - Drift operators and comparators
   - Ghost binding and invocation mechanisms

2. **Services and APIs**
   - CodexNode API for validation, enrichment, and export
   - Echo Logger for drift and resonance tracking
   - Ghost Agent API for recursive operations
   - Pattern Recognition services for structure mapping

3. **Deep Learning Integration**
   - Neural template encoding for vector embeddings
   - Pattern detection across templates
   - Drift prediction for forecasting evolution
   - Embedding visualization for exploring relationships

4. **User Interfaces**
   - Command Line Interface (CLI) for system operations
   - Web-based template editor and validator
   - Drift Phase Visualizer for exploring relationships
   - Embedding visualization for pattern analysis

## Installation

```bash
# Clone the repository
git clone https://github.com/[YOUR-USERNAME]/WisdomNET-Template-Drafter.git
cd WisdomNET-Template-Drafter

# Install Python dependencies
pip install -r requirements.txt

# Install UI dependencies
npm install
```

## Usage

### Basic Usage

```bash
# Start the CodexNode API service
python src/services/codex_api.py

# Launch the web interface
npm start

# Process templates through CLI
python deep_learning_cli.py encode --template-path templates/example.json
```

### Visualization

The Template Drafter includes a powerful visualization component:

```bash
# Access the visualization interface
npm start
# Then navigate to http://localhost:3000/visualizer
```

## Documentation

- [Deep Learning Integration](docs/DEEP_LEARNING_INTEGRATION.md)
- [Script Versioning System](docs/script_versioning_guide.md)
- [Visualization Integration](docs/VISUALIZATION_INTEGRATION.md)

## Development

The Template Drafter follows a neural-symbolic approach, combining the interpretability of symbolic systems with the pattern recognition capabilities of neural networks.

### Script Versioning System

For robust development, we use an in-script versioning system that:
- Maintains multiple implementation versions within files
- Provides easy rollback capabilities
- Documents changes with timestamps and explanations
- Enables safe experimentation with new implementations

## Project Structure

```
WisdomNET-Template-Drafter/
├── docs/                 # Documentation files
│   ├── DEEP_LEARNING_INTEGRATION.md
│   ├── VISUALIZATION_INTEGRATION.md
│   ├── script_versioning_guide.md
│   └── design_specs/     # Additional specifications
├── src/                  # Source code
│   ├── core/             # Core system components
│   ├── models/           # Data models
│   ├── services/         # Services and business logic
│   │   └── pattern_recognition/
│   │       └── deep_learning/
│   │           ├── models/      # Neural models
│   │           ├── training/    # Training infrastructure
│   │           └── inference/   # Inference services
│   └── ui/               # React-based UI components
│       └── components/
│           └── DriftVisualizer.jsx  # Visual graph interface
├── storage/              # Data storage
│   ├── elements/         # Raw template storage
│   ├── embeddings/       # Neural embeddings storage
│   └── exports/          # Exported CodexNodes
├── app.py                # Main application CLI
├── deep_learning_cli.py  # Deep learning CLI tool
├── codex_api.py          # CodexNode REST API
├── ghost_agent.py        # Ghost Agent shell
├── run_template_drafter.sh # Main launcher script
├── run_deep_learning.sh  # Deep learning tools launcher
├── requirements.txt      # Python dependencies
└── package.json          # JavaScript dependencies
```

## License

This project is part of the WisdomNET framework and follows its licensing terms.

## Contributors

- The LOG.OS development team 
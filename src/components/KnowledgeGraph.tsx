
import React from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  category: string;
  isHighlighted?: boolean;
}

interface Edge {
  source: string;
  target: string;
  label?: string;
  isHighlighted?: boolean;
}

interface KnowledgeGraphProps {
  nodes: Node[];
  edges: Edge[];
  isVisible: boolean;
}

const KnowledgeGraph = ({ nodes, edges, isVisible }: KnowledgeGraphProps) => {
  if (!isVisible) return null;

  // Layout data - this would normally be calculated by a graph layout algorithm
  // Here we're just hardcoding positions for the demo
  const nodePositions: Record<string, { x: number, y: number }> = {
    "article5": { x: 120, y: 100 },
    "article6": { x: 300, y: 80 },
    "article7": { x: 450, y: 130 },
    "article13": { x: 200, y: 220 },
    "article14": { x: 400, y: 250 },
    "article15": { x: 320, y: 350 },
    "article17": { x: 150, y: 330 },
    "dataController": { x: 250, y: 170 },
    "dataProcessor": { x: 380, y: 180 },
    "dataSubject": { x: 250, y: 280 },
  };

  const getNodeColor = (node: Node) => {
    if (node.isHighlighted) {
      return "#A78BFA"; // Highlighted color
    }
    
    switch (node.category) {
      case "article":
        return "#6366F1";
      case "entity":
        return "#10B981";
      default:
        return "#C4B5FD";
    }
  };

  const getEdgeColor = (edge: Edge) => {
    return edge.isHighlighted ? "#A78BFA" : "#4B5563";
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 animate-fade-in glass-card p-6" aria-label="GDPR Knowledge Graph visualization">
      <h3 className="text-xl font-medium mb-6">GDPR Knowledge Graph: Relevant Sections</h3>
      
      <div className="relative h-[400px] w-full bg-gdpr-bg/40 rounded-lg overflow-hidden border border-gdpr-border/30" aria-hidden="false" role="img" aria-label="Interactive knowledge graph showing GDPR articles and entities">
        <svg width="100%" height="100%" viewBox="0 0 600 400">
          {/* Draw edges first so they appear under nodes */}
          {edges.map((edge) => {
            const source = nodePositions[edge.source];
            const target = nodePositions[edge.target];
            
            if (!source || !target) return null;
            
            return (
              <motion.line
                key={`${edge.source}-${edge.target}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={getEdgeColor(edge)}
                strokeWidth={edge.isHighlighted ? 2 : 1}
                strokeOpacity={edge.isHighlighted ? 0.8 : 0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map((node) => {
            const position = nodePositions[node.id];
            if (!position) return null;
            
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={node.isHighlighted ? 22 : 20}
                  fill={getNodeColor(node)}
                  opacity={node.isHighlighted ? 1 : 0.8}
                  stroke={node.isHighlighted ? "#fff" : "transparent"}
                  strokeWidth={2}
                />
                <text
                  x={position.x}
                  y={position.y}
                  textAnchor="middle"
                  dy=".3em"
                  fontSize={12}
                  fill="#fff"
                  fontWeight={node.isHighlighted ? "bold" : "normal"}
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
        
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 text-xs text-gdpr-muted">
            <div className="w-3 h-3 rounded-full bg-[#6366F1]"></div>
            <span>Article</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gdpr-muted">
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            <span>Entity</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gdpr-muted">
            <div className="w-3 h-3 rounded-full bg-[#A78BFA]"></div>
            <span>Highlighted</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-gdpr-border/30 pt-4">
        <h4 className="text-lg font-medium mb-2">Relevant GDPR Sections</h4>
        <ul className="space-y-3">
          {nodes.filter(n => n.isHighlighted).map((node) => (
            <li key={node.id} className="text-sm">
              <span className="font-medium text-gdpr-accent">{node.label}:</span> {' '}
              <span className="text-gdpr-muted">
                {node.id === 'article5' && 'Principles relating to processing of personal data'}
                {node.id === 'article6' && 'Lawfulness of processing'}
                {node.id === 'article13' && 'Information to be provided where personal data are collected from the data subject'}
                {node.id === 'article14' && 'Information to be provided where personal data have not been obtained from the data subject'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeGraph;

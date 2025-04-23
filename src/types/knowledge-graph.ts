
export interface GraphNode {
  id: string;
  label: string;
  category: string;
  description?: string;
  isHighlighted?: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
  isHighlighted?: boolean;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

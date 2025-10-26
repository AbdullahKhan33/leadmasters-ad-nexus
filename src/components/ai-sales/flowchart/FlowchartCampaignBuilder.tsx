import { useState, useCallback, useRef } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Save, Play, Plus } from "lucide-react";
import { MessageNode } from "./nodes/MessageNode";
import { DelayNode } from "./nodes/DelayNode";
import { BranchNode } from "./nodes/BranchNode";
import { EndNode } from "./nodes/EndNode";
import { StartNode } from "./nodes/StartNode";
import { NodeTypeSelector } from "./NodeTypeSelector";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FlowchartCampaignBuilderProps {
  campaignId: string;
  campaignName: string;
  onClose: () => void;
  onSave: () => void;
}

const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  delay: DelayNode,
  branch: BranchNode,
  end: EndNode,
};

const initialNodes: Node[] = [
  {
    id: "start-node",
    type: "start",
    position: { x: 400, y: 50 },
    data: { label: "Campaign Start" },
  },
];

const initialEdges: Edge[] = [];

export function FlowchartCampaignBuilder({
  campaignId,
  campaignName,
  onClose,
  onSave,
}: FlowchartCampaignBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [selectorPosition, setSelectorPosition] = useState({ x: 0, y: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: "smoothstep",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const handleAddNode = (nodeType: string) => {
    const newNode: Node = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position: selectorPosition,
      data: {
        label: `New ${nodeType}`,
        content: "",
        delay: 24,
        condition: "",
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setShowNodeSelector(false);
  };

  const handlePaneClick = useCallback((event: React.MouseEvent) => {
    const bounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (bounds) {
      setSelectorPosition({
        x: event.clientX - bounds.left - 100,
        y: event.clientY - bounds.top - 50,
      });
      setShowNodeSelector(true);
    }
  }, []);

  const handleSaveFlow = async () => {
    setIsSaving(true);
    try {
      // Convert nodes and edges to a workflow structure
      const flowData = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
        })),
      };

      const { error } = await supabase
        .from("automation_workflows")
        .update({
          actions: { flowchart: flowData } as any,
          updated_at: new Date().toISOString(),
        })
        .eq("id", campaignId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign flow saved successfully",
      });

      onSave();
    } catch (error: any) {
      console.error("Error saving flow:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save campaign flow",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold">{campaignName}</h2>
            <p className="text-sm text-muted-foreground">
              Visual Flowchart Builder - Click anywhere to add nodes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            <Button
              size="sm"
              onClick={handleSaveFlow}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Flow"}
            </Button>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div ref={reactFlowWrapper} className="h-[calc(100vh-80px)] bg-muted/20">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/10"
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls />
          
          {/* Instructions Panel */}
          <Panel position="top-left">
            <Card className="p-4 max-w-sm">
              <h3 className="font-semibold mb-2 text-sm">Quick Guide</h3>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Click anywhere on canvas to add nodes</li>
                <li>• Drag from node handles to create connections</li>
                <li>• Click nodes to edit their properties</li>
                <li>• Use mouse wheel to zoom in/out</li>
              </ul>
            </Card>
          </Panel>

          {/* Node Count Panel */}
          <Panel position="top-right">
            <Card className="p-3">
              <div className="text-xs text-muted-foreground">
                <div>Nodes: {nodes.length}</div>
                <div>Connections: {edges.length}</div>
              </div>
            </Card>
          </Panel>
        </ReactFlow>

        {/* Node Type Selector */}
        {showNodeSelector && (
          <div
            style={{
              position: "absolute",
              left: selectorPosition.x,
              top: selectorPosition.y,
              zIndex: 1000,
            }}
          >
            <NodeTypeSelector
              onSelect={handleAddNode}
              onClose={() => setShowNodeSelector(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

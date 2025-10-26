import { useState, useCallback, useRef, useEffect } from "react";
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
import { X, Save } from "lucide-react";
import { MessageNode } from "./nodes/MessageNode";
import { DelayNode } from "./nodes/DelayNode";
import { BranchNode } from "./nodes/BranchNode";
import { EndNode } from "./nodes/EndNode";
import { StartNode } from "./nodes/StartNode";
import { NodeTypeSelector } from "./NodeTypeSelector";
import { NodeConfigPanel } from "./NodeConfigPanel";
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
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [addingFromNodeId, setAddingFromNodeId] = useState<string | null>(null);
  const [branchHandle, setBranchHandle] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load existing flowchart on mount
  useEffect(() => {
    loadFlowchart();
  }, [campaignId]);

  const loadFlowchart = async () => {
    try {
      const { data, error } = await supabase
        .from("automation_workflows")
        .select("actions")
        .eq("id", campaignId)
        .single();

      if (error) throw error;

      if (data?.actions && typeof data.actions === 'object' && 'flowchart' in data.actions) {
        const flowData = (data.actions as any).flowchart;
        if (flowData?.nodes && flowData?.edges) {
          setNodes(flowData.nodes);
          setEdges(flowData.edges.map((edge: any) => ({
            ...edge,
            type: "smoothstep",
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          })));
        }
      }
    } catch (error: any) {
      console.error("Error loading flowchart:", error);
      toast({
        title: "Info",
        description: "Starting with a blank canvas",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleNodeClick = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setSidePanelOpen(true);
    }
  }, [nodes]);

  const handleAddNodeClick = useCallback((sourceNodeId: string, handle?: string) => {
    setAddingFromNodeId(sourceNodeId);
    setBranchHandle(handle || null);
    setShowNodeSelector(true);
  }, []);

  const handleAddNode = (nodeType: string) => {
    const sourceNode = nodes.find((n) => n.id === addingFromNodeId);
    if (!sourceNode) return;

    const newNode: Node = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position: {
        x: sourceNode.position.x,
        y: sourceNode.position.y + 150,
      },
      data: {
        content: "",
        delayValue: 24,
        delayUnit: "hours",
        conditionType: "lead_replied",
        channel: "whatsapp",
        onNodeClick: handleNodeClick,
        onAddNode: handleAddNodeClick,
      },
    };

    setNodes((nds) => [...nds, newNode]);

    // Auto-create connection
    const newEdge: Edge = {
      id: `edge-${addingFromNodeId}-${newNode.id}-${Date.now()}`,
      source: addingFromNodeId!,
      target: newNode.id,
      sourceHandle: branchHandle,
      type: "smoothstep",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    setEdges((eds) => [...eds, newEdge]);

    setShowNodeSelector(false);
    setAddingFromNodeId(null);
    setBranchHandle(null);

    // Open config panel for new node
    setSelectedNode(newNode);
    setSidePanelOpen(true);
  };

  const handleUpdateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...newData },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Update all existing nodes with callbacks when they change
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onNodeClick: handleNodeClick,
          onAddNode: handleAddNodeClick,
        },
      }))
    );
  }, [handleNodeClick, handleAddNodeClick]);

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

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading flowchart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-2xl font-bold">{campaignName}</h2>
            <p className="text-sm text-muted-foreground">
              Visual Flowchart Builder - Click nodes to configure, hover to add next steps
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
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 250, y: 100, zoom: 0.75 }}
          className="bg-muted/10"
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls />
          
          {/* Instructions Panel */}
          <Panel position="top-left">
            <Card className="p-4 max-w-sm">
              <h3 className="font-semibold mb-2 text-sm">Quick Guide</h3>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Hover over nodes to see + button</li>
                <li>• Click + to add connected nodes</li>
                <li>• Click nodes to configure settings</li>
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
        <NodeTypeSelector
          open={showNodeSelector}
          onSelect={handleAddNode}
          onClose={() => {
            setShowNodeSelector(false);
            setAddingFromNodeId(null);
            setBranchHandle(null);
          }}
        />

        {/* Node Configuration Panel */}
        <NodeConfigPanel
          open={sidePanelOpen}
          onOpenChange={setSidePanelOpen}
          node={selectedNode}
          onSave={handleUpdateNodeData}
        />
      </div>
    </div>
  );
}

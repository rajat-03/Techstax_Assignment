import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Navbar from "./Navbar";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [workflowId, setWorkflowId] = useState(""); // State to hold the unique ID of the saved workflow
  const [workflowIds, setWorkflowIds] = useState([]);

  useEffect(() => {
    // Fetch all saved workflow IDs from the backend when the component mounts
    fetchWorkflowIds();
  }, []);

  const fetchWorkflowIds = async () => {
    try {
      const response = await axios.get(
        "https://techstax-backend-0ysa.onrender.com/api/workflows/ids"
      );
      setWorkflowIds(response.data); // Update the list of workflow IDs
    } catch (error) {
      console.error("Error fetching workflow IDs:", error);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const label = getLabelByType(type);

      setNodes((nds) =>
        nds.concat({
          id: getId(),
          type,
          data: { label },
          position,
        })
      );
    },
    [reactFlowInstance]
  );

  const getLabelByType = (type) => {
    switch (type) {
      case "input":
        return "Start";
      case "filterdata":
        return "Filter Data";
      case "wait":
        return "Wait";
      case "convert-format":
        return "Convert Format";
      case "send-post-request":
        return "Send POST Request";
      case "output":
        return "End";
      default:
        return type; // Fallback for unknown types
    }
  };
  const handleReset = () => {
    setNodes(initialNodes);
    setEdges([]);
  };

  useEffect(() => {
    setWorkflowId(generateUniqueId());
  }, []);

  const saveWorkflow = async () => {
    try {
      console.log("edges: ", edges);
      const response = await axios.post(
        "https://techstax-backend-0ysa.onrender.com/api/workflows/save",
        {
          workflowId: workflowId,
          nodes,
          edges,
        }
      );
      setWorkflowId(response.data.workflowId);
      console.log(response.data);
      setWorkflowId(generateUniqueId());
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  };

  const loadWorkflow = async () => {
    try {
      const response = await axios.get(
        `https://techstax-backend-0ysa.onrender.com/api/workflows/load/${workflowId}`
      );
      const nodes = response.data.nodes;
      const edges = response.data.edges;
      console.log("edges: ", edges);
      console.log(response.data);
      // Update nodes and edges with received data
      setNodes(nodes);
      setEdges(edges);
    } catch (error) {
      console.error("Error loading workflow:", error);
    }
  };

  // Function to generate a unique ID for the workflow
  const generateUniqueId = () => {
    return uuidv4();
  };

  return (
    <>
      <Navbar
        workflowId={workflowId}
        saveWorkflow={saveWorkflow}
        loadWorkflow={loadWorkflow}
        setWorkflowId={setWorkflowId} // Pass setWorkflowId as a prop
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default Flow;

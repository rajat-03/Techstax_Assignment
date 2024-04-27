import React, { useState } from "react";
import { Link } from "react-router-dom";


const defaultNodeLabels = {
  input: "Start",
  filterdata: "Filter Data",
  wait: "Wait",
  "convert-format": "Convert Format",
  "send-post-request": "Send POST Request",
  output: "End",
};

const Sidebar = ({ onReset }) => {

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";

    const label = defaultNodeLabels[nodeType];
    event.dataTransfer.setData("text/plain", label);
  };

  const handleSidebarReset = () => {
    if (onReset) {
      onReset();
    }
  };


  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#dcdde1] text-black">
      <div className="px-3 py-2 flex-1">
        <div className="text-center text-lg my-3">WorkFlow Nodes</div>
        
        <div
           className="border border-black text-lg px-5 py-2"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Start
        </div>
        <div
           className="border border-black text-lg px-5 py-2"
          onDragStart={(event) => onDragStart(event, "filterdata")}
          draggable
        >
          Filter Data
        </div>
        <div
           className="border border-black text-lg px-5 py-2"
          onDragStart={(event) => onDragStart(event, "wait")}
          draggable
        >
          Wait
        </div>
        <div
          className="border border-black text-lg px-5 py-2"
          onDragStart={(event) => onDragStart(event, "convert-format")}
          draggable
        >
          Convert Format
        </div>
        <div
           className="border border-black text-lg px-5 py-2"
          onDragStart={(event) => onDragStart(event, "send-post-request")}
          draggable
        >
          Send POST Request
        </div>
        <div
          className="border border-black text-lg px-5 py-2"
          onDragStart={(event) => onDragStart(event, "output")}
          draggable
        >
          End
        </div>
  
     
     
      </div>
      <Link
          className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded m-5"
          to={"/execute"}
        >
          Execute WorkFlow
        </Link>
    
    </div>
  );
};

export default Sidebar;

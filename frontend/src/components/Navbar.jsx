import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ saveWorkflow, loadWorkflow, workflowId, setWorkflowId }) => {
  const [workflowIds, setWorkflowIds] = useState([]); // State to hold the list of workflow IDs

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

  const handleSaveWorkflow = async () => {
    try {
      // Perform save workflow functionality here
      saveWorkflow();
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  };

  const handleLoadWorkflow = async () => {
    try {
      // Perform load workflow functionality here
      loadWorkflow();
    } catch (error) {
      console.error("Error loading workflow:", error);
    }
  };

  const handleWorkflowIdChange = (e) => {
    setWorkflowId(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">WorkFlow Builder</h1>
      </div>

      <div className="flex justify-between p-2 items-center">
        <div>
          <h3>Workflow ID: {workflowId}</h3>
          <button
            onClick={handleSaveWorkflow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Workflow
          </button>
        </div>

        <div className="flex justify-end">
          <label htmlFor="workflowIdDropdown"></label>
          <select
            id="workflowIdDropdown"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-2/5 p-2.5 mr-3"
            onChange={handleWorkflowIdChange}
          >
            <option value="">Select an Workflow ID</option>
            {workflowIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <button
            onClick={handleLoadWorkflow}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load Workflow
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

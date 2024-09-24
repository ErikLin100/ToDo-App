import React, { useState } from "react";

const AddTodoModal = ({ open, onClose, onAddTodo }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [comments, setComments] = useState("");

  const handleAddTodo = () => {
    if (title.trim() && deadline) {
      onAddTodo({ title, priority, deadline, comments });
      setTitle("");
      setPriority("low");
      setDeadline("");
      setComments("");
      onClose();
    } else {
      alert("Title and deadline are required");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border rounded p-2 w-full mb-4"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Comments"
          className="border rounded p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 mr-2">
            Cancel
          </button>
          <button onClick={handleAddTodo} className="bg-green-500 text-white rounded p-2">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
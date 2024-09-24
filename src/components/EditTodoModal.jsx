import React, { useState } from "react";

const EditTodoModal = ({ open, onClose, onUpdate, currentTodo }) => {
  const [input, setInput] = useState(currentTodo.todoName);

  const handleUpdate = () => {
    if (input.trim()) {
      onUpdate(currentTodo.id, input);
      setInput("");
      onClose();
    } else {
      alert("Todo cannot be empty");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Task name"
          className="border rounded p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 mr-2">
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-green-500 text-white rounded p-2">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
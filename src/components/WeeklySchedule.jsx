import React, { useState } from "react";
import moment from "moment";

const WeeklySchedule = () => {
  const [todos, setTodos] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [input, setInput] = useState("");
  const today = moment().format("dddd");

  const handleAddTodo = (day) => {
    if (input.trim()) {
      setTodos((prev) => ({
        ...prev,
        [day]: [...prev[day], input],
      }));
      setInput("");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Weekly Schedule</h2>
      <div className="grid grid-cols-7 gap-4">
        {Object.keys(todos).map((day) => (
          <div
            key={day}
            className={`p-4 border rounded-lg transition-transform transform ${
              day === today ? "bg-blue-300" : "bg-gray-100"
            } hover:scale-105`}
          >
            <h3 className="font-bold text-lg text-center">{day}</h3>
            <ul className="mb-2">
              {todos[day].map((todo, index) => (
                <li key={index} className="text-sm">{todo}</li>
              ))}
            </ul>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a todo"
              className="border rounded p-1 w-full"
            />
            <button
              onClick={() => handleAddTodo(day)}
              className="bg-green-500 text-white rounded p-1 mt-2 w-full"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
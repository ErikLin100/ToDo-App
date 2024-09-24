import React from "react";
import moment from "moment/moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore"; // Ensure updateDoc is imported
import { FaEdit, FaTrash } from "react-icons/fa";

function TodoCard({ id, title, priority, deadline, comments, time, status, updateTodo }) {
  const [user] = useAuthState(auth);

  const deleteTodo = (id) => {
    deleteDoc(doc(db, `user/${user.uid}/todos/${id}`))
      .then(() => alert("Todo Deleted"))
      .catch((er) => alert(er.message));
  };

  const toggleStatus = async () => {
    try {
      await updateDoc(doc(db, `user/${user.uid}/todos/${id}`), {
        status: !status, // Toggle the status
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div className={`flex justify-between items-center p-4 border-b ${status ? "bg-green-200" : "bg-white"}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={status}
          onChange={toggleStatus}
          className="mr-3"
        />
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${priorityColor[priority]} mr-2`} />
          <div>
            <p className="text-lg font-bold">{title}</p>
            <p className="text-sm">Deadline: {moment(deadline).format("MM/DD/YYYY")}</p>
            <p className="text-sm">Comments: {comments}</p>
            <p className="text-sm">{moment(time).format("LT")}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => updateTodo(id)} // Ensure this is defined
          className="bg-blue-600 text-white rounded p-2 flex items-center"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          onClick={() => deleteTodo(id)}
          className="bg-red-600 text-white rounded p-2 flex items-center"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
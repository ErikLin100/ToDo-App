import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Tabs from "./Tabs";
import moment from "moment";
import AddTodoModal from "./AddTodoModal";

function Body() {
  const [activeTab, setActiveTab] = useState("Today");
  const [todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);
  const [addTodoModal, setAddTodoModal] = useState(false);

  const addTodo = async ({ title, priority, deadline, comments }) => {
    try {
      await addDoc(collection(db, `user/${user?.uid}/todos`), {
        title,
        priority,
        deadline: new Date(deadline),
        comments,
        status: false,
        time: serverTimestamp(),
      });
      alert("Todo Added");
    } catch (err) {
      console.error("Error adding todo: ", err);
      alert(err.message);
    }
  };

  const updateTodo = async (id, newTitle) => {
    try {
      await updateDoc(doc(db, `user/${user.uid}/todos/${id}`), {
        title: newTitle,
      });
      alert("Todo Updated");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `user/${user?.uid}/todos`), orderBy("time", "desc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            priority: doc.data().priority,
            deadline: doc.data().deadline,
            comments: doc.data().comments,
            time: doc.data().time,
            status: doc.data().status,
          }))
        );
      }
    );

    return () => unsubscribe();
  }, [user]);

  const filteredTodos = todos.filter((todo) => {
    if (!todo.time) return false;

    if (activeTab === "Today") {
      return moment(todo.time.toDate()).isSame(moment(), "day");
    } else if (activeTab === "Pending") {
      return !todo.status;
    } else if (activeTab === "Overdue") {
      return moment(todo.time.toDate()).isBefore(moment()) && !todo.status;
    }
    return true;
  });

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  const sortedTodos = filteredTodos.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-6">
      <Tabs onTabChange={setActiveTab} />
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="overflow-auto max-w-screen-md mx-auto">
        {sortedTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            priority={todo.priority}
            deadline={todo.deadline}
            comments={todo.comments}
            time={todo.time?.toDate().getTime()}
            status={todo.status}
            updateTodo={updateTodo} // Pass the updateTodo function
          />
        ))}
      </div>
      <button
        onClick={() => setAddTodoModal(true)}
        className="bg-green-500 text-white rounded p-2 mt-4 w-full"
      >
        + Add Task
      </button>

      <AddTodoModal
        open={addTodoModal}
        onClose={() => setAddTodoModal(false)}
        onAddTodo={addTodo}
      />
    </div>
  );
}

export default Body;
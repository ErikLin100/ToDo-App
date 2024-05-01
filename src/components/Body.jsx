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

function AddTodoModal({ open, onClose, onAddTodo }) {
  const [input, setInput] = useState(""); // Tilamuuttuja syötekentän arvon seuraamiseksi

  const handleAddTodo = () => {
    const sanitizedInput = input.replace(/[^a-zA-Z0-9 ]/g, ''); // Poistetaan kaikki muut paitsi kirjaimet ja numerot

    if (!sanitizedInput.trim()) { // Tarkistetaan, onko syötekenttä tyhjä
      alert("Todo cannot be empty"); // Ilmoitetaan käyttäjälle, jos syötekenttä on tyhjä
      return;
    }

    onAddTodo(sanitizedInput); // Lähetetään uusi tehtävä vanhemmalle komponentille
    setInput(""); // Tyhjennetään syötekenttä
    onClose(); // Suljetaan lisää tehtävä -modaali
  };

  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${open ? "" : "hidden"}`}>
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // Päivitetään syötettä muutoksen yhteydessä
          type="text"
          placeholder="Todo name"
          maxLength={50}
          className="border p-2 w-full outline-none rounded-lg"
        />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 mr-2">Cancel</button>
          <button onClick={handleAddTodo} className="bg-green-500 p-3 text-white font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-in-out">Add</button>
        </div>
      </div>
    </div>
  );
}

function Body() {
  const [addTodoModal, setAddTodoModal] = useState(false); // Tilamuuttuja modaalin tilan seuraamiseksi
  const [todos, setTodos] = useState([]); // Tilamuuttuja tehtävälistan seuraamiseksi
  const [user] = useAuthState(auth); // Kirjautuneen käyttäjän tila

  const addTodo = async (todoName) => {
    try {
      await addDoc(collection(db, `user/${user?.uid}/todos`), {
        todoName: todoName,
        status: false,
        time: serverTimestamp(),
      });
      alert("Todo Added"); // Ilmoitetaan käyttäjälle, että tehtävä on lisätty onnistuneesti
    } catch (err) {
      console.error("Error adding todo: ", err); // Kirjataan virhe konsoliin
      alert(err.message); // Näytetään virheilmoitus käyttäjälle
    }
  };

  useEffect(() => {
    onSnapshot(
      query(collection(db, `user/${user?.uid}/todos`), orderBy("time", "desc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todoName: doc.data().todoName,
            time: doc.data().time,
            status: doc.data().status,
          }))
        );
      }
    );
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl font-bold">Today</h1>
        <button
          onClick={() => setAddTodoModal(true)}
          className="bg-green-500 p-3 text-white text-sm font-bold rounded-lg hover:scale-110 transition-all duration-200 ease-in-out"
        >
          Add Todo
        </button>
      </div>

      {/* Tehtävät */}
      <div className="overflow-auto max-w-screen-md mx-auto"> {/* Lisätty scrollaus, kun tehtävämäärä ylittää näytön leveyden */}
        {todos?.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            todoName={todo?.todoName}
            time={todo.time?.toDate().getTime()}
            status={todo?.status}
          />
        ))}
      </div>

      <AddTodoModal
        open={addTodoModal}
        onClose={() => setAddTodoModal(false)}
        onAddTodo={addTodo}
      />
    </div>
  );
}

export default Body;
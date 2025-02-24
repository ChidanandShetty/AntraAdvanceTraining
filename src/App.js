import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos from db.json
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  };

  // Function to add a new todo
  const addTodo = () => {
    if (todo.trim() === "") return;

    const newTodo = { text: todo };

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((addedTodo) => {
        setTodos([...todos, addedTodo]);
        setTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos(todos.filter((todo) => todo.id !== id));
        } else {
          console.error("Failed to delete todo");
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        id="inputarea"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ToDoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;

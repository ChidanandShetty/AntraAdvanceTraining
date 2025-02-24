export default function ToDoList({ todos, deleteTodo }) {
    return (
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo.id)}> Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
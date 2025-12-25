import { useEffect, useState } from "react";

const API_URL = "http://3.0.33.191:5000"; // Elastic IP backend

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (!text) return;

    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setText("");
      });
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>📝 To-Do App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

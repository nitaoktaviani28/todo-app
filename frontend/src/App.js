import { useEffect, useState } from "react";

const API_URL = "http://3.0.33.191:5000"; // Elastic IP backend

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addTodo = () => {
    if (!text.trim()) return;

    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos((prev) => [...prev, newTodo]);
        setText("");
      })
      .catch((err) => console.error("Add todo error:", err));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Task Manager</h1>
        <p style={styles.subtitle}>
          Simple, clean, and cloud-ready To-Do App
        </p>

        <div style={styles.inputGroup}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a new task..."
            style={styles.input}
          />
          <button onClick={addTodo} style={styles.button}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.item}>
              {todo.text}
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={styles.empty}>No tasks yet 🚀</p>
        )}
      </div>
    </div>
  );
}

export default App;

/* =========================
   STYLES (WAJIB ADA)
========================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: 30,
    width: 420,
    borderRadius: 16,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: "#666",
    fontSize: 14,
  },
  inputGroup: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 14,
    outline: "none",
  },
  button: {
    padding: "12px 18px",
    borderRadius: 10,
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    padding: 14,
    marginBottom: 10,
    background: "#f7f8fc",
    borderRadius: 10,
    border: "1px solid #eee",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
};

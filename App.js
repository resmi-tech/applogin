import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

export default function App() {
  const [token, setToken] = useState("");
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loginError, setLoginError] = useState("");

  const login = async () => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "1234" }),
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      setLoginError("");
    } else {
      setLoginError("Login failed");
    }
  };

  const fetchTodos = async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  if (!token)
    return (
      <div>
        <h2>Login</h2>
        <button onClick={login}>Login as test/1234</button>
        <p style={{ color: "red" }}>{loginError}</p>
      </div>
    );

  return (
    <div>
      <h2>Todo App</h2>
      <input
        placeholder="Enter todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text} <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

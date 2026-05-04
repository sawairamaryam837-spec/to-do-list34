import React, { useState, useEffect } from "react";
import "./main.css";
import "./corner.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("standard");
  const [dateTime, setDateTime] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedTheme = localStorage.getItem("savedTheme") || "standard";

    setTodos(savedTodos);
    setTheme(savedTheme);
  }, []);

  // Save todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("savedTheme", theme);
    document.body.className = theme;
  }, [theme]);

  // Time update
  useEffect(() => {
    const updateTime = () => {
      setDateTime(new Date().toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Add todo
  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("You must write something!");
      return;
    }

    const newTodo = {
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  // Delete
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Toggle complete
  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
   <div className={theme}>
      {/* Header */}
      <div id="header">
        <div className="flexrow-container">
          <div className="standard-theme theme-selector" onClick={() => setTheme("standard")}></div>
          <div className="light-theme theme-selector" onClick={() => setTheme("light")}></div>
          <div className="darker-theme theme-selector" onClick={() => setTheme("darker")}></div>
        </div>

        <h1 id="title" className={theme === "darker" ? "darker-title" : ""}>
          Just do it.
          
        </h1>
      </div>

      {/* Form */}
      <div id="form">
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task."
            className={`${theme}-input`}
          />
          <button className={`todo-btn ${theme}-button`}>
            I Got This!
          </button>
        </form>
      </div>

      {/* Time */}
      <p style={{ textAlign: "center" }}>{dateTime}</p>

      {/* Todo List */}
      <div id="myUnOrdList">
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <div
              key={index}
              className={`todo ${theme}-todo ${
                todo.completed ? "completed" : ""
              }`}
            >
              <li className="todo-item">{todo.text}</li>

              <button
                className={`check-btn ${theme}-button`}
                onClick={() => toggleComplete(index)}
              >
                ✔
              </button>

              <button
                className={`delete-btn ${theme}-button`}
                onClick={() => deleteTodo(index)}
              >
                🗑
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
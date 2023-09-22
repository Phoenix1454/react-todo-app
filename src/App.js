import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/form';
import Todolist from './components/todolist';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(() => {
    let todoLocal = JSON.parse(localStorage.getItem("todos"));
    // Check if todoLocal is null (no todos in local storage), and provide an empty array as a default value
    setTodos(todoLocal || []);
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    console.log(status)
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <div className="App">
      <header>
        <h1>
          TO DO LIST
        </h1>
      </header>
      <Form
  setInputText={setInputText}
  setTodos={setTodos}
  todos={todos}
  inputText={inputText}
  setStatus={setStatus} // Ensure this is correctly passed
  filterHandler={filterHandler} // Ensure this is correctly passed
  saveLocalTodos={saveLocalTodos}
/>
      <Todolist filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;

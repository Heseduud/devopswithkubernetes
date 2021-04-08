import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const baseUrl = 'http://localhost:8081/api';

const App = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState(['']);

  useEffect(() => {
    const getTodos = async () => {
      const todoData = await Axios.get(`${baseUrl}/todos`);
      console.log(todoData);
      setTodos(todoData.data);
    }

    getTodos();
  }, []);

  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    const newTodos = await Axios.post(`${baseUrl}/todos`, { todo: todoInput });
    console.log(newTodos);
    setTodos(newTodos.data);
  };

  return (
    <div>
      <p>Test</p>
      <img src={`${baseUrl}/getImage`} alt='img should be visible here'/>
      <form onSubmit={handleTodoSubmit}>
        <div>
          <input 
            type='text'
            value={todoInput}
            name='todo'
            onChange={({ target }) => setTodoInput(target.value)}
          />
          <button type='submit'>Create TODO</button>
        </div>
      </form>
      <ul>
        {
          todos.map((todo) => <li>{todo}</li>) 
        }
      </ul>
    </div>
  );
};

export default App;

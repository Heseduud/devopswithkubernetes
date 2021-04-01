import React, { useState } from 'react';

const App = () => {
  const [todo, setTodo] = useState('');

  const handleTodoSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <p>Test</p>
      <img src='/api/getImage' alt='img should be visible here'/>
      <form onSubmit={handleTodoSubmit}>
        <div>
          <input 
            type='text'
            value={todo}
            name='todo'
            onChange={({ target }) => setTodo(target.value)}
          />
          <button type='submit'>Create TODO</button>
        </div>
      </form>
      <ul>
        <li>TODO 1</li>
        <li>TODO 2</li>
      </ul>
    </div>
  );
};

export default App;

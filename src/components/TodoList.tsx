import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import AddTodoModal from '../modal/AddTodoModal';

function TodoList() {
  const [todos, setTodos] = useState<{ title: string; description: string; category: string; }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      // Save todos to local storage whenever the todos state changes
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, dataLoaded]);

  const addTodo = (newTodo: { title: string; description: string; category: string }) => {
    if (newTodo.title.trim() !== '') {
      setTodos([...todos, newTodo]);
      setShowModal(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Todo
      </Button>
      <ListGroup className="mt-3">
        {todos.map((todo, index) => (
          <ListGroup.Item key={index}>
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
            <p>Category: {todo.category}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <AddTodoModal show={showModal} onHide={() => setShowModal(false)} onSave={addTodo} />
    </div>
  );
}

export default TodoList;

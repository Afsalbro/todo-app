import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import AddTodoModal from '../modal/AddTodoModal';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import {getRandomColor} from '../utils/ColorUtils'

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
    <div className="container mt-4 text-center">
      <h1>Todo List</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Todo
      </Button>
      <Row className="mt-3 text-center">
        {todos.map((todo, index) => (
          <Col key={index} md={4}>
            <Card className="mb-2" style={{ borderColor: getRandomColor() }}>
              <Card.Body>
                <Card.Title><strong>{todo.title}</strong></Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <Card.Text>Category: {todo.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <AddTodoModal show={showModal} onHide={() => setShowModal(false)} onSave={addTodo} />
    </div>
  );
}

export default TodoList;

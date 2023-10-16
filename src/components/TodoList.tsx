import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import AddTodoModal from '../modal/AddTodoModal';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getRandomColor } from '../utils/ColorUtils'
import SearchBar from './SearchBar';
import CopyToClipboardButton from './CopyToClipboardButton';


function TodoList() {
  const [todos, setTodos] = useState<{ title: string; description: string; category: string; }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<{ title: string; description: string; category: string; }[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setDataLoaded(true);
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, dataLoaded]);

  const addTodo = (newTodo: { title: string; description: string; category: string }) => {
    if (newTodo.title.trim() !== '') {
      setTodos([...todos, newTodo]);
      setShowModal(false);
    }
  };

  const handleSearch = (query: string) => {
    const searchText = query.toLowerCase();
    // If the search query is empty, show all todos
    if (!searchText) {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter((todo) => {
        return (
          todo.title.toLowerCase().includes(searchText) ||
          todo.description.toLowerCase().includes(searchText) ||
          todo.category.toLowerCase().includes(searchText)
        );
      });
      setFilteredTodos(filtered);
    }
  };

  const displayedTodos = searchText ? filteredTodos : todos;


  return (
    <div className="container mt-4 text-center">
      <h1>Todo List</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Todo
      </Button>
      <div className='mt-3'>
        <SearchBar onSearch={handleSearch} setSearchText={setSearchText} />
      </div>
      {displayedTodos.length > 0 ? (
        <Row className="mt-3 text-center">
          {displayedTodos.map((todo, index) => (
            <Col key={index} md={4}>
              <Card className="mb-2" style={{ borderColor: getRandomColor() }}>
                <Card.Body>
                  <Card.Title><strong>{todo.title}</strong></Card.Title>
                  <Card.Text>{todo.description}</Card.Text>
                  <Card.Text>Category: {todo.category}</Card.Text>
                  <CopyToClipboardButton content={todo.description} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        todos.length === 0 ? (
          <p className="mt-3">No todos</p>
        ) : (
          <p className="mt-3">No matching results</p>
        )
      )}

      <AddTodoModal show={showModal} onHide={() => setShowModal(false)} onSave={addTodo} />
    </div>
  );
}
export default TodoList;

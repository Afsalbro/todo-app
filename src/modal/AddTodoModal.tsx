import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface AddTodoModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (newTodo: { title: string; description: string; category: string }) => void;
}

function AddTodoModal({ show, onHide, onSave }: AddTodoModalProps) {
  const [newTodo, setNewTodo] = useState({ title: '', description: '', category: '' });

  const addTodo = () => {
    onSave(newTodo);
    setNewTodo({ title: '', description: '', category: '' });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={newTodo.category}
              onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={addTodo}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTodoModal;

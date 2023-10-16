import React from 'react';
import Form from 'react-bootstrap/Form';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Control as="select" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default CategoryFilter;
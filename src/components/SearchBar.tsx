import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

interface SearchBarProps {
  onSearch: (query: string) => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, setSearchText }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchText(query); 
    onSearch(query);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;

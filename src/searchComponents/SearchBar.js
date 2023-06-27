import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

/* This is a simple search bar with possibilities of filtering through some main search routes,
   and whose prop onSearch will defined on the App.js file */

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [classification, setClassification] = useState('undefined');

  // Sets the search text according to what the user types
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Sets classification according to what the user has specified
  const handleValueChange = (event) => {
    setClassification(event.target.value);
  };

  // Makes a search using the text and the classification
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchText, classification); // Pass both searchText and classification
  };

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Select value={classification}  onChange={handleValueChange}>
          <option value="undefined">All</option>
          <option value="" disabled>Masculine</option>
          <option value="ShirtM">Shirts</option>
          <option value="TrouserM">Trousers</option>
          <option value="ShoeM">Socks</option>
          <option value="" disabled>Feminine</option>
          <option value="ShirtF">Shirts</option>
          <option value="TrouserF">Trousers</option>
          <option value="ShoeF">Socks</option>
          <option value="" disabled>Kids</option>
          <option value="ShirtK">Shirts</option>
          <option value="TrouserK">Trousers</option>
          <option value="ShoeK">Socks</option>
      </Form.Select>
      <Button type="submit" variant="outline-dark" style={{backgroundColor: "black", color: "white"}} >Search</Button>
    </Form>
  );
};

export default SearchBar;

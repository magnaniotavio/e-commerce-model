import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Col, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SetProductRoutes from '../products/SetProductsRoutes';
import { useEffect } from 'react';
import axios from 'axios';
import { MakeFilteredSearch } from './FilteredSearch';
import { Routes, Route } from 'react-router-dom';

export const NavbarFilterFunctions = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate();
    const { filter } = useParams();
    
const handleFilterChange = (filter) => {
        const updatedFilters = [...selectedFilters];
        const filterIndex = updatedFilters.indexOf(filter);
        if (filterIndex === -1) {
          updatedFilters.push(filter);
        } else {
          updatedFilters.splice(filterIndex, 1);
        }
        setSelectedFilters(updatedFilters);
      };

 const handleArrayFilterChange = (filters) => {
        setSelectedFilters(prevFilters => {
          const updatedFilters = [...prevFilters];
      
          filters.forEach(filter => {
            const filterIndex = updatedFilters.indexOf(filter);
            if (filterIndex === -1) {
              updatedFilters.push(filter);
            } else {
              updatedFilters.splice(filterIndex, 1);
            }
          });
      
          return updatedFilters;
        });
      };
      
      const HandleSearch = (e) => {
        e.preventDefault();
        const query = selectedFilters.join(',');
        navigate(`/products/${query}`);
      };


 return {
    selectedFilters,
    handleFilterChange,
    handleArrayFilterChange,
    HandleSearch,
  };
}

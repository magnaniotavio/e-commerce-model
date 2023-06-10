import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavbarFilterFunctions = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate();
    
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

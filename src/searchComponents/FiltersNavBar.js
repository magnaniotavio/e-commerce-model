import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* In this component we return the functions which are necessary for our search, and which will
   be called in our App.js component */

export const NavbarFilterFunctions = () => {

    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate();

      /* Changes the filters. This will be called as a prop by the NavBarMenu component;
         Example: handleArrayFilterChange(['classification:TrouserM', 'classification:TrouserF', 'classification:ShoeK']) -- an array is used*/
       const handleFilterChange = (filters) => {
              setSelectedFilters(prevFilters => {
                const updatedFilters = [...prevFilters]; // Creates array with previous filters
                filters.forEach(filter => {
                  const filterIndex = updatedFilters.indexOf(filter); 
              // Checks if the new filter already exists in the array, and, if it doesn't, adds it
              if (filterIndex === -1) {
                    updatedFilters.push(filter); 
                  } 
              // Removes it, if it already exists
                  else {
                    updatedFilters.splice(filterIndex, 1);
                  }
                });
                return updatedFilters;
              });
            };
    
  // Performs the actual search, by going into the address
  const HandleSearch = (e) => {
        e.preventDefault();
        // Joins the selectedFilters array into a string using join(',') 
        const query = selectedFilters.join(',');
        // Navigates to the query string
        navigate(`/products/${query}`);
      };


 return {
    selectedFilters,
    handleFilterChange,
    HandleSearch,
  };
}

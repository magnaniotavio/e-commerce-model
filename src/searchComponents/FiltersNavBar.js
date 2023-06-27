import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* In this component we return the functions which are necessary for our search, and which will
   be called in our App.js component */

export const NavbarFilterFunctions = () => {

    const [selectedFilters, setSelectedFilters] = useState([]);
    const navigate = useNavigate();

// Changes the filters. This will be called as a prop by the NavBarMenu component

      /* Add one filter only;
         Example: handleFilterChange('targetPublic:Feminine')} */
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

      /* Adds multiple filters together;
         Example: handleArrayFilterChange(['classification:TrouserM', 'classification:TrouserF', 'classification:ShoeK']);*/
       const handleArrayFilterChange = (filters) => {
              setSelectedFilters(prevFilters => {
                // Creates array with previous filters
                const updatedFilters = [...prevFilters];
                filters.forEach(filter => {
                  const filterIndex = updatedFilters.indexOf(filter);
                  // Pushes new filters
                  if (filterIndex === -1) {
                    updatedFilters.push(filter);
                  } else {
                    updatedFilters.splice(filterIndex, 1);
                  }
                });
                return updatedFilters;
              });
            };
    
  // Performs the actual search, by going into the address
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

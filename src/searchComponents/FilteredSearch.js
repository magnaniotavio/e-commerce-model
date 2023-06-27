import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import { ProductPresentation } from '../products/ProductPresentation';

/* This function filters products according to any number of selected filters (an array in the parameter), including more than one filter,
   so that the user can not only search for red shirts, but red shirts that are also feminine, medium-sized, etc.

   It receives an array of filters in the form, e.g. ["targetPublic:Feminine", "classification:ShirtF"], and splits the array on the ":",
   leaving only the filters.

   */
export const MakeFilteredSearch = ({ selectedFilters, isMainRoute }) => {

    const [filteredProducts, setFilteredProducts] = useState([]);

    // This splits the selectedFilters array 
    function createFiltersArray(category) {
        return selectedFilters.filter(key => key.startsWith(`${category}`)).map(key => key.split(":")[1]);
    }
    // These will be the filters I will allow the user to search for; others can be added, naturally
    const targetPublic = createFiltersArray("targetPublic")
    const classification = createFiltersArray("classification")
    const brands = createFiltersArray("brand")
    const colors = createFiltersArray("color")
    const size = createFiltersArray("sizeSML")

    useEffect(() => {
      axios
        .get('https://e-commerce-model.onrender.com/products/')
        .then(response => {
          // We set newFilteredProducts to be all the products of the database
          const newFilteredProducts = response.data
            .filter(obj => {
                let match = true;
                /* We iterate selectedFilters array, and remove from newFilteredProducts all objects which d
                   don't have all the properties in selectedFilters */
                for (let i = 0; i < selectedFilters.length; i++) {
                    if (
                     targetPublic.length != 0 && !targetPublic.includes(obj.targetPublic) ||
                     classification.length != 0 && !classification.includes(obj.classification) ||
                     brands.length  != 0 && !brands.includes(obj.brand) ||
                     colors.length != 0 && !colors.includes(obj.color) ||
                     size.length  != 0 && !size.includes(obj.sizeSML)
                    ) 
                { match = false;
                  break;
                  }
              }
              return match;
            })
          // We set selectedFilters to consist of only the products that correspond to all of our filters
          setFilteredProducts(newFilteredProducts);
        })
        .catch(error => console.log(error));
    }, [selectedFilters]);
  
    // We return the results using the product presentation from the ProductMappingCart.js component
    return (
      < ProductPresentation productsToShow={filteredProducts}  classification={classification}
                            targetPublic={targetPublic} TypicalButtonPresentation={TypicalButtonPresentation}
                            selectedFilters={selectedFilters} isMainRoute={isMainRoute} 
                            searchType='filtered_search'
      /> 
    )
  };
  
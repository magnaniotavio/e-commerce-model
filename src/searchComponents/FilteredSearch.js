import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import { ProductPresentation } from '../products/ProductMappingCard';

export const MakeFilteredSearch = ({ selectedFilters, isMainRoute }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    function createFiltersArray(category) {
        return selectedFilters.filter(key => key.startsWith(`${category}`)).map(key => key.split(":")[1]);
    }
    const targetPublic = createFiltersArray("targetPublic")
    const classification = createFiltersArray("classification")
    const brands = createFiltersArray("brand")
    const colors = createFiltersArray("color")
    const size = createFiltersArray("sizeSML")
    useEffect(() => {
      axios
        .get('https://e-commerce-model.onrender.com/products/')
        .then(response => {
          const newFilteredProducts = response.data
            .filter(obj => {
                let match = true;
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
          setFilteredProducts(newFilteredProducts);
        })
        .catch(error => console.log(error));
    }, [selectedFilters]);
  

    return (
      < ProductPresentation productsToShow={filteredProducts}  classification={classification}
                            targetPublic={targetPublic} TypicalButtonPresentation={TypicalButtonPresentation}
                            selectedFilters={selectedFilters} isMainRoute={isMainRoute} 
                            searchType='filtered_search'
      /> 
    )
  };
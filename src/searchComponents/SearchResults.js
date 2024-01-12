import React from 'react';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import { ProductPresentation } from '../products/ProductPresentation';

// Shows search results, according to the array of results, the search term, and the classification selected
const SearchResults = ({ results, searchTerm, classification }) => {

  return (
  < ProductPresentation   
                        TypicalButtonPresentation={TypicalButtonPresentation}
                        selectedFilters={results} 
                        isMainRoute='false' 
                        targetPublic='false'
                        searchType='default_category_search' 
                        
                        // The following three properties will be defined in the App.js component
                        productsToShow={results}
                        classification={classification} 
                        searchTerm={searchTerm}
  /> 
  )
};

export default SearchResults;

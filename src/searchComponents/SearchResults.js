import React from 'react';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import { ProductPresentation } from '../products/ProductPresentation';

// Shows search results, according to the array of results, the search term, and the classification selected
const SearchResults = ({ results, searchTerm, classification }) => {

  return (
  < ProductPresentation productsToShow={results}  classification={classification}
                        TypicalButtonPresentation={TypicalButtonPresentation}
                        selectedFilters={results} isMainRoute='false' targetPublic='false'
                        searchType='default_category_search' searchTerm={searchTerm}
  /> 
  )
};

export default SearchResults;

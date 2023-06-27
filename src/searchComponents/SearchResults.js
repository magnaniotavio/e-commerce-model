import React from 'react';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import { ProductPresentation } from '../products/ProductMappingCard';

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

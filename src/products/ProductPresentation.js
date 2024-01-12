import React, { useState } from 'react';
import { Container, Col, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import productPic from '../images/productPic.png';
import Cookies from 'universal-cookie';
import { PaginationJSX, PaginationFunction } from '../basicComponents/Pagination';
import { BrowserRouter as Router } from "react-router-dom";

/* In this component, we create the most common presentation of products, in which each prodcut is shown on top of the other,
   with its name and some of its more important properties clearly presented for the potential buyer, and a pagination section below;
   The visitor to the website will see this presentation whenever he: 1) Makes a search; 2) Makes a filtered search; 3) Clicks one of the
   the links provided in the main routes (Masculine, Feminine, Kids) of the website.

   The function has many props, which will be defined in the FilteredSearch and SearchResults components.
  */

export function ProductPresentation({ productsToShow, classification, targetPublic, TypicalButtonPresentation, selectedFilters, isMainRoute, searchTerm, searchType }) {
  const navigate = useNavigate()

  // Getting the pagination constants, and defining its prop
  const {
    setItensPerPage,
    setCurrentPage,
    itensPerPage,
    totalItems,
    currentPage,
    itemsToDisplay,
    totalPages,
  } = PaginationFunction({ itensArray: productsToShow });

  // Formatting the filtering criteria so that they become more intuitive in the URL
  const lowerCaseClassification = String(classification).toLowerCase();
  const formatttedClassification = lowerCaseClassification.slice(0, lowerCaseClassification.length - 1) + 's';
  const lowerCaseTargetPublic = String(targetPublic).toLowerCase();

  // Checking if the user is Logged In, in which case we the typical button presentation for logged-in users, or else 'Log in to buy'
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  // Handles page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Handles navigation according to what type of search we are making
    if (searchType === 'filtered_search') {
      /* If the route is one of the Main Routes (Masculine Shirt, Feminine Shirt, etc.) in the Navbar of the website,
         we will need to format its classification and targetPulic properties to lower case */
      if (selectedFilters && isMainRoute) {
        navigate(`/${lowerCaseTargetPublic}/${formatttedClassification}/page/${pageNumber}`);
      } else if (selectedFilters) {
        navigate(`/products/?classification=${classification}&page=${pageNumber}`);
      }
    }
    else if (searchType === 'default_category_search') { navigate(`/search/${classification}/${searchTerm}/page/${pageNumber}`) }
  };

  return (
    <div>
      <Container>
      </Container>
      {itemsToDisplay.map(product => (
        <div key={product.id} className="product">
          <Container className="mt-4">
            <Row>
              <Col md={6}>
                <Image src={productPic} alt={product.name} fluid />
              </Col>
              <Col md={6}>
                <h3><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                <p>{product.brand}</p>
                <hr />
                <h4>Price: ${product.price}</h4>
                <div>
                  {isLoggedIn &&
                    <>
                      <TypicalButtonPresentation prop={product._id} />
                    </>
                  }
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ))
      }
      <PaginationJSX currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
    </div>
  )
}

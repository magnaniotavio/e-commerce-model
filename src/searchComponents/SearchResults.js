import React from 'react';
import { Card, Row, Col, Container, Button, Pagination } from 'react-bootstrap';
import { NavbarFilter } from '../searchComponents/FiltersNavBar';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { returnUserId } from '../users/UserId';

const SearchResults = ({ results, searchTerm, classification }) => {
  const userIsLoggedIn = returnUserId()
  
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const [totalResults, setTotalResults] = useState([])
  const totalItems = results.length;
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  useEffect(() => {
    setTotalResults(results);
  }, [results]);
  useEffect(() => {
    setCurrentPage(parseInt(pageNumber, 10) || 1);
  }, [pageNumber]);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const itemsToDisplay = totalResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / postsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/search/${classification}/${searchTerm}/page/${pageNumber}`);
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
      </Col>
      <Col md={6}>
        <h3><Link  to={`/product/${product._id}`}>{product.name}</Link></h3>
        <p>{product.brand}</p>
        <hr />
        <h4>Price: ${product.price}</h4>
        <div>
        {typeof userIsLoggedIn !== 'undefined' ? (
          <>
        <AddToCartButton button="cart" productId={product._id}/>
        <AddToCartButton button="wishlist" productId={product._id}/>
        <AddToCartButton button="buy_now" productId={product._id}/>
        </>
        ) : ''}
        </div>
      </Col>
    </Row>
  </Container>
    </div>
  ))
  }
     <Pagination>
      <Pagination.First disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
      <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
      <Pagination.Last disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  </div>
  );
};

export default SearchResults;


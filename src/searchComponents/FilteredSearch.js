import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Col, Image, Row, Pagination } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import SetProductRoutes from '../products/SetProductsRoutes';
import { useEffect } from 'react';
import axios from 'axios';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
import { returnUserId } from '../users/UserId';

export const MakeFilteredSearch = ({ selectedFilters, isMainRoute }) => {
    const userIsLoggedIn = returnUserId()
    const navigate = useNavigate();
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
        .get('http://localhost:4000/products/')
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
  
    const { pageNumber } = useParams();
    const [totalResults, setTotalResults] = useState([])
    const totalItems = filteredProducts.length;
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);
    const [postsPerPage, setPostsPerPage] = useState(2);
    useEffect(() => {
      setTotalResults(filteredProducts);
    }, [filteredProducts]);
    useEffect(() => {
      setCurrentPage(parseInt(pageNumber, 10) || 1);
    }, [pageNumber]);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const itemsToDisplay = totalResults.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalItems / postsPerPage);
    const lowerCaseClassification = String(classification).toLowerCase();
    const formatttedClassification = lowerCaseClassification.slice(0, lowerCaseClassification.length - 1) + 's';
    const lowerCaseTargetPublic = String(targetPublic).toLowerCase();

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      if (selectedFilters && isMainRoute) {
        navigate(`/${lowerCaseTargetPublic}/${formatttedClassification}/page/${pageNumber}`);
      } else if (selectedFilters) {
        navigate(`/products/?classification=${classification}&page=${pageNumber}`);
      }
    };

    return ( <div>
        {itemsToDisplay.map(product => (
          <div key={product._id} className="product">
            <Container className="mt-4">
          <Row>
            <Col md={6}>
              <Image src={product.name} alt={product.name} fluid />
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
    )
  };
  
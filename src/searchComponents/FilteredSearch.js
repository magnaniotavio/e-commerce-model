import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Col, Image, Row } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import SetProductRoutes from '../products/SetProductsRoutes';
import { useEffect } from 'react';
import axios from 'axios';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
import { returnUserId } from '../users/UserId';

export const MakeFilteredSearch = ({ selectedFilters }) => {
    const userIsLoggedIn = returnUserId()
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
  
    return ( <div>
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
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
      </div>
    )
  };
  
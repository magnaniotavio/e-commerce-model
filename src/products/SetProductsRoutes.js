import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
export default function SetProductRoutes(searchProperty, parameter, ...filter) {
    
  let navigate = useNavigate(); 
  const [products, setProducts] = useState([]);

useEffect(() => {
    axios.get('https://e-commerce-model.onrender.com/products/')
      .then(response => {
        if (filter.length > 0) {
          const filteredProducts = response.data.filter(product => product[`${searchProperty}`] === `${parameter}`);
          const newFilteredProducts = filteredProducts.filter(obj => {
            let match = true;
            for (let i = 0; i < filter.length; i++) {
              const [propertyName, propertyValue] = filter[i].split(':');
              if (obj[propertyName] !== propertyValue) {
                match = false;
                break;
              }
            }
            return match;
          }).map(obj => obj.id);
          setProducts(newFilteredProducts);
        }
 
        const filteredProducts = response.data.filter(product => product[`${searchProperty}`] === `${parameter}`);
        setProducts(filteredProducts)
      })
      .catch(error => console.log(error));
  }, []);

return (
 <div>
    {products.map(product => (
      <div key={product.id} className="product">
        <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={product.name} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <hr />
          <h4>Price: ${product.price}</h4>
          <AddToCartButton button="cart"/>
          <AddToCartButton button="wishlist"/>
          <AddToCartButton button="buy_now"/>
        </Col>
      </Row>
    </Container>

      </div>
    ))
    }
  </div>
  );
}
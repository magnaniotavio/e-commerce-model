import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function SearchProducts(parameter) {
    
const [products, setProducts] = useState([]);

useEffect(() => {
    axios.get('https://e-commerce-model.onrender.com/products/')
      .then(response => {
        const filteredProducts = response.data.filter(product => product._id === `${parameter}`);
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
          <button className="btn btn-primary mt-3">Add to Cart</button>
        </Col>
      </Row>
    </Container>
      </div>
    ))
    }
  </div>
  );
}

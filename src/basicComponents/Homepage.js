import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Row, Col, Image, ListGroup, Card, Button, Form, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons';
import productPic from '../images/productPic.png';

export default function Homepage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let isMounted = true;
    axios
      .get('https://e-commerce-model.onrender.com/products/')
      .then((response) => {
        const filteredProducts = response.data.slice(0, 5); // limit the products to at most five items
        if (isMounted) {
          setProduct(filteredProducts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <Carousel pause="hover" style={{backgroundColor: 'lightgrey'}}>
        {product.map((p) => (
          <Carousel.Item key={p._id}>
            <Row className="justify-content-center">
              <Col md={6}>
                <Image src={productPic} alt={p.name} fluid />
              </Col>
              <Col md={6}>
              <h3><Link  to={`/product/${p._id}`}>{p.name}</Link></h3>
                <ReactMarkdown>{p.description}</ReactMarkdown>
                <p className="mt-3">{`$${p.price}`}</p>
                <TypicalButtonPresentation productId={p._id} />
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

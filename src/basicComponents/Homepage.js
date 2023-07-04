import axios from 'axios';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TypicalButtonPresentation } from '../payment/CartWishlistAndBuyNowButtons'; // Importing the standardad button presentation of the app
import productPic from '../images/productPic.png'; //  Imports a mock picture to accompany the products

export default function Homepage() {
  const [product, setProduct] = useState([]);

  function truncateString(str, maxLength) {
    if (str && str.split(' ').length > maxLength) {
      const words = str.split(' ');
      const truncated = words.slice(0, maxLength).join(' ');
      return `${truncated}...`;
    }
    return str;
  }
    
  // Retrieves five items from the '/products' endpoint
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

  // Maps through the products and shows them in a typical carrousel style
  return (
    <Container>
      <Carousel pause="hover" style={{backgroundColor: 'lightgrey'}}>
        {product.map((p) => (
          <Carousel.Item key={p._id} className="justify-content-center">
            <Row>
              <Col md={6}>
                <Image src={productPic} alt={p.name} fluid />
              </Col>
              <Col md={5} style={{paddingTop: '15px' }}>
              <h3><Link  to={`/product/${p._id}`}>{p.name}</Link></h3>
                <ReactMarkdown>{truncateString(p.description, 30)}</ReactMarkdown>
                <p>Price: {`$${p.price}`}</p>
                <TypicalButtonPresentation productId={p._id} style={{paddingBottom: '10px' }}/>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

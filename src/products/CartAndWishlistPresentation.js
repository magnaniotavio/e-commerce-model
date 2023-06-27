import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { AddToCartButton } from '../payment/CartWishlistAndBuyNowButtons';
import { selectorInput } from '../basicComponents/JSXFunctions';

// This style of product presentation is occupies less space than the other one, and does not use a picture
export function ListExhibition({ItensToShow, quantity, setQuantity, listName}) {
return (
    <div>
      <Container>
        <Row>
          {ItensToShow.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Body>
                  <Card.Title><Link  to={`/product/${product._id}`}>{product.name}</Link></Card.Title>
                  <Card.Text>{product.brand}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Form>
                {quantity && setQuantity &&
                <Form.Group>
                    {selectorInput('Select Quantity', quantity, setQuantity, ['1', '2', '3', '4', '5'] )}                    
                </Form.Group> } 
                {listName === 'wishlist' && 
                <>
                    <AddToCartButton button="cart" productId={product._id}/>
                    <AddToCartButton button="buy_now" productId={product._id}/>
                    <AddToCartButton button="remove_from_wishlist" productId={product._id}/>
                </>
                }
                {listName === 'shopping_cart' && 
                <>
                    <AddToCartButton button="buy_now" productId={product._id}/>
                    <AddToCartButton button="remove_from_cart" productId={product._id}/>
                </>
                }
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
} 
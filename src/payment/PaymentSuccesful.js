import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const PaymentSuccessPage = () => {
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Payment Successful</h1>
          <p>Thank you for your payment!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccessPage;

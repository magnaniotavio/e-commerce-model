import React from "react";
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-3" style={{ marginTop: 30 }}>
        <Container>
          <Row>
            <Col md={6}>
              <h4>About Us</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                sagittis, ipsum nec eleifend placerat, mi purus consequat mi, id
                viverra arcu purus vel lorem.
              </p>
            </Col>
            <Col md={3}>
              <h4>Quick Links</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shop</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <h4>Connect With Us</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr />
          <p className="text-center">
            &copy; {new Date().getFullYear()} My E-commerce Store. All Rights
            Reserved.
          </p>
        </Container>
      </footer>
    )
}
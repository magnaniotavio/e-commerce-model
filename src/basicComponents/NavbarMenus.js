import React from "react";
import { Nav, Navbar, Col, Row, Dropdown, Button, Form, Container } from "react-bootstrap";
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Logout from "../users/Logout";

export function WebsiteTitle() {
    return (
        <Container fluid>
        <Navbar.Brand><Link to="/homepage">Clothes Store</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
  </Navbar.Collapse>
  </Container>
    )
}

export function AdminNavBar({userRole}) {
    return (
    <Nav className="mr-auto">
    {userRole === "Administrator" && (
      <>
            <Link to="/create" className="nav-link">Create Post</Link>
            <Link to="/edit" className="nav-link">Edit Post</Link>
            <Link to="/postlist" className="nav-link">Posts</Link>
            <Link to="/userlist" className="nav-link">Users</Link>
      </>
  )}
   {userRole === "Administrator" || userRole === "Employee" || userRole === "Supplier" ? (
    <>
           <Link to="/create_product" className="nav-link">Create Product</Link>
           <Link to="/edit_product" className="nav-link">Edit Product</Link>
           <Link to="/product_list" className="nav-link">Products</Link>
    </>
   ) : null }
   </Nav>
   )
}
// <UserNavBar isLoggedIn={isLoggedIn} userName={userName} routeChange={routeChange} userId={userId} />
export function UserNavBar({isLoggedIn, userName, routeChange, userId}) {
    return (
        <Col>
        {isLoggedIn ? (
          <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Wellcome Back, {userName}!
          Your account
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item value="profile" onClick={() => routeChange("profile/" + userId)}>Your Profile</Dropdown.Item>
          <Dropdown.Item value="profile" onClick={() => routeChange("users/shopping_cart/" + userId)}>Your Cart</Dropdown.Item>
          <Dropdown.Item value="profile" onClick={() => routeChange("users/wishlist/" + userId)}>Your Wishlist</Dropdown.Item>
          <Dropdown.Item value="profile" onClick={() => routeChange("your_orders/" + userId)}>Your Orders</Dropdown.Item>
          <Dropdown.Item><Logout /></Dropdown.Item> 
          </Dropdown.Menu>
        </Dropdown>
        ) : (
          <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Sign in
          </Dropdown.Toggle>
          <Dropdown.Menu>
           <Dropdown.Item value="login" onClick={() => routeChange("login")}>Click here to login!</Dropdown.Item> 
           <Dropdown.Item value="registration" onClick={() => routeChange("registration")}>Not a member? Click here to Register!</Dropdown.Item> 
          </Dropdown.Menu>
        </Dropdown>
  )}
        </Col>
  
    )
}

export function NavBarMenu({routeChange, handleFilterChange, handleArrayFilterChange, handleToggleExpand, isExpanded, HandleSearch }) {
    return (
        <Nav>
        <Navbar bg="dark" expand="lg" style={{ color: 'white', paddingLeft: '1%', paddingRight: '1%', width:'100%'}}>
         <Row>
                   <Col>
                     <Dropdown>
                       <Dropdown.Toggle variant="dark" id="dropdown-basic">
                         Masculine
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                         <Dropdown.Item value="announcements/page/1" onClick={() => routeChange("announcements/page/1")}>Route 1</Dropdown.Item>
                         <Dropdown.Item value="Shirt" onClick={() => routeChange("masculine/shirts")} >Shirts</Dropdown.Item>
                         <Dropdown.Item value="Trouser" onClick={() => routeChange("masculine/trousers")} >Trousers</Dropdown.Item>
                         <Dropdown.Item value="Shoe" onClick={() => routeChange("masculine/shoes")} >Shoes</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                   <Col>
                     <Dropdown>
                       <Dropdown.Toggle variant="dark" id="dropdown-basic">
                         Feminine
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                       <Dropdown.Item value="Shirt (Feminine)" onClick={() => routeChange("feminine/shirts")} >Shirts</Dropdown.Item>
                         <Dropdown.Item value="Trouser (Feminine)" onClick={() => routeChange("feminine/trousers")} >Trousers</Dropdown.Item>
                         <Dropdown.Item value="Shoe (Feminine)" onClick={() => routeChange("feminine/shoes")} >Shoes</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                   <Col>
                     <Dropdown>
                       <Dropdown.Toggle variant="dark" id="dropdown-basic">
                         Kids
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                       <Dropdown.Item value="Shirt (Kids)" onClick={() => routeChange("kids/shirts")} >Shirts</Dropdown.Item>
                         <Dropdown.Item value="Trouser (Kids)" onClick={() => routeChange("kids/trousers")} >Trousers</Dropdown.Item>
                         <Dropdown.Item value="Shoe (Kids)" onClick={() => routeChange("kids/shoes")} >Shoes</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                  <Col className="align-self-end">
                  <Button
                    variant="outline-secondary"
                    onClick={handleToggleExpand}
                    aria-expanded={isExpanded}
                    aria-controls="reviews-collapse"
                    bg="dark"
                    expand="sm"
                    style={{ color: 'white', paddingLeft: '0.5rem', paddingRight: '0.5rem', fontSize: '14px', border: 'none' }}
                  >
                    <h3 className="m-0 mr-2" style={{ color: 'white', fontSize: '16px' }}>
                      Advanced Search
                    </h3>
                    {isExpanded ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
                  </Button>
                  <div className={`collapse${isExpanded ? ' show' : ''}`} id="reviews-collapse">
                    <Form>
                      <Row >
                        {/* Public Filter */}
                        <Col xs={12} sm={6}>
                          <Form.Group controlId="colorFilter">
                            <Form.Label>Category</Form.Label>
                            <Form.Check
                              type="checkbox"
                              id="publicFeminine"
                              label="Feminine"
                              onChange={() => handleFilterChange('targetPublic:Feminine')}
                            />
                            <Form.Check
                              type="checkbox"
                              id="publicMasculine"
                              label="Masculine"
                              onChange={() => handleFilterChange('targetPublic:Masculine')}
                            />
                            <Form.Check
                              type="checkbox"
                              id="publicKids"
                              label="Kids"
                              onChange={() => handleFilterChange('targetPublic:Kids')}
                            />
                          </Form.Group>
                          {/* Public Filter */}
                          <Form.Group controlId="colorFilter">
                            <Form.Label>Category</Form.Label>
                            <Form.Check
                              type="checkbox"
                              id="shirts"
                              label="Shirts"
                              onChange={() =>
                                handleArrayFilterChange([
                                  'classification:ShirtM',
                                  'classification:ShirtF',
                                  'classification:ShirtK',
                                ])
                              }
                            />
                            <Form.Check
                              type="checkbox"
                              id="trousers"
                              label="Trousers"
                              onChange={() =>
                                handleArrayFilterChange([
                                  'classification:TrouserM',
                                  'classification:TrouserF',
                                  'classification:TrouserK',
                                ])
                              }
                            />
                            <Form.Check
                              type="checkbox"
                              id="shoes"
                              label="Shoes"
                              onChange={() =>
                                handleArrayFilterChange(['classification:ShoeM', 'classification:ShoeF'])
                              }
                            />
                          </Form.Group>
                        </Col>
                        {/* Color Filter */}
                        <Col xs={12} sm={6}>
                          <Form.Group controlId="colorFilter">
                            <Form.Label>Color</Form.Label>
                            <Form.Check
                              type="checkbox"
                              id="colorRed"
                              label="White"
                              onChange={() => handleFilterChange('color:White')}
                            />
                            <Form.Check
                              type="checkbox"
                              id="colorBlue"
                              label="Black"
                              onChange={() => handleFilterChange('color:Black')}
                            />
                            <Form.Check
                              type="checkbox"
                              id="colorGreen"
                              label="Blue"
                              onChange={() => handleFilterChange('color:Blue')}
                            />
                          </Form.Group>
                
                          {/* Brand Filter */}
                          <Form.Group controlId="brandFilter">
                            <Form.Label>Brand</Form.Label>
                            <Form.Check
                              type="checkbox"
                              id="brandNike"
                              label="Nike"
                              onChange={() => handleFilterChange('brand:Nike')}
                            />
                            <Form.Check
                              type="checkbox"
                              id="brandAdidas"
                              label="Adidas"
                              onChange={() => handleFilterChange('brand:Adidas')}
                            />
                            <Form.Check
                              type="checkbox"
                              id="brandPuma"
                              label="Puma"
                              onChange={() => handleFilterChange('brand:Puma')}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* Size Filter */}
                      <Form.Group controlId="sizeFilter">
                        <Form.Label>Size</Form.Label>
                        <Form.Check
                          type="checkbox"
                          id="sizeS"
                          label="S"
                          onChange={() => handleFilterChange('sizeSML:S')}
                        />
                        <Form.Check
                          type="checkbox"
                          id="sizeM"
                          label="M"
                          onChange={() => handleFilterChange('sizeSML:M')}
                        />
                        <Form.Check
                          type="checkbox"
                          id="sizeL"
                          label="L"
                          onChange={() => handleFilterChange('sizeSML:L')}
                        />
                      </Form.Group>
                
                      {/* Search Button */}
                      <Button variant="primary" onClick={HandleSearch}>
                        Search
                      </Button>
                    </Form>
                  </div>
                </Col>
           </Row>
           </Navbar>
        </Nav>
    )
}
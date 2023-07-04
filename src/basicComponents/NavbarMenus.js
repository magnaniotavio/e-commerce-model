import React from "react";
import { Nav, Navbar, Col, Row, Dropdown, Button, Form, Container } from "react-bootstrap";
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Logout from "../users/Logout";

// Displays the WebsiteTitle, which links back to the homepage when clicked
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

// Navbar which only users with Administrator status can see
export function AdminNavBar({isLoggedIn, userRole}) {
    return (
      <Nav className="mr-auto">
      {isLoggedIn ? (
        <>
          {userRole === "Administrator" && (
            <>
              <Link to="/create" className="nav-link">Create Post</Link>
              <Link to="/edit" className="nav-link">Edit Post</Link>
              <Link to="/postlist" className="nav-link">Posts</Link>
              <Link to="/userlist" className="nav-link">Users</Link>
            </>
          )}
          {(userRole === "Administrator" || userRole === "Employee" || userRole === "Supplier") && (
            <>
              <Link to="/create_product" className="nav-link">Create Product</Link>
              <Link to="/edit_product" className="nav-link">Edit Product</Link>
              <Link to="/product_list" className="nav-link">Products</Link>
            </>
          )}
        </>
      ) : null}
    </Nav>
     )
}

/* When the user is logged in, this menus gives them access to the basic information of their profile.
   When they are logged out, they see a 'Sign in' option. */
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

// Sets category routes (masculine, feminine, kids, shirts, trousers, shoes); and advanced search routes (by color, by brand, etc.)
export function NavBarMenu({routeChange, handleFilterChange, handleToggleExpand, isExpanded, HandleSearch }) {
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
                         <Dropdown.Item value="Shirt" onClick={() => routeChange("masculine/shirts/page/1")} >Shirts</Dropdown.Item>
                         <Dropdown.Item value="Trouser" onClick={() => routeChange("masculine/trousers/page/1")} >Trousers</Dropdown.Item>
                         <Dropdown.Item value="Shoe" onClick={() => routeChange("masculine/shoes/page/1")} >Shoes</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                   <Col>
                     <Dropdown>
                       <Dropdown.Toggle variant="dark" id="dropdown-basic">
                         Feminine
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                       <Dropdown.Item value="Shirt (Feminine)" onClick={() => routeChange("feminine/shirts/page/1")} >Shirts</Dropdown.Item>
                         <Dropdown.Item value="Trouser (Feminine)" onClick={() => routeChange("feminine/trousers/page/1")} >Trousers</Dropdown.Item>
                         <Dropdown.Item value="Shoe (Feminine)" onClick={() => routeChange("feminine/shoes/page/1")} >Shoes</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                   <Col>
                     <Dropdown>
                       <Dropdown.Toggle variant="dark" id="dropdown-basic">
                         Kids
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                       <Dropdown.Item value="Shirt (Kids)" onClick={() => routeChange("kids/shirts/page/1")} >Shirts</Dropdown.Item>
                         <Dropdown.Item value="Trouser (Kids)" onClick={() => routeChange("kids/trousers/page/1")} >Trousers</Dropdown.Item>
                         <Dropdown.Item value="Shoe (Kids)" onClick={() => routeChange("kids/shoes/page/1")} >Shoes</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                   <Col>
                     <Dropdown>
                       <Dropdown.Toggle variant="dark" id="dropdown-basic">
                         Our blog and news
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                       <Dropdown.Item value="announcements/page/1" onClick={() => routeChange("announcements/page/1")}>Announcements</Dropdown.Item>
                       <Dropdown.Item value="blogposts/page/1" onClick={() => routeChange("blogposts/page/1")}>Blogposts</Dropdown.Item>
                       </Dropdown.Menu>
                     </Dropdown>
                   </Col>
                  <Col className="align-self-end">
                  <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                       Advanced Search
                      </Dropdown.Toggle>
                       <Dropdown.Menu>
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
                                    onChange={() => handleFilterChange(['targetPublic:Feminine'])}
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    id="publicMasculine"
                                    label="Masculine"
                                    onChange={() => handleFilterChange(['targetPublic:Masculine'])}
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    id="publicKids"
                                    label="Kids"
                                    onChange={() => handleFilterChange(['targetPublic:Kids'])}
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
                                      handleFilterChange([
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
                                      handleFilterChange([
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
                                      handleFilterChange(['classification:ShoeM', 'classification:ShoeF', 'classification:ShoeK'])
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
                                    onChange={() => handleFilterChange(['color:White'])}
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    id="colorBlue"
                                    label="Black"
                                    onChange={() => handleFilterChange(['color:Black'])}
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    id="colorGreen"
                                    label="Blue"
                                    onChange={() => handleFilterChange(['color:Blue'])}
                                  />
                                </Form.Group>
                      
                                {/* Brand Filter */}
                                <Form.Group controlId="brandFilter">
                                  <Form.Label>Brand</Form.Label>
                                  <Form.Check
                                    type="checkbox"
                                    id="brandNike"
                                    label="Nike"
                                    onChange={() => handleFilterChange(['brand:Nike'])}
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    id="brandAdidas"
                                    label="Adidas"
                                    onChange={() => handleFilterChange(['brand:Adidas'])}
                                  />
                                  <Form.Check
                                    type="checkbox"
                                    id="brandPuma"
                                    label="Puma"
                                    onChange={() => handleFilterChange(['brand:Puma'])}
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
                                onChange={() => handleFilterChange(['sizeSML:S'])}
                              />
                              <Form.Check
                                type="checkbox"
                                id="sizeM"
                                label="M"
                                onChange={() => handleFilterChange(['sizeSML:M'])}
                              />
                              <Form.Check
                                type="checkbox"
                                id="sizeL"
                                label="L"
                                onChange={() => handleFilterChange(['sizeSML:Large'])}
                              />
                            </Form.Group>
                            {/* Search Button */}
                            <Button variant="primary" onClick={HandleSearch}>
                              Search
                            </Button>
                          </Form>
                      </Dropdown.Menu>
                      </Dropdown>
                </Col>
           </Row>
           </Navbar>
        </Nav>
    )
}
import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import CreatePost from "./posts/Create";
import CreateProduct from './products/CreateProduct';
import EditPost from "./posts/Edit";
import List from "./posts/PostList";
import Homepage from "./basicComponents/Homepage";
import { Announcements } from './posts/PostRoutes';
import PostPage from './posts/PostPage';
import ProductPage from './products/ProductPage';
import ProductsList from './products/ProductList';
import { ShirtsRoute, TrousersRoute, ShoesRoute, FeminineShirtsRoute, FeminineTrousersRoute, FemininineShoesRoute,
KidsShirtsRoute, KidsShoesRoute, KidsTrousersRoute, } from './products/ProductRoutes';
import EditProduct from './products/EditProduct';
import EditProfile from './users/EditProfile';
import Register from './users/Register';
import Login from './users/Login';
import Footer from './basicComponents/Footer';
import Profile from './users/ProfilePage';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import Wishlist from './users/Wishlist';
import { returnUserData, returnUserId } from './users/UserId';
import ShoppingCart from './users/Cart';
import UserList from './users/UserList';
import { useLocation } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './payment/CheckoutForm';
import axios from 'axios';
import PaymentSuccessPage from './payment/PaymentSuccesful';
import SearchResults from './searchComponents/SearchResults';
import UserOrders from './users/UserPurchases';
import EditUser from './users/EditUser';
import { NavbarFilterFunctions, NavbarFilter } from './searchComponents/FiltersNavBar';
import { MakeFilteredSearch } from './searchComponents/FilteredSearch';
import SearchBar from './searchComponents/SearchBar';
import { WebsiteTitle, NavBarMenu, AdminNavBar, UserNavBar } from './basicComponents/NavbarMenus';

const stripePromise = loadStripe('pk_test_51N6tO8EFMUty2Z9O0hadXLSAFUfCFaIWnTNZACAAS1XQTXZBrkGU9bHyHCj3jcMxUbobDet4S0lVtziZWsTQYUge00s53cZ5Eu');

export default function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 let navigate = useNavigate(); 
 const cookies = new Cookies();
 const token = cookies.get("TOKEN");
 const userId = returnUserId();
 const userName = returnUserData('userEmail')
 const userRole = returnUserData('user_role')
 const [searchResults, setSearchResults] = useState([]);
 const [searchTerm, setSearchTerm] = useState([]);
 const [isExpanded, setIsExpanded] = useState(false);
 const handleToggleExpand = () => {
   setIsExpanded(!isExpanded);
 };

 const location = useLocation();
 const pathParams = location.pathname.split('/');
 const { selectedFilters, handleFilterChange, handleArrayFilterChange, HandleSearch} = NavbarFilterFunctions();

 function handleSearch(searchText, classification) {
  setSearchResults([])
  setSearchTerm(searchText)
  navigate(`/search/${classification}/${searchText}/page/1`);
  const specialChars = /[^\w\s]/g;
  axios.get('http://localhost:4000/products/')
    .then(response => {
       if (classification !== "undefined") {
        const foundCategory = response.data.filter(post => post.classification === classification);
        if (foundCategory) {
          const foundPosts = foundCategory.filter(post => post.name.toLowerCase().replace(specialChars, '').includes(searchText.toLowerCase().replace(specialChars, '')));
          setSearchResults(foundPosts);  
        }
      }
      else {
        const foundPosts = response.data.filter(post => post.name.toLowerCase().replace(specialChars, '').includes(searchText.toLowerCase().replace(specialChars, '')));
        setSearchResults(foundPosts);
      }
      })
    .catch(error => {
      console.log(error);
    });
};

useEffect(() => {
  if (pathParams[1] === 'search' && pathParams.length === 6) {
    setSearchResults([])
    const searchTerm = pathParams[3];
    handleSearch(pathParams[3], pathParams[2])
}}, []);

const routeChange = (value) =>{ 
  let path = '/' + value; 
  navigate(path);
}

useEffect(() => {
  if (token) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
}, [token]);

 return (
    <Elements stripe={stripePromise}>
    <Container class="body">
        <AdminNavBar userRole={userRole} />
        <Navbar bg="dark" expand="lg" style={{ color: 'white', paddingLeft: '1%', paddingRight: '1%', height: '160px'}}>
           <WebsiteTitle />
           <Row className="w-100">
             <SearchBar onSearch={handleSearch} />
             <UserNavBar isLoggedIn={isLoggedIn} userName={userName} routeChange={routeChange} userId={userId} />
           </Row>
       </Navbar> 
       <NavBarMenu routeChange={routeChange} handleFilterChange={handleFilterChange} handleArrayFilterChange={handleArrayFilterChange}
       handleToggleExpand={handleToggleExpand} isExpanded={isExpanded} HandleSearch={HandleSearch} />
    <br></br>
    <Routes style={{ color: 'black', paddingLeft: '1%', paddingRight: '1%'}}>
       <Route path="/homepage" element={<Homepage />} />
       <Route path="/contact" element={<loremIpsum />} />
       <Route path="/users/wishlist/:id" element={<Wishlist />} />
       <Route path="/users/shopping_cart/:id" element={<ShoppingCart />} />
       <Route path="/shopping_cart/:id" element={<ShoppingCart />} />
       <Route path="/blog" element={<loremIpsum />} />
       <Route path="/announcements/page/:pageNumber" element={<Announcements />} />
       <Route path="/edit" element={<EditPost />} />
       <Route path="/create" element={<CreatePost />} />    
       <Route path="/create_product" element={<CreateProduct />} />
       <Route path="/edit_product/" element ={<EditProduct />} />
       <Route path="/edit_product/:id" element ={<EditProduct />} />
       <Route path="product/:id" element={<ProductPage />} />
       <Route path="/product_list" element={<ProductsList />} />
       <Route path="/postlist" element={<List />} />
       <Route path="/userlist" element={<UserList />} />
       <Route path="/edit/:id" element={<EditPost />} />
       <Route path="/:newClassification/:newTitle/:id" element={<PostPage />} />       
       <Route path="/profile/:id" element={<Profile />} />
       <Route path="/your_orders/:id" element={<UserOrders />} />
       <Route path="/login" element={<Login />} />
       <Route path="/registration" element={<Register />} />
       <Route path="/edit_profile/:id" element={<EditProfile />} />
       <Route path="/products/checkout_form/:id" element={<CheckoutForm />} />
       <Route path="/products/payment_succesful/" element={<PaymentSuccessPage />} />
       <Route path="/search/:classification/:searchTerm/page/*"  element={<SearchResults results={searchResults} searchTerm={searchTerm} classification={pathParams[2]} />} />
       <Route path="/edit_user/:id"  element={<EditUser />} />
       <Route path="/masculine/shirts" element={<ShirtsRoute />} />
       <Route path="/masculine/trousers" element={<TrousersRoute />} />
       <Route path="/masculine/shoes" element={<ShoesRoute />} />
       <Route path="/feminine/shirts" element={<FeminineShirtsRoute />} />
       <Route path="/feminine/trousers" element={<FeminineTrousersRoute />} />
       <Route path="/feminine/shoes" element={<FemininineShoesRoute />} />
       <Route path="/kids/shirts" element={<KidsShirtsRoute />} />
       <Route path="/kids/trousers" element={<KidsTrousersRoute />} />
       <Route path="/kids/shoes" element={<KidsShoesRoute />} />
      <Route path="/products/*" element={<MakeFilteredSearch selectedFilters={selectedFilters} />} />
    </Routes>
    <Footer/>
    </Container>
    </ Elements>
  );
}



/*     

        <Container fluid>
             <Navbar.Brand><Link to="/homepage">Clothes Store</Link></Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
       </Navbar.Collapse>
       </Container>

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








      <Container>
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="navbar-filter" />
      <Navbar.Collapse id="navbar-filter">
        <Nav className="mr-auto">
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Container>

















<Row>
                 <Col>
                   <Dropdown>
                     <Dropdown.Toggle variant="dark" id="dropdown-basic">
                       Masculine
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                       <Dropdown.Item value="Route1/page/1" onClick={() => routeChange("Route1/page/1")}>Route 1</Dropdown.Item>
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
              
                    <Button variant="primary" onClick={HandleSearch}>
                      Search
                    </Button>
                  </Form>
                </div>
              </Col>
         </Row> */
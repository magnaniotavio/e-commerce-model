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
import { Announcements, Blogposts } from './posts/PostRoutes';
import PostPage from './posts/PostPage';
import ProductPage from './products/ProductPage';
import ProductsList from './products/ProductList';
import {
  ShirtsRoute, TrousersRoute, ShoesRoute, FeminineShirtsRoute, FeminineTrousersRoute, FemininineShoesRoute,
  KidsShirtsRoute, KidsShoesRoute, KidsTrousersRoute,
} from './products/ProductRoutes';
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
import { returnUserData, returnUserId, ReturnUserProperties, ReturnUserRole } from './users/UserId';
import ShoppingCart from './users/Cart';
import UserList from './users/UserList';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
import { Unauthorized } from './basicComponents/Unauthorized';

// This stripe promise is necessary for the mock payments offereded by Stripe
const stripePromise = loadStripe('pk_test_51N6tO8EFMUty2Z9O0hadXLSAFUfCFaIWnTNZACAAS1XQTXZBrkGU9bHyHCj3jcMxUbobDet4S0lVtziZWsTQYUge00s53cZ5Eu');

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const userId = returnUserId();
  const userName = returnUserData('userEmail')
  const userRole = ReturnUserProperties('user_role')
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const location = useLocation();
  const pathParams = location.pathname.split('/');
  const { selectedFilters, handleFilterChange, HandleSearch } = NavbarFilterFunctions();

  function handleSearch(searchText, classification) {
    // Resets the search results no none, so that they will not show up one on top of each other
    setSearchResults([])
    setSearchTerm(searchText)
    // Navigates to the search page
    navigate(`/search/${classification}/${searchText}/page/1`);
    const specialChars = /[^\w\s]/g;
    axios.get('https://e-commerce-model.onrender.com/products/')
      .then(response => {
        // First filter: products that correspond to the classification (i.e. 'masculine trousers' or 'feminine shirts')
        if (classification !== "undefined") {
          const foundCategory = response.data.filter(post => post.classification === classification);
          // Second filter: products whose name includes the search term
          if (foundCategory) {
            const foundPosts = foundCategory.filter(post => post.name.toLowerCase().replace(specialChars, '').includes(searchText.toLowerCase().replace(specialChars, '')));
            setSearchResults(foundPosts);
          }
        }
        // General, unfiltered search
        else {
          const foundPosts = response.data.filter(post => post.name.toLowerCase().replace(specialChars, '').includes(searchText.toLowerCase().replace(specialChars, '')));
          setSearchResults(foundPosts);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Shows a loading message when a component hasn't loaded yet
  function DelayedComponent({ component }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }, []);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return component;
  }

  // This function allows us to make a search by simply copying and pasting the search URL onto the browser
  useEffect(() => {
    if (pathParams[1] === 'search' && pathParams.length === 6) {
      // Resets search results to none, so that previous results won't show up on top of the new ones
      setSearchResults([])
      const searchTerm = pathParams[3];
      // Applies the handleSearch() to the search term and search classification found by useParams()
      handleSearch(pathParams[3], pathParams[2])
    }
  }, []);

  // Navigates to the route according to the selected value in the navbar
  const routeChange = (value) => {
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
      <Container className="body">
        {/* Routes available only to the Admin */}
        <div className="bg-dark text-light py-3" style={{ marginTop: 30 }}>
          <AdminNavBar isLoggedIn={isLoggedIn} userRole={userRole} />
          {/* Navbar with search and login/logout functionalities */}
          <WebsiteTitle />
          <SearchBar onSearch={handleSearch} />
          {/* Menu containing all the different routes and advanced search filters */}
          <NavBarMenu routeChange={routeChange} handleFilterChange={handleFilterChange}
            handleToggleExpand={handleToggleExpand} isExpanded={isExpanded} HandleSearch={HandleSearch}
            SignInMenu={<UserNavBar isLoggedIn={isLoggedIn} userName={userName} routeChange={routeChange} userId={userId} />
            }
          />
        </div>
        <br></br>
        <Container className="d-flex flex-column" style={{ flexGrow: 1, minHeight: '50vh' }}>
          <Routes className="flex-grow-1" style={{ color: 'black', paddingLeft: '1%', paddingRight: '1%' }}>
            <Route path="/homepage" element={<DelayedComponent component={<Homepage />} />} />
            <Route path="/unauthorized" element={<DelayedComponent component={<Unauthorized />} />} />
            <Route path="/contact" element={<loremIpsum />} />
            <Route path="/users/wishlist/:id" element={<Wishlist />} />
            <Route path="/users/shopping_cart/:id" element={<ShoppingCart />} />
            <Route path="/shopping_cart/:id" element={<ShoppingCart />} />
            <Route path="/blog" element={<loremIpsum />} />
            <Route path="/announcements/page/:pageNumber" element={<Announcements />} />
            <Route path="/blogposts/page/:pageNumber" element={<Blogposts />} />
            <Route path="/edit" element={<EditPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/create_product" element={<CreateProduct />} />
            <Route path="/edit_product/" element={<EditProduct />} />
            <Route path="/edit_product/:id" element={<EditProduct />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/product_list" element={<ProductsList />} />
            <Route path="/postlist" element={<List />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/:classification/:title/:id" element={<PostPage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/your_orders/:id" element={<UserOrders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/edit_profile/:id" element={<EditProfile />} />
            <Route path="/products/checkout_form/:id" element={<CheckoutForm />} />
            <Route path="/products/payment_succesful/" element={<PaymentSuccessPage />} />
            <Route path="/search/:classification/:searchTerm/page/*" element={<SearchResults results={searchResults} searchTerm={searchTerm} classification={pathParams[2]} />} />
            <Route path="/edit_user/:id" element={<EditUser />} />
            <Route path="/masculine/shirts/page/*" element={<ShirtsRoute />} />
            <Route path="/masculine/trousers/page/*" element={<TrousersRoute />} />
            <Route path="/masculine/shoes/page/*" element={<ShoesRoute />} />
            <Route path="/feminine/shirts/page/*" element={<DelayedComponent component={<FeminineShirtsRoute />} />} />
            <Route path="/feminine/trousers/page/*" element={<FeminineTrousersRoute />} />
            <Route path="/feminine/shoes/page/*" element={<FemininineShoesRoute />} />
            <Route path="/kids/shirts/page/*" element={<KidsShirtsRoute />} />
            <Route path="/kids/trousers/page/*" element={<KidsTrousersRoute />} />
            <Route path="/kids/shoes/page/*" element={<KidsShoesRoute />} />
            <Route path="/products/*" element={<MakeFilteredSearch selectedFilters={selectedFilters} />} />
            <Route path="/products/*/:searchTerm/page/*" element={<MakeFilteredSearch selectedFilters={selectedFilters} />} />
          </Routes>
        </Container>
        <Footer />
      </Container>
    </ Elements>
  );
}
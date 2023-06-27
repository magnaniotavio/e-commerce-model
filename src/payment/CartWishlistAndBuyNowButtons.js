import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup } from 'react-bootstrap';
import { returnUserId, returnUserName } from '../users/UserId';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { CheckForUser } from '../basicComponents/CheckForToken';

/* This function returns different buttons according to the parameters with which we call it.
   With them, and the next two functions below, our user will be allowed to: 
   1) Add and remove products from his Shopping Cart; 
   2) Add and remove products from his Wishlist; 
   3) Buy products without having to go to the specific product page, making it quicker. */

export function AddToCartButton({button, productId}) {
 /* let decoded;
  const cookies = new Cookies();   
  const token = cookies.get("TOKEN");
  decoded = jwtDecode(token);
  const userId = decoded.userId; */

  const userId = returnUserId()
  const navigate = useNavigate();  
  const {id} = useParams();

    // const username = returnUserName()
  /*const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleExpand = () => {
      setIsExpanded(!isExpanded);
    }; */
      /*const [userReview, setUserReview] = useState({
      id: userId,
      name: username,
      content: '',
    }) */

  const [currentWishlist, setCurrentWishlist] = useState([])
  const [currentShoppingCart, setCurrentShoppingCart] = useState([])
  const [product, setProduct] = useState({
      name: '',
      color: '',
      brand: '',
      price: '',
      classification: '',
      sizeSML: '',
      sizeNumber: '',
      customerReview: [],
      popularity: '',
      condition: '',
      availability: '',
      description: '',
      creationDate: '',
      lastEdited: '',
    });


  /*useEffect(() => {
        if (!token) {
          navigate("/homepage");
        } 
        else if ( !userId) {
          navigate("/homepage")
        }
        else {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } 
      }, [navigate, token]);  */

  // Gets and sets the current product
  useEffect(() => {
  let isMounted = true;
  axios.get(`https://e-commerce-model.onrender.com/products/${productId}`)
    .then(response => {
      if (isMounted) {
        setProduct({
          name: response.data.name,
          color: response.data.color,
          brand: response.data.brand,
          price: response.data.price,
          classification: response.data.classification,
          sizeSML: response.data.sizeSML,
          sizeNumber: response.data.sizeNumber,
          customerReview: response.data.customerReview,
          popularity: response.data.popularity,
          condition: response.data.condition,
          availability: response.data.availability,
          description: response.data.description,
          creationDate: response.data.creationDate,
          lastEdited: response.data.lastEdited
        });
      }
    })
    .catch(error => {
      console.log('error:', error);
    });
  return () => {
    isMounted = false;
  };
}, [id]);

  /*  useEffect(() => {
      let isMounted = true;
      axios.get(`https://e-commerce-model.onrender.com/products/${productId}`)
        .then(response => {
          if (isMounted) {
            setProduct({
              name: response.data.name,
              color: response.data.color,
              brand: response.data.brand,
              price: response.data.price,
              classification: response.data.classification,
              sizeSML: response.data.sizeSML,
              sizeNumber: response.data.sizeNumber,
              customerReview: response.data.customerReview,
              popularity: response.data.popularity,
              condition: response.data.condition,
              availability: response.data.availability,
              description: response.data.description,
              creationDate: response.data.creationDate,
              lastEdited: response.data.lastEdited
            });
          }
        })
        .catch(error => {
          console.log('error:', error);
        });
      return () => { isMounted = false };
    }, [userId]); */

    // Gets the wishlist and shopping carts of the user
    useEffect(() => {
      axios
        .get(`https://e-commerce-model.onrender.com/users/${userId}`)
        .then(response => {
          setCurrentWishlist(prevWishlist => response.data.wishlist);
          setCurrentShoppingCart(prevShoppingCart => response.data.shopping_cart);
        })
        .catch(error => console.error(error));
    }, [userId]);
  
    // Updates the shopping cart by adding the productId to it
    const onSubmitShoppingCart = (e, productId) => {
        e.preventDefault();
        const newShoppingCart = [...currentShoppingCart, productId];
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          shopping_cart: newShoppingCart
        })
          .then(navigate(`/users/shopping_cart/${userId}`)      )
          .catch(error => console.error(error));
    };

    // Updates the wishlist by adding the productId to it
    const onSubmitWishList = (e, productId) => {
        e.preventDefault();
        const newWishList = [...currentWishlist, productId];
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          wishlist: newWishList
        })
          .then(navigate(`/users/wishlist/${userId}`)      )
          .catch(error => console.error(error));
      }; 

      // Uses the productId to filter out the product from the wishlist
      const removeFromWishlist = (e) => {
        e.preventDefault();
        const updatedList = currentWishlist.filter((product) => product !== productId);
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          wishlist: updatedList
        })
        .then(() => {
          window.location.reload();
        })
              .catch(error => console.error(error));
      }; 

      // Uses the productId to filter out the product from the cart
      const removeFromCart = (e) => {
        e.preventDefault();
        const updatedCart = currentShoppingCart.filter((product) => product !== productId);
        axios.post(`https://e-commerce-model.onrender.com/users/update_user/${userId}`, {
          shopping_cart: updatedCart
        })
          .catch(error => console.error(error))
          .then(() => {
            window.location.reload();
          })  
      }; 


    const onSubmitBuyNow = async () => {
        // Create a payment intent with the product information
        const response = await fetch("https://e-commerce-model.onrender.com/products/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            productName: product.name,
            productPrice: product.price,
            currency: "usd",
          }),
        });
        const { clientSecret } = await response.json();
        // Redirect the user to the payment page with the product and payment information
        // P.S.: "productId" below refers to the function parameter, not the body property a few lines above this one
        navigate({
          pathname: `/products/checkout_form/${productId}`,
          state: {
            product: product,
            clientSecret: clientSecret,
          },
        });
      };

      return (
        <div>
            {button === 'cart' && (
              <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={(e) => onSubmitShoppingCart(e, productId)}>
                Add to Cart
              </Button>
            )}
            {button === 'wishlist' && (
              <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={(e) => onSubmitWishList(e, productId)}>
                Add to Wishlist
              </Button>
            )}
            {button === 'buy_now' && (
              <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={onSubmitBuyNow}>
                Buy Now
              </Button>
            )}
            {button === 'remove_from_wishlist' && (
              <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={(e) => removeFromWishlist(e)}>
                Remove From Wishlist
              </Button>
            )}
            {button === 'remove_from_cart' && (
              <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={(e) => removeFromCart(e)}>
                Remove From Cart
              </Button>
            )}
        </div>
        )       
}

// Shows a 'Login to buy' button which redirects the user to the login page, in case he wants to buy a product and is not logged in
export function LogInToBuy() {
    const navigate = useNavigate();  
    const onSubmitLoginToBuy = (event) => {
      event.preventDefault();
      navigate('/login');
    };

    return (
      <div>
        <Button variant="outline-dark" style={{backgroundColor: "black", color: "white"}} onClick={onSubmitLoginToBuy}>
          Log in to buy
        </Button>
     </div>
    )
}

// Shows a button presentation with the options: Add to Cart, Add to WishList, Buy Now, in case the user is already logged-in
export function TypicalButtonPresentation({prop}) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  return (
    <div>
    {isLoggedIn ? (
    <ButtonGroup>
    <AddToCartButton button="cart" productId={prop} />
    <AddToCartButton button="wishlist"  productId={prop} />
    <AddToCartButton button="buy_now"  productId={prop} />
  </ButtonGroup>
  ) :
   (<>
    <LogInToBuy />
   </>)
 }
 </div>
  )
}
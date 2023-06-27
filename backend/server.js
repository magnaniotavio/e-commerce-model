const express = require('express'); // Importing Express framework
require('dotenv').config(); // Loading environment variables from .env file
const app = express(); // Initializing Express app
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS
const mongoose = require('mongoose'); // MongoDB object modeling tool
app.use(cors()); // Using CORS middleware
app.use(bodyParser.json()); // Using body-parser middleware for JSON parsing

// Using Mongoose to connect with the Database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

// Stripe key for mock payments
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

// Routes
const postRoutes = express.Router();
const userRoutes = express.Router();
const productRoutes = express.Router();
const loginRoutes = express.Router();
const logoutRoutes = express.Router();
const orderRoutes = express.Router();

// Mongoose models for our Database, which will include posts, users, orders, and products
const newPost = require('./post.model');
const newUser = require("./user.model");
const newOrder = require("./order.model");
const newProduct = require("./product.model")

// baseURL and PORT
const baseURL = 'https://my-e-commerce-project.onrender.com/' || 'https://e-commerce-model.onrender.com/' || `http://localhost:10000 || 4000}`;
const PORT = process.env.PORT || 4000;

// Tokens for users, including expiration date
const jwt = require("jsonwebtoken");
const registrationTokenExpiration = "7d";

// Bcrypt is used to encrypt the password of the users
const bcrypt = require("bcrypt");
const { defer } = require('react-router-dom');


productRoutes.post('/create-payment-intent', (req, res) => {
  // Extracting the price from the request body
  const { price } = req.body; 
  // Creating a payment intent using the Stripe API
  stripe.paymentIntents.create({ 
  // Setting the amount for the payment intent (the default value in Stripe is in cents, so you multiply by 100 to convert into dollars)
    amount: price * 100,
    currency: 'usd'
  })
  // Sending the clientSecret in the response to the Client, which is used by the client-side to authenticate the payment intent
    .then(paymentIntent => {
      res.send({
        clientSecret: paymentIntent.client_secret
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({
        error: 'The payment intent was not created succesfully'
      });
    });
});

//DEFINING THE BASIC ENDPOINTS

/* The function below will be used for creating endpoints for the Mongoose models,
   given a route, a url, and the model in question */ 
function DefineEndpoints(specificRoute, url, mongoose_model) {
   specificRoute(url).get(function(req, res) {
     mongoose_model.find()
       .then(function(object) {
        // Sending the retrieved objects as a JSON response
         res.json(object);
       })
       .catch(function(err) {
         console.log(err);
       });
   });
   
}

// Creating the '/posts' endpoint for the posts
DefineEndpoints(postRoutes.route.bind(postRoutes), '/', newPost);
// Creating the '/products' endpoint for the products
DefineEndpoints(productRoutes.route.bind(productRoutes), '/', newProduct);
// Creating the '/users' endpoint for the users
DefineEndpoints(userRoutes.route.bind(userRoutes), '/', newUser);
// Creating the '/orders' endpoint for the orders
DefineEndpoints(orderRoutes.route.bind(orderRoutes), '/', newOrder);

// Registration endpoint

/* For the registration endpoint, aditional steps will be taken so as 
   to secure the user identity */
userRoutes.route("/register").post((req, response) => {
   bcrypt
   // First the password is hashed ten tims
     .hash(req.body.password, 10)
     // Then, using the hashed password, we create the new registered User
     .then((hashedPassword) => {
       const user = new newUser({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
         description: req.body.description,
         profile_picture: req.body.profile_picture,
         language_preferences: req.body.language_preferences,
         timezone: req.body.timezone,
         wishlist: req.body.wishlist,
         shopping_cart: req.body.shopping_cart,
         payment_info: req.body.payment_info,
         newsletter_subscription: req.body.newsletter_subscription,
         verified: req.body.verified,
         last_login: req.body.last_login,
         birth_date: req.body.birth_date,
         address: req.body.address,
         first_name: req.body.first_name,
         last_name:  req.body.last_name,
         phone_number:  req.body.phone_number,
         order_history:  req.body.order_history,
         product_reviews: req.body.product_reviews,
         user_role: req.body.user_role,
       });
       // Saving the recently registered User into the '/users' endoint in the database
       user
         .save()
         .then((result) => {
           response.status(201).send({
             message: "User Created Successfully",
             result,
           });
         })
         .catch((error) => {
           response.status(500).send({
             message: "Error creating user",
             error,
           });
         });
     })
     .catch((e) => {
       response.status(500).send({
         message: "Password was not hashed successfully",
         e,
       });
     });
 });
 
// Login endpoint
userRoutes.route("/login").post((request, response) => {
  // Finding the user by the email
  newUser.findOne({ email: request.body.email })
    .then((user) => {
      // Using bcrypt to compare the password given in the input with the password associated with that email in the database
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          // Creates a token for the user's current session
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
              userRole: user.user_role,
            },
          // Gives the token an expiration date of seven days
            "RANDOM-TOKEN",
            { expiresIn: registrationTokenExpiration }
          );
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            userRole: user.user_role,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// Logout endpoint
userRoutes.route("/logout").get((request, response) => {
  response.clearCookie("TOKEN");
  response.status(200).send({ message: "Logout successful" });
});

/* The following two verification functions will be used whenever we wish to 
  grant special permissions to logged-in users, or to Administrators */

// Verifies the token of the logged-in user
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the authorization header
  if (!token) {  // If no token is found, send an unauthorized response
    return res.status(401).send({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'RANDOM-TOKEN', function(err, payload) {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = payload; // Attach the user payload to the request object
    console.log('This is, console logged, the user:', req.user); // Log the user object
    next();  // Call the next middleware or route handler
  });
}

// Verifies if the currently logged-in user is an Administrator
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'RANDOM-TOKEN', function(err, payload) {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = payload;
    const isAdmin = req.user.userRole === 'Administrator'; // Check if the user has the 'Administrator' role
    if (!isAdmin) {
      return res.status(403).send({ message: 'You need Administrator status to perform this action' });
    }
    next();  // Call the next middleware or route handler
  });
}

// CRUD FUNCTIONS

/* The CRUD functions bellow accept as parameters, besides the route, the mongoose model, and the name of the object,
   also a verification function which can be used to limit the access to those actions */

//Find objects by Id
function FindObjectById(expressRoute, url, mongoose_model, name_of_object, verification) {
  const findByIdHandler = function(req, res) {
    // Uses the specified mongoose model, and finds by Id
    mongoose_model.findById(req.params.id)
      .then(function(object) {
        if (!object) {
          res.status(404).send(`${name_of_object} not found`);
        } else {
          res.json(object);
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send(`Error finding ${name_of_object}`);
      });
  };

  if (verification) {  
    // Use the specified verification middleware for authentication/authorization
    expressRoute(url).get(verification, findByIdHandler);
  } else {
    // Use the default findByIdHandler for the route
    expressRoute(url).get(findByIdHandler); 
  }
}

// Creates and saves an object
function Create(expressRoute, url, mongoose_model, name_of_object, verification) {
  const createHandler = function(req, res) {
    let object = new mongoose_model(req.body);
    object.save()
      .then(() => {
        res.status(200).json({ [name_of_object]: `${name_of_object} added successfully` });
      })
      .catch(() => {
        res.status(400).send(`Adding new ${name_of_object} failed`);
      });
  };

  if (verification) {
    return expressRoute(url).post(verification, createHandler);
  } else {
    return expressRoute(url).post(createHandler);
  }
}

// Updates the object
function Update(expressRoute, url, mongoose_model, name_of_object, verification) {
  const updateHandler = function(req, res) {
    const object = req.body;
    const id = req.params.id;
    mongoose_model.findByIdAndUpdate(id, object)
      .then(() => {
        const updatedObject = { ...req.object, ...object };
        res.status(200).send(updatedObject);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: `Error updating ${name_of_object}` });
      });
  };

  if (verification) {
    expressRoute(url).post(verification, updateHandler);
  } else {
    expressRoute(url).post(updateHandler);
  }
}

// Deletes the object
function Delete(expressRoute, url, mongoose_model, name_of_object, verification) {
  const deleteHandler = function(req, res) {
    mongoose_model.findByIdAndDelete(req.params.id)
      .then(function(object) {
        if (!object) {
          res.status(404).send("Data is not found");
        } else {
          res.json(`${name_of_object} deleted!`);
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send("Delete not possible");
      });
  };

  if (verification) {
    expressRoute(url).delete(verification, deleteHandler);
  } else {
    expressRoute(url).delete(deleteHandler);
  }
}

//SPECIFIC CRUD (CREATE-READ-UPDATE-DELETE) ENDPOINTS FOR USERS, POSTS, PRODUCTS, ORDERS

// Read, update, delete users
// User creation has beend dealt with in the registration function
userRoutes.route('/:id').get(function(req, res) {
  newUser.findById(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Product not found");
    });
});

// Updating the user rquires updating the token, hence the function will be different than it is for posts, products, orders
userRoutes.route('/update_user/:id').post(verifyToken, function(req, res) {
  const user = req.body;
  const id = req.params.id;
  newUser.findByIdAndUpdate(id, user)
    .then(() => {
      // Update user information in the token payload
      const updatedPayload = { ...req.user, ...user };
      // Generate new token with updated payload
      const updatedToken = jwt.sign(updatedPayload, 'RANDOM-TOKEN');
      res.status(200).send({ token: updatedToken });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Error updating user' });
    });
});
// Deleting users
userRoutes.route('/delete_user/:id').delete(function(req, res) {
  newUser.findByIdAndDelete(req.params.id)
    .then(function(user) {
      if (!user) {
        res.status(404).send("data is not found");
      } else {
        res.json('user deleted!');
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send("Delete not possible");
    });
});

// Create, read, update and delete posts
FindObjectById(postRoutes.route.bind(postRoutes), '/:id', newPost, 'post');
Create(postRoutes.route.bind(postRoutes), '/add_post', newPost, 'post', verifyAdmin);
Update(postRoutes.route.bind(postRoutes), '/update/:id', newPost, 'post', verifyAdmin);
Delete(postRoutes.route.bind(postRoutes), '/delete/:id', newPost, 'post', verifyAdmin);

// Create, read, update and delete products
FindObjectById(productRoutes.route.bind(productRoutes), '/:id', newProduct, 'product');
Create(productRoutes.route.bind(productRoutes), '/add_product', newProduct, 'product', verifyAdmin);
Update(productRoutes.route.bind(productRoutes), '/update_product/:id', newProduct, 'product', verifyAdmin);
Delete(productRoutes.route.bind(productRoutes), '/delete_product/:id', newProduct, 'product', verifyAdmin);

// Create, read, update and delete orders
FindObjectById(orderRoutes.route.bind(orderRoutes), '/:id', newOrder, 'order');
Create(orderRoutes.route.bind(orderRoutes), '/:add_orders', newOrder, 'order');
Update(orderRoutes.route.bind(orderRoutes), '/:update_order/:id', newOrder, 'order');
Delete(orderRoutes.route.bind(orderRoutes), '/:delete_order/:id', newOrder, 'order');

/*
// Curb Cores Error by adding a header here
userRoutes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins to access the routes
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization" // Specify allowed headers
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"  // Specify allowed HTTP methods
  );
  next();
}); 

app.get('/', (req, res) => {
  res.send('Hello World!'); // Replace with your desired response or logic
}); */


const corsOptions = {
  origin: 'https://e-commerce-model.onrender.com', // Specify the allowed origin for CORS
  optionsSuccessStatus: 200 // Specify the success status for CORS preflight requests
};

// Mounting the middlewares under their specific routes
app.use('/purchases', orderRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);  // Log the server start message with the port
  console.log(app._router.stack); // Log the registered middleware stack
}
);  
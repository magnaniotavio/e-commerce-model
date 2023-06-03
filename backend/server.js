const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());
//mongoose.connect(`mongodb+srv://otaviomagnani:${process.env.MONGODB_PASSWORD}@cluster0.cb2e1su.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => console.log('Connected to MongoDB Atlas'))
//  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection;
connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})
// Stripe key for mock payments
//const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

// Routes
const postRoutes = express.Router();
const userRoutes = express.Router();
const productRoutes = express.Router();
const loginRoutes = express.Router();
const logoutRoutes = express.Router();
const orderRoutes = express.Router();
// Mongoose models
const newPost = require('./post.model');
const newUser = require("./user.model");
const newOrder = require("./order.model");
const newProduct = require("./product.model")
// Port


const baseURL = 'https://my-e-commerce-project.onrender.com/' || 'https://e-commerce-model.onrender.com/' || `http://localhost:10000 || 4000}`;
const PORT = process.env.PORT || 4000;

//const PORT = process.env.PORT || 4000;
//const PORT = 4000;
// Registration constants
const registrationTokenExpiration = "7d";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { defer } = require('react-router-dom');
//const orderModel = require('./order.model');
//const auth = require("./auth");


app.use('/purchases', orderRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
  console.log(app._router.stack);
}
);


productRoutes.post('/create-payment-intent', (req, res) => {
  const { price } = req.body;
  stripe.paymentIntents.create({
    amount: price * 100,
    currency: 'usd'
  })
    .then(paymentIntent => {
      res.send({
        clientSecret: paymentIntent.client_secret
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({
        error: error.message
      });
    });
});

//DEFINING THE BASIC ENDPOINTS
function DefineEndpoints(specificRoute, url, mongoose_model) {
   specificRoute(url).get(function(req, res) {
     mongoose_model.find()
       .then(function(object) {
         res.json(object);
       })
       .catch(function(err) {
         console.log(err);
       });
   });
   
}
 
DefineEndpoints(postRoutes.route.bind(postRoutes), '/', newPost);
DefineEndpoints(productRoutes.route.bind(productRoutes), '/', newProduct);
DefineEndpoints(userRoutes.route.bind(userRoutes), '/', newUser);
DefineEndpoints(orderRoutes.route.bind(orderRoutes), '/', newOrder);

// Registration endpoint

userRoutes.route("/register").post((req, response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword)=> {
      const user = new newUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        birth_date: user.birth_date,
        address: user.address,
        first_name: user.first_name,
        last_name:  user.last_name,
        phone_number:  user.phone_number,
        order_history:  user.order_history,
        product_reviews:  user.product_reviews,
        description: user.description,
        profile_picture: user.profile_picture,
        language_preferences: user.language_preferences,
        timezone: user.timezone,
        wishlist: user.wishlist,
        shopping_cart: user.shopping_cart,
        payment_info: user.payment_info,
        newsletter_subscription: user.newsletter_subscription,
        verified: user.verified,
        created_at: user.created_at,
        last_login: user.last_login,
        user_role:  user.user_role,  
});
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
  newUser.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: registrationTokenExpiration }
          );
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
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


// Verification of the token of the logged-in user
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  jwt.verify(token, 'RANDOM-TOKEN', function(err, payload) {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = payload;
    next();
  });
}

// CRUD FUNCTIONS

// Find by ID
function FindObjectById(expressRoute, url, mongoose_model, name_of_object) {
  expressRoute(url).get(function(req, res) {
    mongoose_model.findById(req.params.id)
      .then(function(object) {
        res.json(object);
      })
      .catch(function(err) {
        console.log(err);
        res.status(404).send(`${name_of_object} not found`);
      });
  });
  }
// Create
function Create(expressRoute, url, mongoose_model, name_of_object) {
  return expressRoute(url).post(function(req, res) {
    let object = new mongoose_model(req.body);
    object.save()
        .then(object => {
          res.status(200).json({ [name_of_object]: `${name_of_object} added successfully` });
        })
        .catch(err => {
            res.status(400).send(`adding new ${name_of_object} failed`);
        });
  }) 
}

// Update
function Update(expressRoute, url, mongoose_model, name_of_object) {
  expressRoute(url).post(function(req, res) {
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
    });
}
// Delete
function Delete(expressRoute, url, mongoose_model, name_of_object) {
 expressRoute(url).delete(function(req, res) {
  mongoose_model.findByIdAndDelete(req.params.id)
    .then(function(object) {
      if (!object) {
        res.status(404).send("data is not found");
      } else {
        res.json(`${name_of_object} deleted!`);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send("Delete not possible");
    });
});
}

//SPECIFIC CRUD (CREATE-READ-UPDATE-DELETE) ENDPOINTS FOR USERS, POSTS, PRODUCTS, ORDERS

// Read, update, delete users
// User creation has beend dealt with in the registration function
FindObjectById(userRoutes.route.bind(userRoutes), '/:id', newUser, 'user');
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
Delete(userRoutes.route.bind(userRoutes), '/delete_user/:id', newUser, 'user');

// Create, read, update and delete posts
FindObjectById(postRoutes.route.bind(postRoutes), '/:id', newPost, 'post');
Create(postRoutes.route.bind(postRoutes), '/add', newPost, 'post');
Update(postRoutes.route.bind(postRoutes), '/update/:id', newPost, 'post');
Delete(postRoutes.route.bind(postRoutes), '/delete/:id', newPost, 'post');

// Create, read, update and delete products
FindObjectById(productRoutes.route.bind(productRoutes), '/:id', newProduct, 'product');
Create(productRoutes.route.bind(productRoutes), '/add_product', newProduct, 'product');
Update(productRoutes.route.bind(productRoutes), '/update_product/:id', newProduct, 'product');
Delete(productRoutes.route.bind(productRoutes), '/delete_product/:id', newProduct, 'product');

// Create, read, update and delete orders
FindObjectById(orderRoutes.route.bind(orderRoutes), '/:id', newOrder, 'order');
Create(orderRoutes.route.bind(orderRoutes), '/:add_orders', newOrder, 'order');
Update(orderRoutes.route.bind(orderRoutes), '/:update_order/:id', newOrder, 'order');
Delete(orderRoutes.route.bind(orderRoutes), '/:delete_order/:id', newOrder, 'order');


// Curb Cores Error by adding a header here
userRoutes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!'); // Replace with your desired response or logic
});


const corsOptions = {
  origin: 'https://e-commerce-model.onrender.com',
  optionsSuccessStatus: 200 // Some legacy browsers (e.g., IE11) choke on 204
};

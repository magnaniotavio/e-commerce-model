const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = express.Router();
const userRoutes = express.Router();
const productRoutes = express.Router();
const loginRoutes = express.Router();
const logoutRoutes = express.Router();
const orderRoutes = express.Router();

const PORT = 4000;
const newPost = require('./post.model');
const newUser = require("./user.model");

const newOrder = require("./order.model");

const registrationTokenExpiration = "7d";

const newProduct = require("./product.model")
const auth = require("./auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const productModel = require('./product.model');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(`mongodb+srv://otaviomagnani:${process.env.MONGODB_PASSWORD}@cluster0.cb2e1su.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
  console.log("MongoDB database connection established successfully");
})

//const stripe = require('stripe')('sk_test_51N6tO8EFMUty2Z9OWvDRqLNvXGhfAxLUNI8V8yxUnv38CA2BWJx077WzoBhG7ncg6WC5MfFBzAR1BgmvYffOvccU00o7DnjzTp');

const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

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

//DEFINING THE ENDPOINTS

postRoutes.route('/').get(function(req, res) {
  newPost.find()
    .then(function(posts) {
      res.json(posts);
    })
    .catch(function(err) {
      console.log(err);
    });
});

productRoutes.route('/').get(function(req, res) {
  newProduct.find()
    .then(function(products) {
      res.json(products);
    })
    .catch(function(err) {
      console.log(err);
    });
});

userRoutes.route('/').get(function(req, res) {
  newUser.find()
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.log(err);
    });
});

loginRoutes.route('/').get(function(req, res) {
  newUser.find()
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      console.log(err);
    });
});

orderRoutes.route('/').get(function(req, res) {
  newOrder.find()
    .then(function(order) {
      res.json(order);
    })
    .catch(function(err) {
      console.log(err);
    });
});

userRoutes.route("/register").post((req, response) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new newUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    /*    description: req.body.description,
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
        user_role: req.body.user_role, */
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

// login endpoint
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
              userName: user.username,
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

userRoutes.route("/logout").get((request, response) => {
  response.clearCookie("TOKEN");
  response.status(200).send({ message: "Logout successful" });
});

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
//,  { expiresIn: registrationTokenExpiration }
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

userRoutes.route('/:profile/:id').get(function(req, res) {
  newUser.findOne({_id: req.params.id })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("User not found");
    });
});

userRoutes.route('/:wishlist/:id').get(function(req, res) {
  newUser.findOne({_id: req.params.id })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Wishlist not found");
    });
});

userRoutes.route('/:shopping_cart/:id').get(function(req, res) {
  newUser.findOne({_id: req.params.id })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Shopping cart not found");
    });
});

userRoutes.route('/:shopping_card/:id').get(function(req, res) {
  newUser.findOne({_id: req.params.id })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("User not found");
    });
});

// free endpoint
userRoutes.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
userRoutes.get("/protected", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

// authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const secret = 'my_secret_key';

// Middleware to verify JWT token and extract user ID
const authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify token and extract user ID
    const decoded = jwt.verify(token, secret);
    req.newUserId = decoded.newUserId; // Extract user ID from token and add to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

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

postRoutes.route('/:id').get(function(req, res) {
  newPost.findById(req.params.id)
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Post not found");
    });
});

postRoutes.route('/:newTitle/:id').get(function(req, res) {
  newPost.findOne({_id: req.params.id, newTitle: req.params.newTitle })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Post not found");
    });
});

postRoutes.route('/:newClassification/:newTitle/:id').get(function(req, res) {
  newPost.findOne({_id: req.params.id, newTitle: req.params.newTitle, newClassification: req.params.newClassification })
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Post not found");
    });
});

productRoutes.route('/:id').get(function(req, res) {
  newProduct.findById(req.params.id)
    .then(function(post) {
      res.json(post);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Product not found");
    });
});

productRoutes.route('/:name/:id').get(function(req, res) {
  newProduct.findOne({name: req.params.name })
    .then(function(posts) {
      res.json(posts);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404).send("Posts not found");
    });
});

postRoutes.route('/update/:id').post(function(req, res) {
  newPost.findById(req.params.id)
    .then(function(post) {
      if (!post) {
        res.status(404).send("data is not found");
      } else {
        post.newPost = req.body.newPost;
        post.newClassification = req.body.newClassification;
        post.post_priority = req.body.post_priority;
        post.newTitle = req.body.newTitle;
        post.post_completed = req.body.post_completed;
        post.creationDate = req.body.creationDate;
        post.lastEdited = req.body.lastEdited;
        post.country = req.body.country;
        post.language = req.body.language;
        post.postNumber = req.body.postNumber;
        post.save()
          .then(function(post) {
            res.json('post updated!');
          })
          .catch(function(err) {
            res.status(400).send("Update not possible");
          });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});

postRoutes.route('/delete/:id').delete(function(req, res) {
  newPost.findByIdAndDelete(req.params.id)
    .then(function(post) {
      if (!post) {
        res.status(404).send("data is not found");
      } else {
        res.json('post deleted!');
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send("Delete not possible");
    });
});

productRoutes.route('/update_product/:id').post(function(req, res) {
  newProduct.findById(req.params.id)
    .then(function(product) {
      if (!product) {
        res.status(404).send("data is not found");
      } else {
        product.name = req.body.name;
        product.classification = req.body.classification;
        product.sizeSML = req.body.sizeSML;
        product.sizeNumber = req.body.sizeNumber;
        product.brand = req.body.brand;
        product.price = req.body.price;
        product.customerReview = req.body.customerReview;
        product.popularity = req.body.popularity;
        product.color = req.body.color;
        product.creationDate = req.body.creationDate;
        product.lastEdited = req.body.lastEdited;
        product.condition = req.body.condition;
        product.availability = req.body.availability;
        product.description = req.body.description;
        product.targetPublic = req.body.targetPublic;
        product.save()
          .then(function(product) {
            res.json('product updated!');
          })
          .catch(function(err) {
            res.status(400).send("Update not possible");
          });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});
productRoutes.route('/delete_product/:id').delete(function(req, res) {
  newProduct.findByIdAndDelete(req.params.id)
    .then(function(product) {
      if (!product) {
        res.status(404).send("data is not found");
      } else {
        res.json('product deleted!');
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send("Delete not possible");
    });
});

postRoutes.route('/add').post(function(req, res) {
    let post = new newPost(req.body);
    post.save()
        .then(post => {
            res.status(200).json({'post': 'post added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new post failed');
        });
});

productRoutes.route('/add_product').post(function(req, res) {
  let product = new newProduct(req.body);
  product.save()
      .then(product => {
          res.status(200).json({'product': 'product added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new product failed');
      });
});

orderRoutes.route('/add_orders').post(function(req, res) {
  let order = new newOrder(req.body);
  order.save()
      .then(order => {
          res.status(200).json({'order': 'order added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new order failed');
      });
});

app.use('/purchases', orderRoutes);
app.use('/products', productRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
    console.log(app._router.stack);

});
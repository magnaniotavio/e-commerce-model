const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());

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
// Mongoose models
const newPost = require('./post.model');
const newUser = require("./user.model");
const newOrder = require("./order.model");
const newProduct = require("./product.model")
// Port

const baseURL = 'https://my-e-commerce-project.onrender.com/' || 'https://e-commerce-model.onrender.com/' || `http://localhost:10000 || 4000}`;
const PORT = process.env.PORT || 4000;

// Registration constants
const registrationTokenExpiration = "7d";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { defer } = require('react-router-dom');

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
  // bcrypt
  //   .hash(req.body.password, 10)
  //   .then((hashedPassword)=> {
   bcrypt
     .hash(req.body.password, 10)
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
              userRole: user.user_role,
            },
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
    console.log('This is, console logged, the user:', req.user); // Log the user object
    next();
  });
}


// Verification of Admin
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

    console.log('This is, console logged, verifiyAdmin payload:' + payload)

    // Check if userRole is 'Administrator'
    const isAdmin = req.user.userRole === 'Administrator';
    if (!isAdmin) {
      console.log(`This is verifyAdmin payload: ${JSON.stringify(payload)}`);
      console.log('This is, console logged, verifiyAdmin payload:' + JSON.stringify(payload))
      return res.status(403).send({ message: `This is verifyAdmin payload: ${JSON.stringify(payload)}` + 'Forbidden' });
    }
    next();
  });
}

// CRUD FUNCTIONS

//FIND BY ID
function FindObjectById(expressRoute, url, mongoose_model, name_of_object, verification) {
  const findByIdHandler = function(req, res) {
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
    expressRoute(url).get(verification, findByIdHandler);
  } else {
    expressRoute(url).get(findByIdHandler);
  }
}

// Create
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

// Update
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
                                  //FindObjectById(userRoutes.route.bind(userRoutes), '/:id', newUser, 'user');
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
                              //Delete(userRoutes.route.bind(userRoutes), '/delete_user/:id', newUser, 'user');

// Create, read, update and delete posts
FindObjectById(postRoutes.route.bind(postRoutes), '/:id', newPost, 'post');
Create(postRoutes.route.bind(postRoutes), '/add', newPost, 'post', verifyAdmin);
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




/*
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
  expressRoute(url).delete(verifyAdmin, function(req, res) {
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
  });
} */

/*function Delete(expressRoute, url, mongoose_model, name_of_object) {
  expressRoute(url).delete(function(req, res) {
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
  });
} */
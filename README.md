# MERN clothing store mock website

This is a (still in progress) **MERN** e-commerce website (a 'clothes store').
Besides React, Node, Express and MongoDB, I have also used, so far, the following technnologies: **MongoDB Atlas** for storing the database on the cloud, **Stripe API** for mock payments, the **Mongoose library** for connecting Node and Mongo, **React Bootstrap** for a basic design, and **Render.com** for deployment. 

As I've said, it's still a work in progress, but already contains the following features:

- a homepage with a **carousel** showing some of the products;
- a full **navbar**, including dropdown menus and a search bar
- **registration/login/logout** functions that generate and update a Token for the logged-in user
- a **mock payment method** that uses Stripe and is capable of idenfiying credit cards
- different categories for users, such as **Administrator and Client**, and **hidden routes** for the administrator

  **CRUD** functions that allow the Administrators to:
    - Create, edit, delete posts
    - Create, edit, delete products
    - Edit and delete users
  - And allows users to:
     - Register themselves, edit their profiles
     - Post reviews on the pages of products

**Search functions** that allow the user to:
  - Search products **by name**
  - **Filter** them by categories

Among some other minor things (product images, user profile descriptions, etc.).

As of June 13, some **future improvements** I intend do in the following days/weeks include:
- Adding more comments and changing the names of many variables to make the code easier to understand and fix
- Adding authentication at the backend so that only the Administrator can do certain things (hidden routes are not enough)
- Improving the design by making it more responsive, as well as more visually pleasing (as of now, it's rather ugly, for I have been focusing on other things)
Currently I am focusing on simplifying the code, mostly by adding some layers of abstraction to allow me to reuse certain functions that I have been repeating more than I should.

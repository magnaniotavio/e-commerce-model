const mongoose = require('mongoose');
const { body } = require('express-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
      username: {
        type: String,
        required: [true, "Please provide a username!"],
        unique: [true, "Username already exists"],
      },
      email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
        validate: {
          validator: (value) => {
            return body('email').isEmail().normalizeEmail();
          },
          message: 'Invalid email address',
        },
      },
      password: {
          type: String,
          required: [true, "Please provide a password!"],
          unique: false,
        },
      description: {
        type: String,
      },
      profile_picture: {
          type: String,
      },
      language_preferences: {
           type: String,
      },
      timezone: {
          type: String,
      },
      wishlist: {
          type: Array,
      },
      shopping_cart: {
        type: Array,
    },
      payment_info: {
          type: Array,
      },
      newsletter_subscription: {
          type: Boolean,
          default: false,
      },
      verified: {
          type: Boolean,
          default: false,
      },
      created_at: {
          type: Date,
          default: Date.now,
      },
      last_login: {
          type: Date,
      },
      birth_date: {
        type: Date,
    },
      address: {
        type: String,
      },
      first_name: {
        type: String,
    },
    last_name: {
    type: String,
},
    phone_number: {
        type: String,
    },
    order_history: {
      type: Array,
  },
  product_reviews: {
    type: mongoose.Schema.Types.Mixed,
},
user_role: {
  type: mongoose.Schema.Types.Mixed,
  enum: ["Administrator", "Client", "Employee", "Supplier"],
  default: "Client",
},
})

module.exports = mongoose.model('Users', UserSchema);
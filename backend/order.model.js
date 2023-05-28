const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  productId: {    type: mongoose.Schema.Types.Mixed,
  },
  buyer: {    type: mongoose.Schema.Types.Mixed,
  },
  product_name: {    type: mongoose.Schema.Types.Mixed,
  },
  date: {    type: mongoose.Schema.Types.Mixed,
  },
  address: {    type: mongoose.Schema.Types.Mixed,
  },
  price: {    type: mongoose.Schema.Types.Mixed,
  }
})

module.exports = mongoose.model('userOrder', OrderSchema);

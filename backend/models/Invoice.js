const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: String,
  unitPrice: Number,
  quantity: Number,
  discount: Number,
  taxRate: Number,
});

const invoiceSchema = new mongoose.Schema({
  sellerDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    pan: String,
    gst: String,
  },
  placeOfSupply: String,
  billingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    stateCode: String,
  },
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    stateCode: String,
  },
  placeOfDelivery: String,
  orderDetails: {
    orderNo: String,
    orderDate: Date,
  },
  invoiceDetails: {
    invoiceNo: String,
    invoiceDate: Date,
    reverseCharge: Boolean,
  },
  items: [itemSchema],
  signature: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);

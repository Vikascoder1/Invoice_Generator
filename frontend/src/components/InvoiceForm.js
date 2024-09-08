// frontend/src/components/InvoiceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './InvoiceForm.css'; // Ensure this file has appropriate CSS styling for the form

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      pan: '',
      gst: '',
    },
    placeOfSupply: '',
    billingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: '',
    },
    shippingDetails: {
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      stateCode: '',
    },
    placeOfDelivery: '',
    orderDetails: {
      orderNo: '',
      orderDate: '',
    },
    invoiceDetails: {
      invoiceNo: '',
      invoiceDetails: '',
      invoiceDate: '',
    },
    itemDetails: [
      {
        description: '',
        unitPrice: 0,
        quantity: 1,
        discount: 0,
        taxRate: 18,
      },
    ],
    reverseCharge: 'No',
    signature: '',
  });

  // Handle input change
  const handleInputChange = (e, section, key, index = null) => {
    const value = e.target.value;

    if (section === 'itemDetails') {
      const updatedItems = [...formData.itemDetails];
      updatedItems[index][key] =
        key === 'unitPrice' || key === 'quantity' || key === 'discount'
          ? parseFloat(value)
          : value;
      setFormData({ ...formData, itemDetails: updatedItems });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [key]: value },
      });
    }
  };

  // Add new item row
  const addItem = () => {
    setFormData({
      ...formData,
      itemDetails: [
        ...formData.itemDetails,
        {
          description: '',
          unitPrice: 0,
          quantity: 1,
          discount: 0,
          taxRate: 18,
        },
      ],
    });
  };

  // Remove item row
  const removeItem = (index) => {
    const updatedItems = formData.itemDetails.filter((_, idx) => idx !== index);
    setFormData({ ...formData, itemDetails: updatedItems });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/invoice',
        formData
      );
      alert('Invoice generated successfully');
      window.open(response.data.filePath, '_blank');
    } catch (error) {
      alert('Error generating invoice');
      console.error(error);
    }
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <h2>Invoice Form</h2>

      <div className="section">
        <h3>Seller Details</h3>
        <input
          type="text"
          placeholder="Seller Name"
          value={formData.sellerDetails.name}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'name')}
        />
        <input
          type="text"
          placeholder="Seller Address"
          value={formData.sellerDetails.address}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'address')}
        />
        <input
          type="text"
          placeholder="Seller City"
          value={formData.sellerDetails.city}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'city')}
        />
        <input
          type="text"
          placeholder="Seller State"
          value={formData.sellerDetails.state}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'state')}
        />
        <input
          type="text"
          placeholder="Seller Pincode"
          value={formData.sellerDetails.pincode}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'pincode')}
        />
        <input
          type="text"
          placeholder="Seller PAN No."
          value={formData.sellerDetails.pan}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'pan')}
        />
        <input
          type="text"
          placeholder="Seller GST No."
          value={formData.sellerDetails.gst}
          onChange={(e) => handleInputChange(e, 'sellerDetails', 'gst')}
        />
      </div>

      <div className="section">
        <h3>Order Details</h3>
        <input
          type="text"
          placeholder="Order No."
          value={formData.orderDetails.orderNo}
          onChange={(e) => handleInputChange(e, 'orderDetails', 'orderNo')}
        />
        <input
          type="date"
          placeholder="Order Date"
          value={formData.orderDetails.orderDate}
          onChange={(e) => handleInputChange(e, 'orderDetails', 'orderDate')}
        />
      </div>

      <div className="section">
        <h3>Billing Details</h3>
        <input
          type="text"
          placeholder="Billing Name"
          value={formData.billingDetails.name}
          onChange={(e) => handleInputChange(e, 'billingDetails', 'name')}
        />
        <input
          type="text"
          placeholder="Billing Address"
          value={formData.billingDetails.address}
          onChange={(e) => handleInputChange(e, 'billingDetails', 'address')}
        />
        <input
          type="text"
          placeholder="Billing City"
          value={formData.billingDetails.city}
          onChange={(e) => handleInputChange(e, 'billingDetails', 'city')}
        />
        <input
          type="text"
          placeholder="Billing State"
          value={formData.billingDetails.state}
          onChange={(e) => handleInputChange(e, 'billingDetails', 'state')}
        />
        <input
          type="text"
          placeholder="Billing Pincode"
          value={formData.billingDetails.pincode}
          onChange={(e) => handleInputChange(e, 'billingDetails', 'pincode')}
        />
        <input
          type="text"
          placeholder="State/UT Code"
          value={formData.billingDetails.stateCode}
          onChange={(e) => handleInputChange(e, 'billingDetails', 'stateCode')}
        />
      </div>

      <div className="section">
        <h3>Shipping Details</h3>
        <input
          type="text"
          placeholder="Shipping Name"
          value={formData.shippingDetails.name}
          onChange={(e) => handleInputChange(e, 'shippingDetails', 'name')}
        />
        <input
          type="text"
          placeholder="Shipping Address"
          value={formData.shippingDetails.address}
          onChange={(e) => handleInputChange(e, 'shippingDetails', 'address')}
        />
        <input
          type="text"
          placeholder="Shipping City"
          value={formData.shippingDetails.city}
          onChange={(e) => handleInputChange(e, 'shippingDetails', 'city')}
        />
        <input
          type="text"
          placeholder="Shipping State"
          value={formData.shippingDetails.state}
          onChange={(e) => handleInputChange(e, 'shippingDetails', 'state')}
        />
        <input
          type="text"
          placeholder="Shipping Pincode"
          value={formData.shippingDetails.pincode}
          onChange={(e) => handleInputChange(e, 'shippingDetails', 'pincode')}
        />
        <input
          type="text"
          placeholder="State/UT Code"
          value={formData.shippingDetails.stateCode}
          onChange={(e) => handleInputChange(e, 'shippingDetails', 'stateCode')}
        />
      </div>

      <div className="section">
        <h3>Invoice Details</h3>
        <input
          type="text"
          placeholder="Invoice No."
          value={formData.invoiceDetails.invoiceNo}
          onChange={(e) => handleInputChange(e, 'invoiceDetails', 'invoiceNo')}
        />
        <input
          type="text"
          placeholder="Invoice Details"
          value={formData.invoiceDetails.invoiceDetails}
          onChange={(e) =>
            handleInputChange(e, 'invoiceDetails', 'invoiceDetails')
          }
        />
        <input
          type="date"
          placeholder="Invoice Date"
          value={formData.invoiceDetails.invoiceDate}
          onChange={(e) => handleInputChange(e, 'invoiceDetails', 'invoiceDate')}
        />
      </div>

      <div className="section">
        <h3>Item Details</h3>
        {formData.itemDetails.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleInputChange(e, 'itemDetails', 'description', index)
              }
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) =>
                handleInputChange(e, 'itemDetails', 'unitPrice', index)
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleInputChange(e, 'itemDetails', 'quantity', index)
              }
            />
            <input
              type="number"
              placeholder="Discount (%)"
              value={item.discount}
              onChange={(e) =>
                handleInputChange(e, 'itemDetails', 'discount', index)
              }
            />
            <input
              type="number"
              placeholder="Tax Rate (%)"
              value={item.taxRate}
              onChange={(e) =>
                handleInputChange(e, 'itemDetails', 'taxRate', index)
              }
            />
            <button type="button" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>
      </div>

      <div className="section">
        <h3>Additional Details</h3>
        <label>
          Reverse Charge:
          <select
            value={formData.reverseCharge}
            onChange={(e) => handleInputChange(e, 'additionalDetails', 'reverseCharge')}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Signature"
          value={formData.signature}
          onChange={(e) => handleInputChange(e, 'additionalDetails', 'signature')}
        />
      </div>

      <button type="submit" className="submit-btn">
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;

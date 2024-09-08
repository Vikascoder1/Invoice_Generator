// backend/controllers/invoiceController.js

const Invoice = require('../models/Invoice');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Helper function to format amounts
const formatAmount = (amount) => amount.toFixed(2);

// Generate the amount in words (simple implementation)
const amountInWords = (num) => {
  // Convert numbers to words - this can be enhanced further
  // For now, a placeholder for demo
  return "One Thousand One Hundred And Ninety-five only";
};

const createInvoice = async (req, res) => {
  const { sellerDetails, billingDetails, shippingDetails, orderDetails, invoiceDetails, itemDetails, placeOfSupply, placeOfDelivery } = req.body;

  // Calculate taxes and total amounts
  itemDetails.forEach((item) => {
    item.netAmount = item.unitPrice * item.quantity - item.discount;
    if (placeOfSupply === placeOfDelivery) {
      item.taxType = 'CGST & SGST';
      item.cgstAmount = formatAmount((item.netAmount * item.taxRate) / 200); // Half of the 18% tax rate
      item.sgstAmount = formatAmount((item.netAmount * item.taxRate) / 200);
      item.igstAmount = 0;
    } else {
      item.taxType = 'IGST';
      item.igstAmount = formatAmount((item.netAmount * item.taxRate) / 100); // Full 18%
      item.cgstAmount = 0;
      item.sgstAmount = 0;
    }
    item.totalAmount = formatAmount(
      parseFloat(item.netAmount) +
      parseFloat(item.cgstAmount) +
      parseFloat(item.sgstAmount) +
      parseFloat(item.igstAmount)
    );
  });

  const doc = new PDFDocument();
  const filePath = path.join(__dirname, '../invoices', `invoice-${invoiceDetails.invoiceNo}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  // Header
  doc.fontSize(18).text('Tax Invoice/Bill of Supply/Cash Memo (Original for Recipient)', { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(12).text(`Sold By:\n${sellerDetails.name}\n${sellerDetails.address}, ${sellerDetails.city}, ${sellerDetails.state}, ${sellerDetails.pincode}\nPAN No: ${sellerDetails.pan}\nGST Registration No: ${sellerDetails.gst}`, { align: 'left' });

  // Order and Billing Details
  doc.moveDown(1);
  doc.text(`Order Number: ${orderDetails.orderNo}\nOrder Date: ${orderDetails.orderDate}`);
  doc.moveDown(1);
  doc.text(`Billing Address:\n${billingDetails.name},\n${billingDetails.address}, ${billingDetails.city}, ${billingDetails.state}, ${billingDetails.pincode}\nState/UT Code: ${billingDetails.stateCode}`);
  doc.moveDown(1);
  doc.text(`Shipping Address:\n${shippingDetails.name},\n${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.pincode}\nState/UT Code: ${shippingDetails.stateCode}`);
  doc.moveDown(1);
  doc.text(`Place of Supply: ${placeOfSupply}\nPlace of Delivery: ${placeOfDelivery}`);
  doc.moveDown(1);
  doc.text(`Invoice Number: ${invoiceDetails.invoiceNo}\nInvoice Details: ${invoiceDetails.invoiceDetails}\nInvoice Date: ${invoiceDetails.invoiceDate}`);

  // Table Header
  doc.moveDown(2);
  doc.text('SI.\tDescription\tUnit Price\tQuantity\tNet Amount\tTax Type\tTax Amount\tTotal Amount');
  
  // Item Details
  itemDetails.forEach((item, index) => {
    doc.text(`${index + 1}\t${item.description}\t${item.unitPrice}\t${item.quantity}\t${item.netAmount}\t${item.taxType}\t${item.cgstAmount} + ${item.sgstAmount} or ${item.igstAmount}\t${item.totalAmount}`);
  });

  // Footer
  doc.moveDown(2);
  doc.text(`Amount in Words: ${amountInWords(1195)}`, { align: 'left' });
  doc.end();

  res.status(200).json({ message: 'Invoice created successfully', filePath });
};

module.exports = { createInvoice };

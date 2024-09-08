const express = require('express');
const { createInvoice, generateInvoicePDF } = require('../controllers/invoiceController');
const router = express.Router();

router.post('/create', createInvoice);
router.get('/pdf/:id', generateInvoicePDF);

module.exports = router;

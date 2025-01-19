const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts');

// Route to get a single contact by ID
router.get('/:id', contactController.getContactById);
// Route to get all contacts
router.get('/', contactController.getAllContacts);
module.exports = router;
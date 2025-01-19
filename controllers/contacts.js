const Contact = require('../models/Contacts');



// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
      const contacts = await Contact.find(); // Fetch all contacts
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts', error });
    }
  };
// Get a single contact by ID
exports.getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error(error.message);

    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    res.status(500).json({ message: 'Server error' });
  }
};
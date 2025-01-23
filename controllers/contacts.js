const Contact = require('../models/Contacts');
const express = require('express');



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

exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully', contact });
  } catch (error) {
    console.error(error.message);

    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

exports.createContact = async (req, res) => {
  console.log(req.body);
  
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing.' });
  }
  const { firstName, lastName, email, favoriteColor, birthday} = req.body; 

  try 
  {
    if (!firstName || !lastName|| !email) {
      return res.status(400).json({ message: 'First name, last name and email are required.' });
    }

    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const savedContact = await newContact.save();

    res.status(201).json({ message: 'Contact created successfully', id: savedContact._id });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

exports.editContact = async (req, res) => {
  const { id } = req.params; 
  let { firstName, lastName, email, favoriteColor, birthday } = req.body; 

  try {
    const oldContact = await Contact.findById(id);

    if (firstName != null) {
      firstName = firstName;
    } else {
      firstName = oldContact.firstName;
    }
    
    if (lastName != null) {
      lastName = lastName;
    } else {
      lastName = oldContact.lastName;

    }if (email != null) {
      email = email;
    } else {
      email = oldContact.email;

    }if (favoriteColor != null) {
      favoriteColor = favoriteColor;
    } else {
      favoriteColor = oldContact.favoriteColor;

    }if (birthday != null) {
      birthday = birthday;
    } else {
      birthday = oldContact.birthday;
    }

    const editContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const updatedContact = await Contact.findByIdAndUpdate(
      id, 
      { firstName, lastName, email, favoriteColor, birthday }, 
      { new: true, runValidators: true }
    );
        if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid contact ID.' });
    }

    res.status(500).json({ message: 'Server error.' });
  }
};
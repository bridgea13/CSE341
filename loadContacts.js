const mongoose = require('mongoose');
const Contact = require('./models/Contacts');
const contacts = require('./contacts.json'); // Adjust path as necessary

require('dotenv').config();

const loadData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert contacts into the collection
    await Contact.insertMany(contacts);

    console.log('Contacts successfully imported!');
    process.exit();
  } catch (error) {
    console.error('Error loading contacts:', error.message);
    process.exit(1);
  }
};

loadData();
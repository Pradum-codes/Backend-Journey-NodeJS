const Contact = require('../models/contacts.model');

const createContacts = async (req, res) => {
    try {
        const userId = req.user;
        const { name, email, phone } = req.body;

        const existingContact = await Contact.findOne({ email, user: userId });
        if (existingContact) {
            return res.status(409).json({ message: "Contact already exists" });
        }

        const newContact = new Contact({
            user: userId,
            name,
            email,
            phone,
        });

        await newContact.save();

        res.status(201).json({
            message: 'Contact created successfully',
            contact: {
                id: newContact._id,
                name: newContact.name,
                email: newContact.email,
                phone: newContact.phone,
            }
        });
    } catch (err) {
        console.error("Error creating contact:", err);
        res.status(500).json({
            message: 'Error creating contact',
            error: err.message
        });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const userId = req.user;

        const contacts = await Contact.find({ user: userId });

        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }

        res.status(200).json({
            message: 'Contacts retrieved successfully',
            count: contacts.length,
            contacts
        });

    } catch (err) {
        console.error("Error retrieving contacts:", err);
        res.status(500).json({
            message: 'Error retrieving contacts',
            error: err.message
        });
    }
};


module.exports = {
    createContacts,
    getAllContacts,
}
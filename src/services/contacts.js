import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  try { 
  const contact = await ContactsCollection.findById(contactId);
  return contact;
  } catch (error) {
    throw new createHttpError(404, 'Contact not found');
  }

};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  try {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );
    if (!rawResult || !rawResult.value) return null;
  
    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    throw new createHttpError(404, 'Contact not found');
  }
  
};

export const deleteContact = async (contactId) => {
  try {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
  } catch (error) {
    throw new createHttpError(404, 'Contact not found');
  }
};

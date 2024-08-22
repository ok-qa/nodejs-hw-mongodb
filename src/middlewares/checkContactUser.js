import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contact.js';

export const checkContactUser = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(createHttpError(401));
    return;
  }

  const { contactId } = req.params;
  if (!contactId) {
    console.log('first check: contactId');
    next(createHttpError(403));
    return;
  }

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: user._id,
  });

  if (contact) {
    next();
    return;
  }
  console.log('second check, contactId: ', contactId);
  console.log('second check, userId: ', user._id);
  next(createHttpError(403));
};

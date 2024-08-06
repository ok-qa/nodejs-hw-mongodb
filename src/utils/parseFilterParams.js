import { CONTACT_TYPE_VALUES } from '../constants/index.js';

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    CONTACT_TYPE_VALUES.includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  const isTrue = isFavourite === 'true';
  const isFalse = isFavourite === 'false';

  if (!isTrue && !isFalse) return;

  return isTrue || false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};

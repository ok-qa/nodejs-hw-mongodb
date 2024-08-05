import { CONTACT_TYPE_VALUES } from "../constants/index.js";

const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => CONTACT_TYPE_VALUES.includes(contactType);
  
    if (isContactType(contactType)) return contactType;
  };
  
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "../../../Constant";

export const addContact = (data) => {
  return {
    type: ADD_CONTACT,
    payload: data,
  };
};

export const updateContact = (data) => {
  return {
    type: UPDATE_CONTACT,
    payload: data,
  };
};

export const deleteContact = (id) => {
  return {
    type: DELETE_CONTACT,
    payload: id,
  };
};

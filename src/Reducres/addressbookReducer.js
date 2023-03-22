import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "../Constant";

export const manageContactDetails = (state = [], action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return [...state, action.payload];
    case UPDATE_CONTACT:
      const data = [...state];
      const updateContactData = data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return updateContactData;
    case DELETE_CONTACT:
      const oldData = [...state];
      const removeContactData = oldData.filter(
        (item) => item.id !== action.payload
      );
      return removeContactData;
    default:
      return state;
  }
};

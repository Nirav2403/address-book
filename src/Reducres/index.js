import { combineReducers } from "redux";
import { manageContactDetails } from "./addressbookReducer";

export default combineReducers({
  contactDetails: manageContactDetails,
});

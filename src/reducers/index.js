import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import authReducer from "./authReducer";

export default combineReducers({
  client: movieReducer,
  auth: authReducer
});

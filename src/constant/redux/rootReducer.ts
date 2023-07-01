import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import feedsSlice from "./feeds/feedsSlice";

export default combineReducers({
  auth: authSlice,
  feeds: feedsSlice,
});

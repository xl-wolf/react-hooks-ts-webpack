import { combineReducers } from "redux";
import user from "./user";
import sideMenu from "./sideMenu";

export default combineReducers({
  user,
  sideMenu,
});

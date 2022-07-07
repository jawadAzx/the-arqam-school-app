import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import announcementReducer from "./announcementReducer";
export default combineReducers({
    loginReducer,
    announcementReducer
});
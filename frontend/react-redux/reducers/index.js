import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import announcementReducer from "./announcementReducer";
import attendanceReducer from "./attendanceReducer";
export default combineReducers({
    loginReducer,
    announcementReducer,
    attendanceReducer,
});
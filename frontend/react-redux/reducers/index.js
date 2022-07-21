import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import announcementReducer from "./announcementReducer";
import attendanceReducer from "./attendanceReducer";
import voucherReducer from "./voucherReducer";
import resultReducer from "./resultReducer";
export default combineReducers({
    loginReducer,
    announcementReducer,
    attendanceReducer,
    voucherReducer,
    resultReducer,
});
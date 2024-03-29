const initialData = {
    queryRun: false,
    presentDates: [],
    absentDates: [],
    leaveDates: [],
    persisted: false,
}
const attendanceReducer = (state = initialData, action) => {
    const data = action.payload;
    switch (action.type) {
        case "GET_USER_ATTENDANCE":
            return {
                ...state,
                presentDates: data.presentDates,
                absentDates: data.absentDates,
                leaveDates: data.leaveDates,
                queryRun: true,
                persisted: true,
            };
        case "CLEAR_QUERY_STATE":
            return {
                ...state,
                queryRun: false,
            };
        case "LOGOUT":
            return {
                ...state,
                presentDates: [],
                absentDates: [],
                leaveDates: [],
                queryRun: false,
                persisted: false,
            };

        default:
            return state;
    }
}
export default attendanceReducer;

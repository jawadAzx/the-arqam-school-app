const initialData = {
    queryRun: false,
    announcements: {},
};
const announcementReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_ANNOUNCEMENTS":
            return {
                ...state,
                announcements: action.payload,
                queryRun: true,
            };
        case "CLEAR_QUERY_STATE":
            return {
                ...state,
                queryRun: false,
            };
        default:
            return state;
    }
};
export default announcementReducer;
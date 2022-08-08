const initialData = {
    queryRun: false,
    announcements: {},
    persisted: false,
};
const announcementReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_ANNOUNCEMENTS":
            return {
                ...state,
                announcements: action.payload,
                queryRun: true,
                persisted: true,
            };
        case "ADD_ANNOUNCEMENTS":
            return {
                ...state,
                announcements: action.payload,
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
                announcements: {},
                queryRun: false,
                persisted: false,
            };

        default:
            return state;
    }
};
export default announcementReducer;
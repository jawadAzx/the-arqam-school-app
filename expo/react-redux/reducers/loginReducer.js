const initialData = {
    allowed: false,
    user: {},
    message: "",
    queryRun: false,
};

const loginReducer = (state = initialData, action) => {
    const data = action.payload;
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                allowed: true,
                user: data,
                message: "",
                queryRun: true,
            };
        case "LOGIN_FAILED":
            return {
                ...state,
                allowed: false,
                user: {},
                message: data,
                queryRun: true,
            };
        case "LOGOUT":
            return {
                ...state,
                allowed: false,
                user: {},
                message: "",
                queryRun: false,
            };

        case "CLEAR_QUERY_STATE":
            return {
                ...state,
                queryRun: false,

            }
        default:
            return state;
    }
}
export default loginReducer;
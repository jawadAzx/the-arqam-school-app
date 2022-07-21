const initialState = {
    results: {},
    queryRun: false,
    isLoading: false,
}

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_RESULT":
            return {
                ...state,
                results: action.payload,
                isLoading: false,
                queryRun: true,
            }
        case "CLEAR_QUERY_STATE":
            return {
                ...state,
                queryRun: false,
            }
        default:
            return state;
    }
}

export default resultReducer;
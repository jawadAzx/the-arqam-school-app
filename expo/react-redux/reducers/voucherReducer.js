const initialState = {
    vouchers: {},
    queryRun: false,
    isLoading: false,
    persisted: false,
}

const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USER_VOUCHER":
            return {
                ...state,
                vouchers: action.payload,
                isLoading: false,
                queryRun: true,
                persisted: true
            }
        case "CLEAR_QUERY_STATE":
            return {
                ...state,
                queryRun: false,
            }
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "LOGOUT":
            return {
                ...state,
                vouchers: {},
                queryRun: false,
                isLoading: false,
                persisted: false,
            }

        default:
            return state;
    }
}

export default voucherReducer;
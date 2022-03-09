import { LOAD_USERS, LOAD_USERS_FAILURE, LOAD_USERS_SUCCESS } from './action';

const initialState = {
    page: 1,
    search: '',
    loading: false,
    error: null,
    data: null,
};

export default function peopleReducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOAD_USERS:
            const { page, search } = payload;
            return {
                ...state,
                loading: true,
                page,
                search,
            };

        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
            };

        case LOAD_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }
}

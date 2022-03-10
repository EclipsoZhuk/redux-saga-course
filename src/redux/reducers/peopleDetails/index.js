import {
    LOAD_DETAILS,
    LOAD_DETAILS_FAILURE,
    LOAD_DETAILS_SUCCESS,
} from './action';

const initialPeopleDetails = {
    loading: false,
    error: null,
    data: null,
};

export default function peopleDetailsReducer(
    state = initialPeopleDetails,
    { type, payload },
) {
    switch (type) {
        case LOAD_DETAILS:
            return {
                ...state,
                loading: true,
            };

        case LOAD_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload,
                error: null,
            };

        case LOAD_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }
}

import { LOCATION_CHANGE } from 'connected-react-router';
import {
    call,
    apply,
    put,
    takeEvery,
    take,
    select,
    fork,
} from 'redux-saga/effects';
import { LOAD_USERS, LOAD_USERS_SUCCESS } from '../../reducers/people/action';
import { getPeople } from '../../reducers/people/selector';

// function* loadPeopleDetails() {}

function* loadPeopleList({ payload }) {
    const { page, search } = payload;
    const request = yield call(
        fetch,
        `https://swapi.dev/api/people?page=${page}&search=${search}`,
    );

    const data = yield apply(request, request.json);

    yield put({ type: LOAD_USERS_SUCCESS, payload: data });
}

function* loadUsersOnRouteEnter() {
    while (true) {
        const action = yield take(LOCATION_CHANGE);

        if (action.payload.location.pathname === '/') {
            const { page, search } = yield select(getPeople);

            yield put({
                type: LOAD_USERS,
                payload: {
                    page,
                    search,
                },
            });
        }
    }
}

export default function* peopleSaga() {
    yield fork(loadUsersOnRouteEnter);
    yield takeEvery(LOAD_USERS, loadPeopleList);
}

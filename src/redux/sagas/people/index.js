import { LOCATION_CHANGE } from 'connected-react-router';
import { matchPath } from 'react-router-dom';
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
import {
    getRouteConfig,
    MAIN_ROUTE,
    PEOPLE_DETAILS_ROUTE,
} from '../../../routes';
import {
    LOAD_DETAILS,
    LOAD_DETAILS_FAILURE,
    LOAD_DETAILS_SUCCESS,
} from '../../reducers/peopleDetails/action';

function* loadPeopleDetails({ payload }) {
    const { id } = payload;

    try {
        const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);
        const data = yield apply(request, request.json);
        yield put({ type: LOAD_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: LOAD_DETAILS_FAILURE, payload: error });
    }
}

function* loadPeopleList({ payload }) {
    const { page, search } = payload;
    const request = yield call(
        fetch,
        `https://swapi.dev/api/people?page=${page}&search=${search}`,
    );

    const data = yield apply(request, request.json);

    yield put({ type: LOAD_USERS_SUCCESS, payload: data });
}

function* routeChangeSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE);

        if (
            matchPath(
                action.payload.location.pathname,
                getRouteConfig(MAIN_ROUTE),
            )
        ) {
            const { page, search } = yield select(getPeople);

            yield put({
                type: LOAD_USERS,
                payload: {
                    page,
                    search,
                },
            });
        }

        const detailsPage = matchPath(
            action.payload.location.pathname,
            getRouteConfig(PEOPLE_DETAILS_ROUTE),
        );

        if (detailsPage) {
            const { id } = detailsPage.params;

            if (id) {
                yield put({
                    type: LOAD_DETAILS,
                    payload: {
                        id,
                    },
                });
            }
        }
    }
}

export default function* peopleSaga() {
    yield fork(routeChangeSaga);
    yield takeEvery(LOAD_USERS, loadPeopleList);
    yield takeEvery(LOAD_DETAILS, loadPeopleDetails);
}

import { call, fork, put, select } from 'redux-saga/effects'

import { top } from 'shared/listings/sagas'
import { token } from 'shared/auth/sagas'
import { getTop } from 'shared/listings/reducer'
import { getToken } from 'shared/auth/selectors'

const rootSaga = function*() {
    const tk = yield select(getToken)
    if (!tk) {
        yield call(token)
    }

    yield fork(top)

    yield put(getTop())
}

export default rootSaga

import { call, fork, put, select } from 'redux-saga/effects'

import { token, top } from 'shared/reddit/sagas'
import { getTop } from 'shared/reddit/reducer'
import { getToken } from 'shared/reddit/selectors'

const rootSaga = function*() {
    const tk = yield select(getToken)
    if (!tk) {
        yield call(token)
    }

    yield fork(top)

    yield put(getTop())
}

export default rootSaga

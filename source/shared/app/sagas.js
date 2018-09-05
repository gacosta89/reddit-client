import { call, fork, put, select } from 'redux-saga/effects'

import { top, dismissAll } from 'shared/listings/sagas'
import { token } from 'shared/auth/sagas'
import { getTop } from 'shared/listings/reducer'
import { setDevice } from 'shared/app/reducer/config'
import { getToken } from 'shared/auth/selectors'

const rootSaga = function*() {
    if (typeof navigator !== 'undefined') {
        yield put(setDevice({ device: navigator.userAgent }))
    }

    const tk = yield select(getToken)
    if (!tk) {
        yield call(token)
    }

    yield fork(top)
    yield fork(dismissAll)

    yield put(getTop())
}

export default rootSaga

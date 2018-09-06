import { call, put, select } from 'redux-saga/effects'

import { token } from 'shared/auth/sagas'
import { setDevice } from 'shared/app/reducer/config'
import { getToken } from 'shared/auth/selectors'

const init = function*() {
    if (typeof navigator !== 'undefined') {
        yield put(setDevice({ device: navigator.userAgent }))
    }

    const tk = yield select(getToken)
    if (!tk) {
        yield call(token)
    }
}

export default init

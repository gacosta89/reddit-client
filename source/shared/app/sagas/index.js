import { call, fork, all } from 'redux-saga/effects'

import listings from 'shared/listings/sagas'
import auth from 'shared/auth/sagas'
import init from './init.js'

const rootSaga = function*() {
    yield all([fork(listings), fork(auth)])

    yield call(init)
}

export default rootSaga

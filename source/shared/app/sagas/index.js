import { call, fork, all } from 'redux-saga/effects'

import listings from 'shared/listings/sagas'
import init from './init.js'

const rootSaga = function*() {
    yield call(init)

    yield all([fork(listings)])
}

export default rootSaga

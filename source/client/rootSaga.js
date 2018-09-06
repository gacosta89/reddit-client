import { all, fork, call } from 'redux-saga/effects'

import storage, { restore } from 'client/storage/sagas'
import client from 'shared/app/sagas'

const root = function*() {
    yield call(restore)

    yield all([fork(storage), fork(client)])
}

export default root

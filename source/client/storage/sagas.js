import { delay } from 'redux-saga'
import { take, call, race, select, put } from 'redux-saga/effects'
import { identity as id } from 'ramda'

import { putStorage, getStorage } from 'client/storage/utils'
import * as storage from 'shared/storage/reducer'

const shallowEqual = (a, b) => {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (aKeys.length !== bKeys.length) {
        return false
    }

    return aKeys.every(key => a[key] === b[key])
}

const countActions = function*(count) {
    for (let i = 0; i < count; i++) {
        yield take('*')
    }
}

export const restore = function*() {
    const st = yield call(getStorage, 'state')

    yield put(storage.restore({ st }))
}

const persist = function*() {
    let prevSt = {}
    for (;;) {
        yield race({
            count: call(countActions, 5),
            timeout: call(delay, 10 * 1000),
        })

        const st = yield select(id)

        if (!shallowEqual(prevSt, st)) {
            yield call(putStorage, 'state', st)
            yield put(storage.persisted({ st }))

            prevSt = st
        }
    }
}

export default persist

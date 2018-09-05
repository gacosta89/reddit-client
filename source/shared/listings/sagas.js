import { delay } from 'redux-saga'
import { take, call, put, select } from 'redux-saga/effects'

import {
    GET_TOP,
    DISMISS_ALL,
    dismiss,
    topResponse,
} from 'shared/listings/reducer'
import { getToken } from 'shared/auth/selectors'
import { getApiBaseUrl } from 'shared/app/selectors'
import { getTopList } from 'shared/listings/selectors'

const getFromReddit = function*(path, params = { headers: {} }) {
    const token = yield select(getToken)
    const baseUrl = yield select(getApiBaseUrl)
    const url = baseUrl + path

    const res = yield call(fetch, url, {
        ...params,
        headers: {
            ...params.headers,
            Authorization: `Bearer ${token}`,
        },
    })

    return res
}

export const top = function*() {
    for (;;) {
        yield take(GET_TOP)

        const res = yield call(getFromReddit, '/top?limit=25')

        if (res.ok) {
            const {
                data: { children },
            } = yield call([res, res.json])

            console.log(children.length)

            yield put(topResponse({ list: children }))
        }
    }
}

export const dismissAll = function*() {
    yield take(DISMISS_ALL)

    const current = yield select(getTopList)

    for (let i = current.length - 1; i >= 0; i--) {
        const { id } = current[i]

        yield put(dismiss({ id }))
        yield delay(100)
    }
}

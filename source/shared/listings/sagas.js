import { take, call, put, select } from 'redux-saga/effects'

import { GET_TOP, topResponse } from 'shared/listings/reducer'
import { getToken } from 'shared/auth/selectors'
import { getApiBaseUrl } from 'shared/app/selectors'

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

        const res = yield call(getFromReddit, '/top?limit=50')

        if (res.ok) {
            const {
                data: { children },
            } = yield call([res, res.json])

            console.log(children.length)

            yield put(topResponse({ list: children }))
        }
    }
}

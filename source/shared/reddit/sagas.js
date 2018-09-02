import { take, call, put, select } from 'redux-saga/effects'

import { GET_TOP, setAuth, topResponse } from 'shared/reddit/reducer'
import { getToken, getRedditBaseUrl } from 'shared/reddit/selectors'

export const token = function*() {
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const res = yield call(
        fetch,
        'https://www.reddit.com/api/v1/access_token',
        {
            method: 'POST',
            body: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(
                    'uVj44yEo5yMqkQ:5LZiorkRpSFaIOzh2RGjcBhAEE0'
                ).toString('base64')}`,
            },
        }
    )

    if (res.ok) {
        const data = yield call([res, res.json])

        yield put(setAuth({ token: data.access_token }))
    }
}

const getFromReddit = function*(path, params = { headers: {} }) {
    const token = yield select(getToken)
    const baseUrl = yield select(getRedditBaseUrl)
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

        const res = yield call(getFromReddit, '/top')

        if (res.ok) {
            const {
                data: { children },
            } = yield call([res, res.json])

            console.log(children.length)

            yield put(topResponse({ list: children }))
        }
    }
}

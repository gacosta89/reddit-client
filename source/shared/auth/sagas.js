import { call, put, select } from 'redux-saga/effects'

import { getAuthUrl } from 'shared/app/selectors'
import { setToken } from 'shared/auth/reducer'

const token = function*() {
    const url = yield select(getAuthUrl)

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const res = yield call(fetch, url, {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(
                'uVj44yEo5yMqkQ:5LZiorkRpSFaIOzh2RGjcBhAEE0'
            ).toString('base64')}`,
        },
    })

    if (res.ok) {
        const data = yield call([res, res.json])

        yield put(setToken({ token: data.access_token }))
    }
}

export default token

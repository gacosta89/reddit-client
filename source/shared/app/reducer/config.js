import { createDuck } from 'redux-duck'

const ns = createDuck('listings')

export const SET_DEVICE = ns.defineType('SET_DEVICE')
export const setDevice = ns.createAction(SET_DEVICE)

const iniState = {
    apiBaseUrl: 'https://oauth.reddit.com',
    authUrl: 'https://www.reddit.com/api/v1/access_token',
    device: '',
}

export default ns.createReducer(
    {
        [SET_DEVICE]: (state, { payload: { device } }) => ({
            ...state,
            device,
        }),
    },
    iniState
)

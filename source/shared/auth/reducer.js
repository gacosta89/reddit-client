import { createDuck } from 'redux-duck'

const ns = createDuck('auth')

export const SET_TOKEN = ns.defineType('SET_TOKEN')
export const setToken = ns.createAction(SET_TOKEN)

const iniState = {
    token: '-EB5tmcFpmQXOZWSCRu3viJsxlZ8',
}

export default ns.createReducer(
    {
        [SET_TOKEN]: (state, { payload: { token } }) => ({
            ...state,
            token,
        }),
    },
    iniState
)

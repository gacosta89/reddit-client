import { createDuck } from 'redux-duck'
import { indexBy, prop, map, compose } from 'ramda'

const ns = createDuck('listings')

export const GET_TOP = ns.defineType('GET_TOP')
export const getTop = ns.createAction(GET_TOP)

export const TOP_RESPONSE = ns.defineType('TOP_RESPONSE')
export const topResponse = ns.createAction(TOP_RESPONSE)

const iniState = {
    top: {},
    fetching: {},
}

const byId = compose(
    indexBy(prop('id')),
    map(prop('data'))
)

export default ns.createReducer(
    {
        [GET_TOP]: state => ({
            ...state,
            fetching: {
                top: true,
            },
        }),
        [TOP_RESPONSE]: (state, { payload: { list } }) => ({
            ...state,
            top: byId(list),
            fetching: {
                ...state.fetching,
                top: false,
            },
        }),
    },
    iniState
)

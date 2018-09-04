import { createDuck } from 'redux-duck'
import { indexBy, prop, map, compose, merge } from 'ramda'

const ns = createDuck('listings')

export const GET_TOP = ns.defineType('GET_TOP')
export const getTop = ns.createAction(GET_TOP)

export const TOP_RESPONSE = ns.defineType('TOP_RESPONSE')
export const topResponse = ns.createAction(TOP_RESPONSE)

export const DISMISS = ns.defineType('DISMISS')
export const dismiss = ns.createAction(DISMISS)

export const EXCLUDE = ns.defineType('EXCLUDE')
export const exclude = ns.createAction(EXCLUDE)

export const SELECT = ns.defineType('SELECT')
export const select = ns.createAction(SELECT)

const iniState = {
    top: {},
    fetching: {},
    activeId: '',
}

const byId = compose(
    indexBy(prop('id')),
    map(
        compose(
            merge({ show: true, exclude: false, visited: false }),
            prop('data')
        )
    )
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
        [DISMISS]: (state, { payload: { id } }) => ({
            ...state,
            top: {
                ...state.top,
                [id]: {
                    ...state.top[id],
                    show: false,
                },
            },
        }),
        [EXCLUDE]: (state, { payload: { id } }) => ({
            ...state,
            top: {
                ...state.top,
                [id]: {
                    ...state.top[id],
                    exclude: true,
                },
            },
        }),
        [SELECT]: (state, { payload: { id } }) => ({
            ...state,
            activeId: id,
            top: {
                ...state.top,
                [id]: {
                    ...state.top[id],
                    visited: true,
                },
            },
        }),
    },
    iniState
)

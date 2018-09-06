import { createDuck } from 'redux-duck'

const ns = createDuck('storage')

export const RESTORE = ns.defineType('RESTORE')
export const restore = ns.createAction(RESTORE)

export const PERSISTED = ns.defineType('PERSISTED')
export const persisted = ns.createAction(PERSISTED)

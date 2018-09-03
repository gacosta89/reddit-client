import { createSelector } from 'reselect'

export const getTopList = createSelector(
    state => state.listings.top,
    top =>
        Object.values(top).map(val => ({
            id: val.id,
            title: val.author,
            description: val.title,
            caption: val.created_utc,
            overline: val.num_comments,
            thumbnailUrl: val.thumbnail,
        }))
)
